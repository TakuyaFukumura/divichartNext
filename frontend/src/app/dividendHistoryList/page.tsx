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

    // ページ情報をAPIレスポンスに合わせて取得
    const pageInfo = data.page;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">配当履歴一覧</h1>

            {/* ページネーション */}
            <div className="flex justify-center mb-4 gap-1">
                {/* 前へ */}
                <button
                    onClick={() => setPage(pageInfo.number - 1)}
                    className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
                    disabled={pageInfo.number === 0}
                >
                    &lt;
                </button>
                {/* ページ番号 */}
                {(() => {
                    const pages = [];
                    const total = pageInfo.totalPages;
                    const current = pageInfo.number;
                    const range = 2; // 前後2ページ

                    // 1ページ目は常に表示
                    pages.push(
                        <button
                            key={0}
                            onClick={() => setPage(0)}
                            className={`px-3 py-2 rounded ${current === 0 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                            disabled={current === 0}
                        >
                            1
                        </button>
                    );

                    // 省略記号（先頭側）
                    if (current - range > 1) {
                        pages.push(<span key="start-ellipsis">...</span>);
                    }

                    // 中央のページ番号
                    for (let i = Math.max(1, current - range); i <= Math.min(total - 2, current + range); i++) {
                        pages.push(
                            <button
                                key={i}
                                onClick={() => setPage(i)}
                                className={`px-3 py-2 rounded ${current === i ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                disabled={current === i}
                            >
                                {i + 1}
                            </button>
                        );
                    }

                    // 省略記号（末尾側）
                    if (current + range < total - 2) {
                        pages.push(<span key="end-ellipsis">...</span>);
                    }

                    // 最後のページ
                    if (total > 1) {
                        pages.push(
                            <button
                                key={total - 1}
                                onClick={() => setPage(total - 1)}
                                className={`px-3 py-2 rounded ${current === total - 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                                disabled={current === total - 1}
                            >
                                {total}
                            </button>
                        );
                    }
                    return pages;
                })()}
                {/* 次へ */}
                <button
                    onClick={() => setPage(pageInfo.number + 1)}
                    className="px-3 py-2 bg-gray-200 rounded disabled:opacity-50"
                    disabled={pageInfo.number === pageInfo.totalPages - 1}
                >
                    &gt;
                </button>
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
                <label htmlFor="csv-upload" className="block mb-2">
                    楽天証券の配当金・分配金一覧CSVファイルを選択してください。
                </label>
                <input
                    id="csv-upload"
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
                    <label htmlFor="tickerSymbol" className="block">ティッカーシンボル</label>
                    <input
                        id="tickerSymbol"
                        type="text"
                        value={form.tickerSymbol}
                        onChange={(e) => setForm({ ...form, tickerSymbol: e.target.value })}
                        className="border px-2 py-1 w-full"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="amountReceived" className="block">配当金額</label>
                    <input
                        id="amountReceived"
                        type="number"
                        step="0.01"
                        value={form.amountReceived}
                        onChange={(e) => setForm({ ...form, amountReceived: e.target.value })}
                        className="border px-2 py-1 w-full"
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="receiptDate" className="block">受取年月</label>
                    <input
                        id="receiptDate"
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
