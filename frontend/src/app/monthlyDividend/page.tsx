"use client";

import { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface MonthlyDividendDto {
    recentYears: number[];
    targetYear: number;
    chartData: number[];
}

export default function MonthlyDividendChart() {
    const [chartData, setChartData] = useState<number[]>([]);
    const [years, setYears] = useState<number[]>([]);
    const [targetYear, setTargetYear] = useState<number>(new Date().getFullYear());
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/monthlyDividend?targetYear=${targetYear}`)
            .then((res) => res.json())
            .then((json: MonthlyDividendDto) => {
                setChartData(json.chartData);
                setYears(json.recentYears);
                setTargetYear(json.targetYear);
            })
            .catch((error) => {
                console.error("データ取得エラー:", error);
                setError("データの取得に失敗しました");
            });
    }, [targetYear]);

    if (error) return <p className="text-red-500">{error}</p>;
    if (!chartData.length) return <p>Loading...</p>;

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTargetYear(Number(event.target.value));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">月別配当グラフ</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="selectYear" className="form-label">対象年</label>
                    <select name="targetYear" id="selectYear" onChange={handleYearChange} className="form-select" value={targetYear}>
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
                    type="bar"
                    data={{
                        labels: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
                        datasets: [
                            {
                                label: "配当受取額",
                                data: chartData,
                                backgroundColor: "rgba(130, 201, 169, 0.5)",
                            },
                        ],
                    }}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "月別配当受取額",
                            },
                        },
                        scales: {
                            y: {
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
