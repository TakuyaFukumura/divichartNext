"use client";

import { useState, useEffect } from "react";

interface DividendHistoryEditForm {
    id: number;
    tickerSymbol: string;
    amountReceived: number;
    receiptDate: string;
}

export default function DividendHistoryEditPage() {
    const [form, setForm] = useState<DividendHistoryEditForm | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // 成功メッセージ用の状態を追加

    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get("id");
        if (!id) {
            setError("IDが指定されていません");
            setLoading(false);
            return;
        }

        fetch(`http://localhost:8080/api/dividendHistoryEdit/${id}`)
            .then((res) => res.json())
            .then(setForm)
            .catch((err) => {
                console.error("データ取得エラー:", err);
                setError("データの取得に失敗しました");
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form) return;

        try {
            await fetch("http://localhost:8080/api/dividendHistoryEdit/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            setSuccessMessage("更新が成功しました");
        } catch (err) {
            console.error("更新エラー:", err);
            setError("更新に失敗しました");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">配当履歴編集画面</h1>
            {successMessage && <p className="text-green-500 mb-4">{successMessage}</p>}
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="border p-4">
                <div className="mb-3">
                    <label htmlFor="id" className="block font-bold mb-1">ID</label>
                    <input
                        type="number"
                        id="id"
                        value={form?.id || ""}
                        readOnly
                        className="border px-2 py-1 w-full"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="tickerSymbol" className="block font-bold mb-1">ティッカー</label>
                    <input
                        type="text"
                        id="tickerSymbol"
                        value={form?.tickerSymbol || ""}
                        onChange={(e) => setForm({ ...form, tickerSymbol: e.target.value })}
                        className="border px-2 py-1 w-full"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="amountReceived" className="block font-bold mb-1">配当金額</label>
                    <input
                        type="number"
                        id="amountReceived"
                        step="0.01"
                        value={form?.amountReceived || ""}
                        onChange={(e) => setForm({ ...form, amountReceived: parseFloat(e.target.value) })}
                        className="border px-2 py-1 w-full"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="receiptDate" className="block font-bold mb-1">受取年月</label>
                    <input
                        type="date"
                        id="receiptDate"
                        value={form?.receiptDate || ""}
                        onChange={(e) => setForm({ ...form, receiptDate: e.target.value })}
                        className="border px-2 py-1 w-full"
                    />
                </div>
                <div className="mb-3">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                        更新
                    </button>
                </div>
            </form>
        </div>
    );
}
