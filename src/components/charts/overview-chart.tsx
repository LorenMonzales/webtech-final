"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Stats } from "@/types";

// Dynamic import to avoid SSR issues with ApexCharts
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface OverviewChartProps {
  stats: Stats;
}

export default function OverviewChart({ stats }: OverviewChartProps) {
  const [chartData, setChartData] = useState<any>({
    options: {
      chart: {
        type: "donut",
      },
      labels: ["Users", "Posts", "Comments"],
      colors: ["#3B82F6", "#10B981", "#8B5CF6"],
      legend: {
        position: "bottom",
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
      tooltip: {
        y: {
          formatter: function (val: number) {
            return val.toString();
          },
        },
      },
    },
    series: [0, 0, 0],
  });

  useEffect(() => {
    if (stats) {
      setChartData({
        ...chartData,
        series: [stats.users, stats.posts, stats.comments],
      });
    }
  }, [stats]);

  return (
    <div className="h-80">
      {typeof window !== "undefined" && (
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="donut"
          height="100%"
        />
      )}
    </div>
  );
}