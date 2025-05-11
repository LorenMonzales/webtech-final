"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Post, Comment } from "@/types";

// Dynamic import to avoid SSR issues with ApexCharts
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface CommentsChartProps {
  posts: Post[];
  comments: Comment[];
}

interface ChartData {
  options: {
    chart: { type: string; toolbar: { show: boolean } };
    plotOptions: { bar: { horizontal: boolean; columnWidth: string } };
    dataLabels: { enabled: boolean };
    stroke: { show: boolean; width: number; colors: string[] };
    xaxis: { categories: string[] };
    yaxis: { title: { text: string } };
    fill: { opacity: number };
    tooltip: {
      y: {
        formatter: (val: number) => string;
      };
    };
    colors: string[];
  };
  series: {
    name: string;
    data: number[];
  }[];
}

export default function CommentsChart({ posts, comments }: CommentsChartProps) {
  const [chartData, setChartData] = useState<ChartData>({
    options: {
      chart: {
        type: "bar",
        toolbar: { show: false },
      },
      plotOptions: {
        bar: { horizontal: false, columnWidth: "55%" },
      },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ["transparent"] },
      xaxis: { categories: [] },
      yaxis: { title: { text: "Number of Comments" } },
      fill: { opacity: 1 },
      tooltip: {
        y: {
          formatter: (val: number) => `${val} comments`,
        },
      },
      colors: ["#8B5CF6"],
    },
    series: [
      {
        name: "Comments",
        data: [],
      },
    ],
  });

  useEffect(() => {
    if (posts.length > 0 && comments.length > 0) {
      const commentsByPost: Record<string, number> = {};

      comments.forEach((comment) => {
        const postId = comment.postId.toString();
        commentsByPost[postId] = (commentsByPost[postId] || 0) + 1;
      });

      const topPostIds = Object.keys(commentsByPost)
        .sort((a, b) => commentsByPost[b] - commentsByPost[a])
        .slice(0, 5);

      const topPosts = topPostIds.map((id) => {
        const post = posts.find((p) => p.id === parseInt(id));
        return {
          id,
          title: post ? post.title.slice(0, 20) + "..." : `Post ${id}`,
          comments: commentsByPost[id],
        };
      });

      setChartData((prev) => ({
        ...prev,
        options: {
          ...prev.options,
          xaxis: {
            categories: topPosts.map((post) => `Post ${post.id}`),
          },
        },
        series: [
          {
            name: "Comments",
            data: topPosts.map((post) => post.comments),
          },
        ],
      }));
    }
  }, [posts, comments]);

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
