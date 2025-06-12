"use client";

import { useEffect, useState } from "react";
import { getAuthHeaders } from "@/utils/auth";

interface DividendHistory {
    id: number;
    tickerSymbol: string;
    amountReceived: number;
    receiptDate: string;
}

interface PageData {
    content: DividendHistory[];
    totalPages: number;
    number: number;
    first: boolean;
    last: boolean;
}

export default function DividendHistoryList() {
    const [data, setData] = useState<PageData | null>(null);
    const [page, setPage] = useState(0);
    const [csvFile, setCsvFile] = useState<File | null>(null);
    const [form, setForm] = useState({
        tickerSymbol: "",
        amountReceived: "",
        receiptDate: "",
    });
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const { headers, error: authError } = getAuthHeaders();
        if (authError) {
            setError(authError);
            return;
        }
        fetch(`http://localhost:8080/api/dividendHistoryList?page=${page}`, {
              method: "GET",
              headers: headers,
          })
            .then((res) => res.json())
            .then(setData)
            .catch((err) => {
                console.error("データ取得エラー:", err);
                setError("データの取得に失敗しました");
            });
    }, [page]);

    const handleCsvUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!csvFile) return;
        const formData = new FormData();
        formData.append("csvFile", csvFile);

        try {
            await fetch("http://localhost:8080/api/dividendHistoryList/bulkInsert", {
                method: "POST",
                body: formData,
            });
            alert("CSVアップロード成功");
            setPage(0); // リロード
        } catch (err) {
            console.error("CSVアップロードエラー:", err);
            alert("CSVアップロードに失敗しました");
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch("http://localhost:8080/api/dividendHistoryList/insert", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            alert("登録成功");
            setPage(0); // リロード
        } catch (err) {
            console.error("登録エラー:", err);
            alert("登録に失敗しました");
        }
    };

    if (error) return <p className="text-red-500">{error}</p>;
    if (!data) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">配当履歴一覧</h1>

            {/* ページネーション */}
            <div className="flex justify-center mb-4">
                {page > 2 && (
                    <button onClick={() => setPage(0)} className="px-4 py-2 bg-gray-300 rounded">
                        1
                    </button>
                )}
                {!data.first && (
                    <button onClick={() => setPage(page - 1)} className="px-4 py-2 bg-gray-300 rounded">
                        &lt;
                    </button>
                )}
                {Array.from(
                    { length: 5 },
                    (_, i) => page - 2 + i
                ).map((pageNo) =>
                    pageNo >= 0 && pageNo < data.totalPages ? (
                        <button
                            key={pageNo}
                            onClick={() => setPage(pageNo)}
                            className={`px-4 py-2 ${
                                pageNo === page ? "bg-blue-500 text-white" : "bg-gray-300"
                            } rounded`}
                        >
                            {pageNo + 1}
                        </button>
                    ) : null
                )}
                {!data.last && (
                    <button onClick={() => setPage(page + 1)} className="px-4 py-2 bg-gray-300 rounded">
                        &gt;
                    </button>
                )}
                {data.totalPages > page + 3 && (
                    <button
                        onClick={() => setPage(data.totalPages - 1)}
                        className="px-4 py-2 bg-gray-300 rounded"
                    >
                        {data.totalPages}
                    </button>
                )}
            </div>

            {/* 一覧表 */}
            <table className="table-auto w-full border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="border border-gray-400 px-4 py-2">ID</th>
                        <th className="border border-gray-400 px-4 py-2">ティッカーシンボル</th>
                        <th className="border border-gray-400 px-4 py-2">配当金額</th>
                        <th className="border border-gray-400 px-4 py-2">受取年月</th>
                    </tr>
                </thead>
                <tbody>
                    {data.content.map((item) => (
                        <tr key={item.id}>
                            <td className="border border-gray-400 px-4 py-2">
                                <a
                                    href={`/dividendHistoryEdit?id=${item.id}`}
                                    className="text-blue-500 underline"
                                >
                                    {item.id}
                                </a>
                            </td>
                            <td className="border border-gray-400 px-4 py-2">{item.tickerSymbol}</td>
                            <td className="border border-gray-400 px-4 py-2">{item.amountReceived}</td>
                            <td className="border border-gray-400 px-4 py-2">{item.receiptDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* CSV一括登録 */}
            <form onSubmit={handleCsvUpload} className="mt-4">
                <label className="block mb-2">
                    楽天証券の配当金・分配金一覧CSVファイルを選択してください。
                </label>
                <input
                    type="file"
                    accept=".csv"
                    onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                    className="block mb-2"
                />
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    アップロード
                </button>
            </form>

            {/* 個別登録 */}
            <form onSubmit={handleFormSubmit} className="mt-4">
                <div className="mb-2">
                    <label className="block">ティッカーシンボル</label>
                    <input
                        type="text"
                        value={form.tickerSymbol}
                        onChange={(e) => setForm({ ...form, tickerSymbol: e.target.value })}
                        className="border px-2 py-1 w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="block">配当金額</label>
                    <input
                        type="number"
                        step="0.01"
                        value={form.amountReceived}
                        onChange={(e) => setForm({ ...form, amountReceived: e.target.value })}
                        className="border px-2 py-1 w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="block">受取年月</label>
                    <input
                        type="date"
                        value={form.receiptDate}
                        onChange={(e) => setForm({ ...form, receiptDate: e.target.value })}
                        className="border px-2 py-1 w-full"
                    />
                </div>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                    登録
                </button>
            </form>
        </div>
    );
}
