"use client";

import { useEffect, useState, useRef } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement } from "chart.js";
import { Chart } from "react-chartjs-2";
import { getAuthHeaders } from "@/utils/auth";
import { exportChartImage } from "@/utils/exportChartImage";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, ArcElement);

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
    }[];
}

export default function DividendPortfolio() {
    const [chartData, setChartData] = useState<ChartData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [targetYear, setTargetYear] = useState<number>(new Date().getFullYear());
    const [years, setYears] = useState<number[]>([]);
    const chartRef = useRef<any>(null);

    useEffect(() => {
        const { headers, error: authError } = getAuthHeaders();
        if (authError) {
            setError(authError);
            return;
        }
        fetch(`http://localhost:8080/api/dividendPortfolio?targetYear=${targetYear}`, {
                method: "GET",
                headers: headers,
            })
            .then((res) => res.json())
            .then((json) => {
                setYears(json.recentYears);
                setChartData({
                    labels: json.labels,
                    datasets: [
                        {
                            label: "USD",
                            data: json.chartData,
                            backgroundColor: [
                                "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#FFCD56",
                                "#C9CBCF", "#36A2EB", "#FF6384", "#4BC0C0", "#9966FF", "#FF9F40"
                            ],
                        },
                    ],
                });
            })
            .catch((error) => {
                console.error("データ取得エラー:", error);
                setError("データの取得に失敗しました");
            });
    }, [targetYear]);

    const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTargetYear(Number(event.target.value));
    };

    const handleExport = () => {
        exportChartImage(chartRef, "dividendPortfolioChart");
    };

    if (error) return <p className="text-red-500">{error}</p>;
    if (!chartData) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">配当ポートフォリオ</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="selectYear" className="form-label">対象年</label>
                    <select name="targetYear" id="selectYear" onChange={handleYearChange} className="form-select" defaultValue={targetYear}>
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
                    ref={chartRef}
                    type="pie"
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: '銘柄別 配当受取額割合',
                            },
                            legend: {
                                maxHeight: 70,
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
