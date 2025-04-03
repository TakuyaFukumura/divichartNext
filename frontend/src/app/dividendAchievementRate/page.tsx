"use client";

import { useEffect, useState, useRef } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DividendAchievementRateDto {
    labels: string[];
    chartData: number[];
    targetDividend: number;
    targetDividendYen: number;
}

export default function DividendAchievementRate() {
    const [data, setData] = useState<DividendAchievementRateDto | null>(null);
    const [targetDividend, setTargetDividend] = useState<number>(135);
    const chartRef = useRef<any>(null);

    useEffect(() => {
        fetch(`http://localhost:8080/api/dividendAchievementRate?goalDividendAmount=${targetDividend}`)
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((error) => console.error("データ取得エラー:", error));
    }, [targetDividend]);

    const handleTargetDividendChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTargetDividend(Number(event.target.value));
    };

    if (!data) return <p>Loading...</p>;

    const chartData = {
        labels: data.labels,
        datasets: [{
            label: '配当達成率（％）',
            data: data.chartData,
            backgroundColor: "rgba(0, 255, 255, 0.5)"
        }]
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">配当達成率グラフ</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="targetDividend" className="block text-sm font-medium text-gray-700">目標配当額（単位：ドル/月）</label>
                    <input
                        type="number"
                        id="targetDividend"
                        step="1"
                        name="targetDividend"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        min="1"
                        list="targetDividendList"
                        value={targetDividend}
                        onChange={handleTargetDividendChange}
                    />
                    <datalist id="targetDividendList">
                        <option value="10"></option>
                        <option value="100"></option>
                        <option value="500"></option>
                        <option value="1000"></option>
                        <option value="3000"></option>
                        <option value="5000"></option>
                    </datalist>
                </div>
            </form>
            <p>換算：{data.targetDividendYen}円（レート設定：150円/ドル）</p>
            <div className="chart-container relative h-96 w-full">
                <Chart
                    ref={chartRef}
                    type="bar"
                    data={chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: '配当達成率'
                            }
                        },
                        scales: {
                            y: {
                                min: 0,
                                ticks: {
                                    callback: function(value) {
                                        return value + '%';
                                    }
                                }
                            }
                        },
                        maintainAspectRatio: false
                    }}
                />
            </div>
        </div>
    );
}
