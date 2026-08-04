import { MongoClient, ServerApiVersion, Collection, Db } from 'mongodb';

const uri = process.env.MONGO_DB || process.env.MONGODB_URI || '';

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!uri) {
  console.warn('Warning: MONGO_DB is not defined in environment variables.');
}

const clientOptions = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
};

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so the MongoClient is not repeated on HMR
  if (!global._mongoClientPromise) {
    if (uri) {
      client = new MongoClient(uri, clientOptions);
      global._mongoClientPromise = client.connect();
    } else {
      global._mongoClientPromise = Promise.reject(new Error('MONGO_DB environment variable is missing.'));
    }
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  if (uri) {
    client = new MongoClient(uri, clientOptions);
    clientPromise = client.connect();
  } else {
    clientPromise = Promise.reject(new Error('MONGO_DB environment variable is missing.'));
  }
}

export default clientPromise;

export interface InteriorBlogDocument {
  _id?: any;
  title: string;
  slug: string;
  contentHtml: string;
  metaTitle?: string;
  metaDescription?: string;
  featuredImage?: string | null;
  authorId?: string;
  authorName?: string;
  categories?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export async function getInteriorDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db('interior_design_marketing');
}

export async function getInteriorBlogsCollection(): Promise<Collection<InteriorBlogDocument>> {
  const db = await getInteriorDatabase();
  return db.collection<InteriorBlogDocument>('blogs');
}
