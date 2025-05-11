"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Post } from "@/types";
import { ApexOptions } from "apexcharts"; // <-- IMPORT ApexOptions!!

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface OverviewChartProps {
  posts: Post[];
}

export default function OverviewChart({ posts }: OverviewChartProps) {
  const [chartData, setChartData] = useState<{
    options: ApexOptions;
    series: { name: string; data: number[] }[];
  }>({
    options: {
      chart: { id: "overview", type: "bar" }, // ← now safe!
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
