// "use client";

// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import { useState, useMemo, useEffect, useTransition } from "react";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { ChevronRight, Search, Loader2 } from "lucide-react";
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
// } from "@/components/ui/pagination";
// import { Input } from "@/components/ui/input";

// // Custom categories
// const customCategories = [
//   "Blog",
//   "SEO",
//   "Paid Media",
//   "Social",
//   "Programming",
//   "React JS",
//   "How To",
//   "Beginner Guides",
//   "Myth Busting",
//   "Case Studies",
//   "Tips & Tricks",
// ];

// type Blog = {
//   id: string;
//   slug: string;
//   title: string;
//   featuredImage?: string | null;
//   categories: string[];
//   metaDescription: string;
//   createdAt?: any;
// };

// const BLOGS_PER_PAGE = 9;

// type BlogListProps = {
//   initialBlogs: Blog[];
// };

// // --- HELPER HOOK: Debounce to stop lag while typing ---
// function useDebounce<T>(value: T, delay: number): T {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// }

// // Skeleton loader component (Reusable for single card or list)
// function BlogCardSkeleton() {
//   return (
//     <Card className="animate-pulse shadow-none overflow-hidden rounded-lg border pt-0 h-full">
//       <CardHeader className="p-0">
//         <div className="aspect-video bg-blue-100 w-full border-b" />
//       </CardHeader>
//       <CardContent className="p-6">
//         <div className="flex items-center gap-3 mb-4">
//           <div className="h-6 w-20 bg-blue-200 rounded-full" />
//           <div className="h-4 w-12 bg-blue-50 rounded" />
//         </div>
//         <div className="h-6 w-44 bg-blue-200 rounded mb-3" />
//         <div className="h-4 w-full bg-blue-100 rounded mb-2" />
//         <div className="h-4 w-3/4 bg-blue-50 rounded mb-2" />
//         <div className="h-10 w-24 bg-blue-200 rounded mt-3" />
//       </CardContent>
//     </Card>
//   );
// }

// function BlogListSkeleton() {
//   return (
//     <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//       {Array.from({ length: BLOGS_PER_PAGE }).map((_, i) => (
//         <BlogCardSkeleton key={i} />
//       ))}
//     </div>
//   );
// }

// const BlogList = ({ initialBlogs }: BlogListProps) => {
//   const router = useRouter();
//   const [isPending, startTransition] = useTransition();
//   const [loadingId, setLoadingId] = useState<string | null>(null);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [page, setPage] = useState(1);
//   const [categoryFilter, setCategoryFilter] = useState("all");

//   const debouncedSearch = useDebounce(searchQuery, 300);

//   const filteredBlogs = useMemo(() => {
//     return initialBlogs.filter((blog) => {
//       const matchesSearch =
//         blog.title.toLowerCase().includes(debouncedSearch.trim().toLowerCase()) ||
//         (blog.metaDescription || "")
//           .toLowerCase()
//           .includes(debouncedSearch.trim().toLowerCase());
//       const matchesCategory =
//         categoryFilter === "all" || blog.categories.includes(categoryFilter);
//       return matchesSearch && matchesCategory;
//     });
//   }, [initialBlogs, debouncedSearch, categoryFilter]);

//   useEffect(() => {
//     setPage(1);
//   }, [debouncedSearch, categoryFilter]);

//   const paginatedBlogs = filteredBlogs.slice(
//     (page - 1) * BLOGS_PER_PAGE,
//     page * BLOGS_PER_PAGE
//   );

//   // --- HANDLE NAVIGATION ---
//   const handleBlogClick = (slug: string, id: string) => {
//     if (isPending) return; // Prevent double clicks
    
//     setLoadingId(id); // Set which card is loading
    
//     startTransition(() => {
//       router.push(`/blogs/${slug}`);
//     });
//   };

//   return (
//     <div className="min-h-screen bg-background lg:-mt-40">
//       <section className="bg-gradient-to-b from-blue-50 to-white py-16 lg:pb-18 lg:pt-45">
//         <div className="max-w-7xl mx-auto px-6 xl:px-0">
//           <div className="text-center max-w-3xl mx-auto space-y-4">
//             <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-blue-600 bungee-inline-regular">
//               Explore Our Articles
//             </h1>
//             <p className="text-lg text-gray-600">
//               Discover insights, tips, and stories from our experts
//             </p>
//             <div className="relative max-w-2xl mx-auto mt-8">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
//               <Input
//                 type="search"
//                 placeholder="Search articles..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-12 pr-4 py-6 rounded-full border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-base"
//               />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Blog Posts Grid */}
//       <div className="max-w-7xl mx-auto py-16 px-6 xl:px-0">
//         <div className="flex items-end justify-between mb-8">
//           <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
//           <Select value={categoryFilter} onValueChange={setCategoryFilter}>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue>
//                 {categoryFilter === "all"
//                   ? "All Categories"
//                   : categoryFilter}
//               </SelectValue>
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="all">All Categories</SelectItem>
//               {customCategories.map((cat) => (
//                 <SelectItem key={cat} value={cat}>
//                   {cat}
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>
        
//         {paginatedBlogs.length === 0 ? (
//            filteredBlogs.length === 0 && initialBlogs.length > 0 ? (
//              <div className="text-center py-20 text-gray-500">
//                No articles found matching your criteria.
//              </div>
//            ) : (
//              <BlogListSkeleton />
//            )
//         ) : (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {paginatedBlogs.map((blog, index) => {
//               const isThisCardLoading = isPending && loadingId === blog.id;

//               // If this specific card is loading, show Skeleton instead of Card
//               if (isThisCardLoading) {
//                 return <BlogCardSkeleton key={blog.id} />;
//               }

//               return (
//                 <div
//                   key={blog.id}
//                   onClick={() => handleBlogClick(blog.slug, blog.id)}
//                   className={`block group cursor-pointer transition-opacity ${
//                     isPending && !isThisCardLoading ? "opacity-50" : "opacity-100"
//                   }`}
//                 >
//                   <Card className="shadow-none overflow-hidden rounded-lg border hover:shadow-lg transition-shadow cursor-pointer group pt-0 h-full flex flex-col">
//                     <CardHeader className="p-0">
//                       {blog.featuredImage ? (
//                         <Image
//                           src={blog.featuredImage}
//                           alt={blog.title}
//                           width={800}
//                           height={450}
//                           quality={60}
//                           priority={index < 3}
//                           className="aspect-video w-full object-cover"
//                         />
//                       ) : (
//                         <div className="aspect-video bg-blue-100 w-full border-b" />
//                       )}
//                     </CardHeader>
//                     <CardContent className="p-6 flex-1 flex flex-col">
//                       <div className="flex items-center gap-3">
//                         {blog.categories.slice(0, 3).map((cat) => (
//                           <Badge
//                             key={cat}
//                             className="bg-blue-100 text-blue-700 hover:bg-blue-100 shadow-none"
//                           >
//                             {cat}
//                           </Badge>
//                         ))}
//                       </div>
//                       <h3 className="mt-4 text-xl font-semibold tracking-tight group-hover:text-blue-600 transition-colors">
//                         {blog.title}
//                       </h3>
//                       <p className="mt-2 text-muted-foreground text-sm line-clamp-2 mb-4">
//                         {blog.metaDescription}
//                       </p>
                      
//                       <div className="mt-auto pt-2">
//                         <Button
//                           size="sm"
//                           className="shadow-none bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
//                         >
//                           Read more <ChevronRight className="w-4 h-4 ml-1" />
//                         </Button>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Pagination */}
//         <Pagination className="pt-8">
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationLink
//                 onClick={() => page > 1 && setPage(page - 1)}
//                 isActive={false}
//                 className="cursor-pointer mr-5"
//               >
//                 Previous
//               </PaginationLink>
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationLink isActive>{page}</PaginationLink>
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationLink
//                 onClick={() =>
//                   page * BLOGS_PER_PAGE < filteredBlogs.length &&
//                   setPage(page + 1)
//                 }
//                 isActive={false}
//                 className="cursor-pointer"
//               >
//                 Next
//               </PaginationLink>
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       </div>
//     </div>
//   );
// };

// export default BlogList;






"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useMemo, useEffect, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Search, Loader2 } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";

// Custom categories
const customCategories = [
  "Blog",
  "SEO",
  "Paid Media",
  "Social",
  "Programming",
  "React JS",
  "How To",
  "Beginner Guides",
  "Myth Busting",
  "Case Studies",
  "Tips & Tricks",
];

type Blog = {
  id: string;
  slug: string;
  title: string;
  featuredImage?: string | null;
  categories: string[];
  metaDescription: string;
  createdAt?: any;
};

const BLOGS_PER_PAGE = 9;

type BlogListProps = {
  initialBlogs: Blog[];
};

// --- HELPER HOOK: Debounce to stop lag while typing ---
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Skeleton loader component (Reusable for single card or list)
function BlogCardSkeleton() {
  return (
    <Card className="animate-pulse shadow-none overflow-hidden rounded-lg border pt-0 h-full">
      <CardHeader className="p-0">
        <div className="aspect-video bg-blue-100 w-full border-b" />
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-6 w-20 bg-blue-200 rounded-full" />
          <div className="h-4 w-12 bg-blue-50 rounded" />
        </div>
        <div className="h-6 w-44 bg-blue-200 rounded mb-3" />
        <div className="h-4 w-full bg-blue-100 rounded mb-2" />
        <div className="h-4 w-3/4 bg-blue-50 rounded mb-2" />
        <div className="h-10 w-24 bg-blue-200 rounded mt-3" />
      </CardContent>
    </Card>
  );
}

function BlogListSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: BLOGS_PER_PAGE }).map((_, i) => (
        <BlogCardSkeleton key={i} />
      ))}
    </div>
  );
}

const BlogList = ({ initialBlogs }: BlogListProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState("all");

  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((blog) => {
      const matchesSearch =
        blog.title.toLowerCase().includes(debouncedSearch.trim().toLowerCase()) ||
        (blog.metaDescription || "")
          .toLowerCase()
          .includes(debouncedSearch.trim().toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || blog.categories.includes(categoryFilter);
      return matchesSearch && matchesCategory;
    });
  }, [initialBlogs, debouncedSearch, categoryFilter]);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, categoryFilter]);

  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
  const paginatedBlogs = filteredBlogs.slice(
    (page - 1) * BLOGS_PER_PAGE,
    page * BLOGS_PER_PAGE
  );

  // --- HANDLE NAVIGATION ---
  const handleBlogClick = (slug: string, id: string) => {
    if (isPending) return; // Prevent double clicks
    
    setLoadingId(id); // Set which card is loading
    
    startTransition(() => {
      router.push(`/blogs/${slug}`);
    });
  };

  // --- PAGINATION HANDLERS ---
  const handlePreviousPage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="min-h-screen bg-background lg:-mt-40">
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 lg:pb-18 lg:pt-45">
        <div className="max-w-7xl mx-auto px-6 xl:px-0">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-blue-600 bungee-inline-regular">
              Explore Our Articles
            </h1>
            <p className="text-lg text-gray-600">
              Discover insights, tips, and stories from our experts
            </p>
            <div className="relative max-w-2xl mx-auto mt-8">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
              <Input
                type="search"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-6 rounded-full border-blue-200 focus:border-blue-500 focus:ring-blue-500 text-base"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto py-16 px-6 xl:px-0">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue>
                {categoryFilter === "all"
                  ? "All Categories"
                  : categoryFilter}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {customCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {paginatedBlogs.length === 0 ? (
          filteredBlogs.length === 0 && initialBlogs.length > 0 ? (
            <div className="text-center py-20 text-gray-500">
              No articles found matching your criteria.
            </div>
          ) : (
            <BlogListSkeleton />
          )
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedBlogs.map((blog, index) => {
              const isThisCardLoading = isPending && loadingId === blog.id;

              // If this specific card is loading, show Skeleton instead of Card
              if (isThisCardLoading) {
                return <BlogCardSkeleton key={blog.id} />;
              }

              return (
                <div
                  key={blog.id}
                  onClick={() => handleBlogClick(blog.slug, blog.id)}
                  className={`block group cursor-pointer transition-opacity ${
                    isPending && !isThisCardLoading ? "opacity-50" : "opacity-100"
                  }`}
                >
                  <Card className="shadow-none overflow-hidden rounded-lg border hover:shadow-lg transition-shadow cursor-pointer group pt-0 h-full flex flex-col">
                    <CardHeader className="p-0">
                      {blog.featuredImage ? (
                        <Image
                          src={blog.featuredImage}
                          alt={blog.title}
                          width={800}
                          height={450}
                          quality={60}
                          priority={index < 3}
                          className="aspect-video w-full object-cover"
                        />
                      ) : (
                        <div className="aspect-video bg-blue-100 w-full border-b" />
                      )}
                    </CardHeader>
                    <CardContent className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3">
                        {blog.categories.slice(0, 3).map((cat) => (
                          <Badge
                            key={cat}
                            className="bg-blue-100 text-blue-700 hover:bg-blue-100 shadow-none"
                          >
                            {cat}
                          </Badge>
                        ))}
                      </div>
                      <h3 className="mt-4 text-xl font-semibold tracking-tight group-hover:text-blue-600 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground text-sm line-clamp-2 mb-4">
                        {blog.metaDescription}
                      </p>
                      
                      <div className="mt-auto pt-2">
                        <Button
                          size="sm"
                          className="shadow-none bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
                        >
                          Read more <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {filteredBlogs.length > 0 && (
          <Pagination className="pt-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationLink
                  onClick={handlePreviousPage}
                  isActive={false}
                  className={`cursor-pointer mr-5 ${page === 1 ? 'pointer-events-none opacity-50' : ''}`}
                >
                  Previous
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive className="cursor-default">
                  Page {page} of {totalPages}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={handleNextPage}
                  isActive={false}
                  className={`cursor-pointer ${page === totalPages ? 'pointer-events-none opacity-50' : ''}`}
                >
                  Next
                </PaginationLink>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default BlogList;
