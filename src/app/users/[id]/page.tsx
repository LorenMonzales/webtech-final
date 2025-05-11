"use client";

import { useQuery } from "@tanstack/react-query";
import { getUser, getUserPosts } from "@/lib/api";
import Navbar from "@/components/layout/navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function UserProfilePage() {
  const { id } = useParams<{ id: string }>(); // ← fix: id will be string

  const { data: user, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", id],
    queryFn: () => getUser(id!), // ← fix: id is forced non-null
    enabled: !!id,
  });

  const { data: posts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ["userPosts", id],
    queryFn: () => getUserPosts(id!),
    enabled: !!id,
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {isLoadingUser ? (
            <p>Loading user details...</p>
          ) : !user ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-md">
              <p>User not found. <Link href="/users" className="underline">Return to users list</Link></p>
            </div>
          ) : (
            <>
              <div className="flex items-center mb-6">
                <Link href="/users" className="text-blue-600 hover:text-blue-800 mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
                <h1 className="text-2xl font-semibold text-gray-900">User Profile</h1>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center mb-6">
                        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-2xl mb-3">
                          {user.name.charAt(0)}
                        </div>
                        <h2 className="text-xl font-semibold">{user.name}</h2>
                        <p className="text-gray-500">@{user.username}</p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email</p>
                          <p className="mt-1">{user.email}</p>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone</p>
                          <p className="mt-1">{user.phone}</p>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-500">Website</p>
                          <p className="mt-1">{user.website}</p>
                        </div>

                        <Separator />

                        <div>
                          <p className="text-sm font-medium text-gray-500">Company</p>
                          <p className="mt-1 font-medium">{user.company.name}</p>
                          <p className="text-sm text-gray-500 italic">&quot;{user.company.catchPhrase}&quot;</p>
                          <p className="text-sm text-gray-500">{user.company.bs}</p>
                        </div>

                        <Separator />

                        <div>
                          <p className="text-sm font-medium text-gray-500">Address</p>
                          <p className="mt-1">{user.address.street}, {user.address.suite}</p>
                          <p>{user.address.city}, {user.address.zipcode}</p>
                        </div>

                        <div className="mt-4">
                          <h3 className="text-sm font-medium text-gray-500 mb-2">Location on Map</h3>
                          <iframe
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(user.address.street + ', ' + user.address.city)}&z=12&output=embed`}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Posts by {user.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoadingPosts ? (
                        <p>Loading posts...</p>
                      ) : !posts || posts.length === 0 ? (
                        <p className="text-gray-500">No posts found for this user.</p>
                      ) : (
                        <div className="space-y-4">
                          {posts.map((post) => (
                            <div key={post.id} className="border rounded-lg p-4 hover:bg-gray-50">
                              <h3 className="text-lg font-medium mb-2">{post.title}</h3>
                              <p className="text-gray-600 mb-3">{post.body}</p>
                              <Link
                                href={`/posts/${post.id}`}
                                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                              >
                                View post
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </Link>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
