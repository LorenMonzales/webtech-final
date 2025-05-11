"use client";

import { useQuery } from "@tanstack/react-query";
import { getPosts, getComments, getUsers } from "@/lib/api";
import Navbar from "@/components/layout/navbar";
import OverviewChart from "@/components/charts/overview-chart";
import CommentsChart from "@/components/charts/comments-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Post, Comment, User } from "@/types";

export default function DashboardPage() {
  const { data: posts = [], isLoading: loadingPosts } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  const { data: comments = [], isLoading: loadingComments } = useQuery<Comment[]>({
    queryKey: ["comments"],
    queryFn: getComments,
  });

  const { data: users = [], isLoading: loadingUsers } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  const isLoading = loadingPosts || loadingComments || loadingUsers;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Dashboard
          </h1>

          {isLoading ? (
            <div className="flex justify-center">
              <p>Loading dashboard...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Posts Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <OverviewChart posts={posts} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Comments Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <CommentsChart posts={posts} comments={comments} />
                </CardContent>
              </Card>

              {/* Optional: pwede mo pa dagdagan ng ibang charts dito */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
