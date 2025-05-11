"use client"; // Make sure this page is treated as a client-side component

import { useQuery } from "@tanstack/react-query";
import { getPost, getUser, getPostComments } from "@/lib/api";
import Navbar from "@/components/layout/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { Post, User, Comment } from "@/types";
import { useParams } from "next/navigation"; // Correct import for accessing params

export default function PostDetailPage() {
  const { id } = useParams(); // Use useParams to get the id from the URL

  const {
    data: post,
    isLoading: isLoadingPost,
  } = useQuery<Post>({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
  });

  const {
    data: author,
    isLoading: isLoadingAuthor,
  } = useQuery<User>({
    queryKey: ["user", post?.userId.toString() ?? ""],
    queryFn: () => getUser(post!.userId.toString()),
    enabled: !!post,
  });

  const {
    data: comments = [],
    isLoading: isLoadingComments,
  } = useQuery<Comment[]>({
    queryKey: ["postComments", id],
    queryFn: () => getPostComments(id),
  });

  const isLoading = isLoadingPost || (!!post && isLoadingAuthor) || isLoadingComments;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-5xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {isLoading ? (
            <p>Loading post details...</p>
          ) : !post ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-md">
              <p>
                Post not found.{" "}
                <Link href="/posts" className="underline">
                  Return to posts list
                </Link>
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center mb-6">
                <Link
                  href="/posts"
                  className="text-blue-600 hover:text-blue-800 mr-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Post Details
                </h1>
              </div>

              <Card className="mb-8">
                <CardContent className="p-6">
                  <h2 className="text-2xl font-semibold mb-4">
                    {post.title}
                  </h2>

                  {author && (
                    <div className="flex items-center mb-6">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm text-gray-500">Posted by:</p>
                        <Link
                          href={`/users/${author.id}`}
                          className="font-medium text-blue-600 hover:underline"
                        >
                          {author.name}
                        </Link>
                      </div>
                    </div>
                  )}

                  <p className="text-gray-700 whitespace-pre-line">
                    {post.body}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    Comments ({comments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {comments.length === 0 ? (
                    <p className="text-gray-500">
                      No comments on this post yet.
                    </p>
                  ) : (
                    <div className="space-y-6">
                      {comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="space-y-3"
                        >
                          <div className="flex items-start">
                            <Avatar className="h-8 w-8 mr-3">
                              <AvatarFallback className="bg-gray-100 text-gray-600 text-xs">
                                {comment.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <h4 className="font-medium">
                                {comment.name}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {comment.email}
                              </p>
                              <p className="mt-2 text-gray-700">
                                {comment.body}
                              </p>
                            </div>
                          </div>
                          {comment.id !==
                            comments[comments.length - 1].id && (
                            <Separator className="my-4" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
