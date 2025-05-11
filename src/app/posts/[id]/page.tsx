"use client";

import { useQuery } from "@tanstack/react-query";
import { getPost } from "@/lib/api";
import Navbar from "@/components/layout/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Post } from "@/types";

export default function PostPage() {
  const { id } = useParams<{ id: string }>(); // ← fix: force id as string

  const {
    data: post,
    isLoading,
  } = useQuery<Post>({
    queryKey: ["post", id],
    queryFn: () => getPost(id!), // ← fix: sure na hindi undefined
    enabled: !!id,
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {isLoading ? (
            <p>Loading post...</p>
          ) : !post ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-md">
              <p>Post not found. <Link href="/" className="underline">Return to homepage</Link></p>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{post.body}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}
