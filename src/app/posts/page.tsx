"use client";

import { useQuery } from "@tanstack/react-query";
import { getPosts, getUsers } from "@/lib/api";
import Navbar from "@/components/layout/navbar";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Post, User } from "@/types";

function PostCard({ post, users }: { post: Post; users: User[] }) {
  const author = users.find((u) => u.id === post.userId);

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>

        {author && (
          <p className="text-sm text-gray-500 mb-3">
            Posted by:{" "}
            <Link
              href={`/users/${author.id}`}
              className="text-blue-600 hover:underline"
            >
              {author.name}
            </Link>
          </p>
        )}

        <p className="text-gray-600 mb-4">
          {post.body.length > 150
            ? `${post.body.substring(0, 150)}…`
            : post.body}
        </p>

        <Link
          href={`/posts/${post.id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          Read more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function PostsPage() {
  const {
    data: posts = [],
    isLoading: isLoadingPosts,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const {
    data: users = [],
    isLoading: isLoadingUsers,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const isLoading = isLoadingPosts || isLoadingUsers;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">
            All Posts
          </h1>

          {isLoading && (
            <div className="flex justify-center">
              <p>Loading posts...</p>
            </div>
          )}

          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} users={users} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
