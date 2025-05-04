"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Post } from "@/types";

// Dynamic import to avoid SSR issues with ApexCharts
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface UserPostsChartProps {
  posts: Post[];
}

export default function UserPostsChart({ posts }: UserPostsChartProps) {
  const [chartData, setChartData] = useState<any>({
    options: {
      chart: {
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        title: {
          text: "Number of Posts",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val + " posts";
          },
        },
      },
      colors: ["#3B82F6"],
    },
    series: [
      {
        name: "Posts",
        data: [],
      },
    ],
  });

  useEffect(() => {
    if (posts && posts.length > 0) {
      // Count posts by user ID
      const userPostCounts: Record<string, number> = {};
      
      posts.forEach((post) => {
        const userId = post.userId.toString();
        userPostCounts[userId] = (userPostCounts[userId] || 0) + 1;
      });
      
      // Get top 10 users by post count
      const sortedUserIds = Object.keys(userPostCounts).sort(
        (a, b) => userPostCounts[b] - userPostCounts[a]
      ).slice(0, 10);
      
      // Set chart data
      setChartData({
        ...chartData,
        options: {
          ...chartData.options,
          xaxis: {
            categories: sortedUserIds.map(id => `User ${id}`),
          },
        },
        series: [
          {
            name: "Posts",
            data: sortedUserIds.map(id => userPostCounts[id]),
          },
        ],
      });
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