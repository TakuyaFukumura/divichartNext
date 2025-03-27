"use client";

import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function YearlyDividendChart() {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/api/yearlyDividend", {
            credentials: "include", // Cookieを送信（Spring Securityで認証する場合）
        })
            .then((res) => res.json())
            .then((json) => {
                setChartData({
                    labels: json.labels.split(","), // サーバー側が文字列を返すならパース
                    datasets: [
                        {
                            label: "配当受取額",
                            data: JSON.parse(json.chartData), // 必要に応じてパース
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
