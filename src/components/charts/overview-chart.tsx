"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Post, Comment } from "@/types";

// Dynamic import to avoid SSR issues with ApexCharts
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface OverviewChartProps {
  posts: Post[];
  comments: Comment[];
}

interface ChartData {
  options: {
    chart: { id: string; type: string };
    xaxis: { categories: string[] };
    colors: string[];
  };
  series: {
    name: string;
    data: number[];
  }[];
}

export default function OverviewChart({ posts, comments }: OverviewChartProps) {
  const [chartData, setChartData] = useState<ChartData>({
    options: {
      chart: { id: "overview", type: "bar" },
      xaxis: { categories: [] },
      colors: ["#6366F1"],
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
      const postsPerUser: Record<number, number> = {};

      posts.forEach((post) => {
        postsPerUser[post.userId] = (postsPerUser[post.userId] || 0) + 1;
      });

      const topUsers = Object.entries(postsPerUser)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([userId, postCount]) => ({
          userId,
          postCount,
        }));

      setChartData((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          xaxis: {
            categories: topUsers.map((user) => `User ${user.userId}`),
          },
        },
        series: [
          {
            name: "Posts",
            data: topUsers.map((user) => user.postCount),
          },
        ],
      }));
    }
  }, [posts]);

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
