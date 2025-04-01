"use client";

import { useEffect, useState, useRef } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        borderColor: string;
        backgroundColor: string;
        fill: boolean;
    }[];
}

export default function CumulativeDividendChart() {
    const [chartData, setChartData] = useState<ChartData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const chartRef = useRef<any>(null);

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
                            backgroundColor: "rgba(167, 87, 168, 0.2)",
                            fill: true,
                        },
                    ],
                });
            })
            .catch((error) => {
                console.error("データ取得エラー:", error);
                setError("データの取得に失敗しました");
            });
    }, []);

    const handleExport = () => {
        if (chartRef.current) {
            const url = chartRef.current.toBase64Image();
            const link = document.createElement("a");
            link.href = url;

            const now = new Date();
            const timestamp = now.toISOString().replace(/[:-]/g, "").replace(/\..+/, "");
            link.download = `cumulativeDividendChart_${timestamp}.png`;

            link.click();
        }
    };

    if (error) return <p className="text-red-500">{error}</p>;
    if (!chartData) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">累計配当グラフ</h1>
            <div className="chart-container w-full h-96">
                <Chart
                    ref={chartRef}
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
            <button onClick={handleExport} className="mt-4 p-2 bg-blue-500 text-white rounded">画像出力</button>
        </div>
    );
}
