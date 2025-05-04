"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/lib/api";
import Navbar from "@/components/layout/navbar";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { User } from "@/types";

function UserCard({ user }: { user: User }) {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-xl">
            {user.name.charAt(0)}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-500">@{user.username}</p>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="flex items-center text-gray-600 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            {user.email}
          </p>
          <p className="flex items-center text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {user.phone}
          </p>
        </div>
        
        <Link
          href={`/users/${user.id}`}
          className="block w-full py-2 px-4 bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium text-center rounded-md transition-colors duration-300"
        >
          View Profile
        </Link>
      </CardContent>
    </Card>
  );
}

export default function UsersPage() {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900 mb-6">Users</h1>
          
          {isLoading && (
            <div className="flex justify-center">
              <p>Loading users...</p>
            </div>
          )}
          
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-md">
              <p>Error loading users. Please try again.</p>
            </div>
          )}
          
          {users && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}