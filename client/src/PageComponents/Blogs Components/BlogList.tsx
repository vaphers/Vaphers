'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Search } from "lucide-react";
import { useState } from "react";

const BlogList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background lg:-mt-40">
      <section className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background py-16 lg:pb-18 lg:pt-45">
        <div className="max-w-(--breakpoint-xl) mx-auto px-6 xl:px-0">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-blue-600 dark:text-white bungee-inline-regular">
              Explore Our Articles
            </h1>
            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-400">
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
      <div className="max-w-(--breakpoint-xl) mx-auto py-16 px-6 xl:px-0">
        <div className="flex items-end justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
          <Select defaultValue="recommended">
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="popular">Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Card
              key={i}
              className="shadow-none overflow-hidden rounded-lg border hover:shadow-lg transition-shadow cursor-pointer group pt-0"
            >
              <CardHeader className="p-0">
                <div className="aspect-video bg-blue-100 dark:bg-blue-900/20 w-full border-b" />
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 shadow-none">
                    Technology
                  </Badge>
                  <span className="font-medium text-xs text-muted-foreground">
                    5 min read
                  </span>
                </div>

                <h3 className="mt-4 text-xl font-semibold tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  A beginner&apos;s guide to blockchain for engineers
                </h3>
                <p className="mt-2 text-muted-foreground text-sm line-clamp-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Suspendisse varius enim in eros elementum tristique.
                </p>

                <Button
                  size="sm"
                  className="mt-6 shadow-none bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Read more <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
