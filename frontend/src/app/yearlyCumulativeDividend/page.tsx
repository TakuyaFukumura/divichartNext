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

export default function YearlyCumulativeDividendPage() {
    const [chartData, setChartData] = useState<ChartData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [targetYear, setTargetYear] = useState<number>(new Date().getFullYear());
    const [years, setYears] = useState<number[]>([]);

    useEffect(() => {
        fetch(`http://localhost:8080/api/yearlyCumulativeDividend?targetYear=${targetYear}`)
            .then((res) => res.json())
            .then((json) => {
                setChartData({
                    labels: Array.from({ length: 12 }, (_, i) => `${targetYear}年${i + 1}月`),
                    datasets: [
                        {
                            label: "累計配当受取額(ドル）",
                            data: json.chartData,
                            borderColor: "rgba(240, 131, 0, 0.5)",
                            fill: {
                                target: "origin",
                                above: "rgba(240, 131, 0, 0.5)",
                            },
                        },
                    ],
                });
                setYears(json.recentYears);
            })
            .catch((error) => {
                console.error("データ取得エラー:", error);
                setError("データの取得に失敗しました");
            });
    }, [targetYear]);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!chartData) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">年間累計配当グラフ</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="selectYear" className="form-label">対象年</label>
                    <select
                        name="targetYear"
                        id="selectYear"
                        onChange={(e) => setTargetYear(Number(e.target.value))}
                        className="form-select"
                        value={targetYear}
                    >
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
            <div className="chart-container w-full h-96">
                <Chart
                    type="line"
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: `配当推移（${targetYear}年1月~${targetYear}年12月）`,
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
