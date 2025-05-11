"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Post } from "@/types";
import { ApexOptions } from "apexcharts"; // <--- Import ApexOptions!!

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface UserPostsChartProps {
  posts: Post[];
  userId: number;
}

export default function UserPostsChart({ posts, userId }: UserPostsChartProps) {
  const [chartData, setChartData] = useState<{
    options: ApexOptions;
    series: { name: string; data: number[] }[];
  }>({
    options: {
      chart: { id: "user-posts", type: "bar" }, // <--- Type-safe "bar"
      xaxis: { categories: [] },
      colors: ["#34D399"],
    },
    series: [
      {
        name: "Posts",
        data: [],
      },
    ],
  });

  useEffect(() => {
    if (posts.length > 0) {
      const userPosts = posts.filter((post) => post.userId === userId);

      setChartData((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          xaxis: {
            categories: userPosts.map((post) => `Post ${post.id}`),
          },
        },
        series: [
          {
            name: "Posts",
            data: userPosts.map(() => 1), // 1 post = 1 bar
          },
        ],
      }));
    }
  }, [posts, userId]);

  return (
    <div className="h-80">
      {typeof window !== "undefined" && (
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height="100%"
        />
      )}
    </div>
  );
}
