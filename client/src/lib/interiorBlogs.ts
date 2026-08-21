import { db } from '@/lib/firebaseAdmin';
import { getInteriorBlogsCollection } from '@/lib/mongodb';

export interface InteriorBlogItem {
  id: string;
  slug: string;
  title: string;
  contentHtml: string;
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string | null;
  authorId?: string;
  authorName?: string;
  categories: string[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Fetch all interior blogs (Reads from Firestore, with fallback/sync from MongoDB)
 */
export async function getAllInteriorBlogs(options?: {
  category?: string | null;
  search?: string | null;
  limit?: number | null;
}): Promise<InteriorBlogItem[]> {
  const blogsMap = new Map<string, InteriorBlogItem>();

  // 1. Read from Firestore
  try {
    const snap = await db.collection('interiorBlogs').get();
    snap.forEach((doc: any) => {
      const data = doc.data() || {};
      const item: InteriorBlogItem = {
        id: doc.id,
        slug: data.slug || doc.id,
        title: data.title || 'Untitled Post',
        contentHtml: data.contentHtml || '',
        metaTitle: data.metaTitle || data.title || '',
        metaDescription: data.metaDescription || '',
        featuredImage: data.featuredImage || null,
        authorId: data.authorId || 'admin',
        authorName: data.authorName || 'Vaphers Team',
        categories: data.categories || [],
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt || data.createdAt || new Date().toISOString(),
      };
      blogsMap.set(item.slug, item);
    });
  } catch (fsErr) {
    console.warn('Firestore interiorBlogs read warning:', fsErr);
  }

  // 2. Read from MongoDB if configured
  try {
    if (process.env.MONGO_DB || process.env.MONGODB_URI) {
      const mongoCol = await getInteriorBlogsCollection();
      const mongoDocs = await mongoCol.find({}).toArray();
      mongoDocs.forEach((doc) => {
        if (!blogsMap.has(doc.slug)) {
          blogsMap.set(doc.slug, {
            id: doc._id.toString(),
            slug: doc.slug,
            title: doc.title,
            contentHtml: doc.contentHtml,
            metaTitle: doc.metaTitle || doc.title,
            metaDescription: doc.metaDescription || '',
            featuredImage: doc.featuredImage || null,
            authorId: doc.authorId || 'admin',
            authorName: doc.authorName || 'Vaphers Team',
            categories: doc.categories || [],
            createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
            updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : new Date().toISOString(),
          });
        }
      });
    }
  } catch (mongoErr) {
    // MongoDB optional/fallback
  }

  let list = Array.from(blogsMap.values());

  // Apply filters
  if (options?.category && options.category !== 'all') {
    list = list.filter((b) => b.categories?.includes(options.category!));
  }

  if (options?.search) {
    const q = options.search.toLowerCase();
    list = list.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.metaDescription?.toLowerCase().includes(q) ||
        b.slug.toLowerCase().includes(q)
    );
  }

  // Sort by createdAt desc
  list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  if (options?.limit && options.limit > 0) {
    list = list.slice(0, options.limit);
  }

  return list;
}

/**
 * Fetch single interior blog by slug
 */
export async function getInteriorBlogBySlug(slug: string): Promise<InteriorBlogItem | null> {
  const cleanSlug = String(slug).trim().toLowerCase();

  // 1. Try Firestore
  try {
    const snap = await db.collection('interiorBlogs').where('slug', '==', cleanSlug).limit(1).get();
    if (!snap.empty) {
      const doc = snap.docs[0];
      const data = doc.data() || {};
      return {
        id: doc.id,
        slug: data.slug || doc.id,
        title: data.title || 'Untitled Post',
        contentHtml: data.contentHtml || '',
        metaTitle: data.metaTitle || data.title || '',
        metaDescription: data.metaDescription || '',
        featuredImage: data.featuredImage || null,
        authorId: data.authorId || 'admin',
        authorName: data.authorName || 'Vaphers Team',
        categories: data.categories || [],
        createdAt: data.createdAt || new Date().toISOString(),
        updatedAt: data.updatedAt || data.createdAt || new Date().toISOString(),
      };
    }
  } catch (fsErr) {
    console.warn('Firestore interiorBlog fetch warning:', fsErr);
  }

  // 2. Try MongoDB fallback
  try {
    if (process.env.MONGO_DB || process.env.MONGODB_URI) {
      const mongoCol = await getInteriorBlogsCollection();
      const doc = await mongoCol.findOne({ slug: cleanSlug });
      if (doc) {
        return {
          id: doc._id.toString(),
          slug: doc.slug,
          title: doc.title,
          contentHtml: doc.contentHtml,
          metaTitle: doc.metaTitle || doc.title,
          metaDescription: doc.metaDescription || '',
          featuredImage: doc.featuredImage || null,
          authorId: doc.authorId || 'admin',
          authorName: doc.authorName || 'Vaphers Team',
          categories: doc.categories || [],
          createdAt: doc.createdAt ? new Date(doc.createdAt).toISOString() : new Date().toISOString(),
          updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : new Date().toISOString(),
        };
      }
    }
  } catch (mongoErr) {
    // ignore
  }

  return null;
}

/**
 * Create a new interior design marketing blog
 */
export async function createInteriorBlog(data: {
  title: string;
  slug: string;
  contentHtml: string;
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string | null;
  authorId?: string;
  authorName?: string;
  categories?: string[];
}) {
  const cleanSlug = String(data.slug)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const now = new Date().toISOString();

  // 1. Check uniqueness in Firestore
  const existingFs = await db.collection('interiorBlogs').where('slug', '==', cleanSlug).limit(1).get();
  if (!existingFs.empty) {
    throw new Error('A blog with this slug already exists. Please choose a different slug.');
  }

  const newDoc = {
    title: data.title.trim(),
    slug: cleanSlug,
    contentHtml: data.contentHtml,
    metaTitle: data.metaTitle?.trim() || data.title.trim(),
    metaDescription: data.metaDescription?.trim() || '',
    featuredImage: data.featuredImage || null,
    authorId: data.authorId || 'admin',
    authorName: data.authorName || 'Vaphers Team',
    categories: Array.isArray(data.categories) ? data.categories : ['Interior Design Marketing'],
    createdAt: now,
    updatedAt: now,
  };

  // 2. Save into Firestore (Primary guaranteed storage)
  const fsRef = await db.collection('interiorBlogs').add(newDoc);

  // 3. Save into MongoDB if available
  try {
    if (process.env.MONGO_DB || process.env.MONGODB_URI) {
      const mongoCol = await getInteriorBlogsCollection();
      await mongoCol.insertOne({
        ...newDoc,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
  } catch (mErr) {
    console.warn('MongoDB sync skipped (saved to Firestore):', mErr);
  }

  return { id: fsRef.id, slug: cleanSlug };
}

/**
 * Update an interior design marketing blog
 */
export async function updateInteriorBlog(
  slugOrId: string,
  updateFields: Partial<InteriorBlogItem>
) {
  const now = new Date().toISOString();
  let updatedSlug = updateFields.slug;

  // 1. Find in Firestore
  let targetDocRef: any = null;
  const snapBySlug = await db.collection('interiorBlogs').where('slug', '==', slugOrId).limit(1).get();

  if (!snapBySlug.empty) {
    targetDocRef = snapBySlug.docs[0].ref;
  } else {
    const docById = await db.collection('interiorBlogs').doc(slugOrId).get();
    if (docById.exists) {
      targetDocRef = docById.ref;
    }
  }

  if (targetDocRef) {
    const payload: any = {
      ...updateFields,
      updatedAt: now,
    };
    delete payload.id;
    await targetDocRef.update(payload);
  }

  // 2. Sync with MongoDB if available
  try {
    if (process.env.MONGO_DB || process.env.MONGODB_URI) {
      const mongoCol = await getInteriorBlogsCollection();
      const mongoDoc = await mongoCol.findOne({ slug: slugOrId });
      if (mongoDoc) {
        const mongoSet: Record<string, any> = { updatedAt: new Date() };
        if (updateFields.title !== undefined) mongoSet.title = updateFields.title;
        if (updateFields.slug !== undefined) mongoSet.slug = updateFields.slug;
        if (updateFields.contentHtml !== undefined) mongoSet.contentHtml = updateFields.contentHtml;
        if (updateFields.metaTitle !== undefined) mongoSet.metaTitle = updateFields.metaTitle;
        if (updateFields.metaDescription !== undefined) mongoSet.metaDescription = updateFields.metaDescription;
        if (updateFields.featuredImage !== undefined) mongoSet.featuredImage = updateFields.featuredImage;
        if (updateFields.authorId !== undefined) mongoSet.authorId = updateFields.authorId;
        if (updateFields.authorName !== undefined) mongoSet.authorName = updateFields.authorName;
        if (updateFields.categories !== undefined) mongoSet.categories = updateFields.categories;

        await mongoCol.updateOne(
          { _id: mongoDoc._id },
          { $set: mongoSet }
        );
      }
    }
  } catch (mErr) {
    // ignore
  }

  return { success: true, slug: updatedSlug || slugOrId };
}

/**
 * Delete an interior blog
 */
export async function deleteInteriorBlog(slugOrId: string) {
  // 1. Delete from Firestore
  const snapBySlug = await db.collection('interiorBlogs').where('slug', '==', slugOrId).limit(1).get();
  if (!snapBySlug.empty) {
    await snapBySlug.docs[0].ref.delete();
  } else {
    await db.collection('interiorBlogs').doc(slugOrId).delete();
  }

  // 2. Delete from MongoDB if available
  try {
    if (process.env.MONGO_DB || process.env.MONGODB_URI) {
      const mongoCol = await getInteriorBlogsCollection();
      await mongoCol.deleteOne({ slug: slugOrId });
    }
  } catch (mErr) {
    // ignore
  }

  return { success: true };
}
