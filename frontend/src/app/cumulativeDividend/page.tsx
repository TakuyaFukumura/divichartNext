"use client";

import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        fill: {
            target: string;
            above: string;
        };
    }[];
}

export default function CumulativeDividendChart() {
    const [chartData, setChartData] = useState<ChartData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/cumulativeDividend")
            .then((res) => res.json())
            .then((json) => {
                setChartData({
                    labels: json.labels,
                    datasets: [
                        {
                            label: "累計配当受取額(ドル）",
                            data: json.chartData,
                            borderColor: "rgba(167, 87, 168, 0.5)",
                            fill: {
                                target: "origin",
                                above: "rgba(167, 87, 168, 0.5)",
                            },
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
            <h1 className="text-2xl font-bold mb-4">累計配当グラフ</h1>
            <div className="chart-container w-full h-96">
                <Chart
                    type="line"
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "配当推移",
                            },
                        },
                        scales: {
                            y: {
                                min: 0,
                                ticks: {
                                    callback: (value) => value + "ドル",
                                },
                            },
                        },
                        maintainAspectRatio: false,
                    }}
                />
            </div>
        </div>
    );
}
