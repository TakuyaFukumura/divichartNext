"use client";

import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function YearlyDividendChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetch("/api/yearlyDividend")
            .then((res) => res.text())  // まずテキストとしてレスポンスを取得
            .then((text) => {
                console.log(text);  // レスポンスの内容をログに出力
                return JSON.parse(text);  // JSONにパース
            })
            .then((data) => {
                setChartData({
                    labels: data.labels,
                    datasets: [
                        {
                            label: "配当受取額",
                            data: data.data,
                            backgroundColor: "rgba(0, 0, 255, 0.5)",
                        },
                    ],
                });
            })
            .catch((error) => {
                console.error("Error parsing JSON:", error);
            });
    }, []);

    if (!chartData) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">年別配当グラフ</h1>
            <div className="chart-container w-full h-96">
                <Chart type="bar" data={chartData} options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "年別配当受取額",
                        },
                    },
                    scales: {
                        y: {
                            ticks: {
                                callback: function(value) {
                                    return value + "ドル";
                                },
                            },
                        },
                    },
                    maintainAspectRatio: false,
                }} />
            </div>
        </div>
    );
}
