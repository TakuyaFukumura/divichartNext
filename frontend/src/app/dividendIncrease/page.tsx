"use client";

import { useEffect, useRef, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";
import { getAuthHeaders } from "@/utils/auth";
import { exportChartImage } from "@/utils/exportChartImage";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string;
    }[];
}

export default function DividendIncreaseChart() {
    const [chartData, setChartData] = useState<ChartData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const chartRef = useRef<any>(null);

    useEffect(() => {
        const { headers, error: authError } = getAuthHeaders();
        if (authError) {
            setError(authError);
            return;
        }
        fetch("http://localhost:8080/api/dividendIncrease", {
              method: "GET",
              headers: headers,
          })
            .then((res) => res.json())
            .then((json) => {
                setChartData({
                    labels: json.labels,
                    datasets: [
                        {
                            label: "増加額(ドル)",
                            data: json.chartData,
                            backgroundColor: "rgba(255, 0, 0, 0.5)",
                        },
                    ],
                });
            })
            .catch((error) => {
                console.error("データ取得エラー:", error);
                setError("データの取得に失敗しました");
            });
    }, []);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!chartData) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">前年比配当増加額</h1>
            <div className="chart-container w-full h-96">
                <Chart
                    ref={chartRef}
                    type="bar"
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "前年比配当増加額",
                            },
                        },
                        scales: {
                            y: {
                                min: -100,
                                ticks: {
                                    callback: (value) => value + "ドル",
                                },
                            },
                        },
                        maintainAspectRatio: false,
                    }}
                />
            </div>
            <button
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => exportChartImage(chartRef, "dividend_increase")}
            >
                画像出力
            </button>
        </div>
    );
}
