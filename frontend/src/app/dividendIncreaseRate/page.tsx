"use client";

import { useEffect, useState, useRef } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";
import { getAuthHeaders } from "@/utils/auth";
import { exportChartImage } from "@/utils/exportChartImage";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DividendIncreaseRateDto {
    labels: string[];
    chartData: number[];
}

export default function DividendIncreaseChart() {
    const [chartData, setChartData] = useState<DividendIncreaseRateDto | null>(null);
    const [error, setError] = useState<string | null>(null);
    const chartRef = useRef<any>(null);

    useEffect(() => {
        const { headers, error: authError } = getAuthHeaders();
        if (authError) {
            setError(authError);
            return;
        }
        fetch("http://localhost:8080/api/dividendIncreaseRate", {
              method: "GET",
              headers: headers,
          })
            .then((res) => res.json())
            .then((json: DividendIncreaseRateDto) => {
                setChartData(json);
            })
            .catch((error) => {
                console.error("データ取得エラー:", error);
                setError("データの取得に失敗しました");
            });
    }, []);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!chartData) return <p>Loading...</p>;

    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: "増加率(%)",
                data: chartData.chartData,
                backgroundColor: "rgba(128, 128, 128, 0.5)",
            },
        ],
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">前年比配当増加率</h1>
            <div className="chart-container w-full h-96">
                <Chart
                    ref={chartRef}
                    type="bar"
                    data={data}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "前年比配当増加率",
                            },
                        },
                        scales: {
                            y: {
                                min: -100,
                                ticks: {
                                    callback: (value) => value + "%",
                                },
                            },
                        },
                        maintainAspectRatio: false,
                    }}
                />
            </div>
            <button
                onClick={() => exportChartImage(chartRef, "dividendIncreaseRateChart")}
                className="mt-4 p-2 bg-blue-500 text-white rounded"
            >
                画像出力
            </button>
        </div>
    );
}
