"use client";

import { useState } from "react";

export default function CreateUserAccountPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);
        setSuccessMessage(null);

        try {
            const response = await fetch("http://localhost:8080/api/createUserAccount/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                setSuccessMessage("アカウント作成に成功しました");
                setUsername("");
                setPassword("");
            } else {
                const errorText = await response.text();
                setErrorMessage(errorText || "アカウント作成に失敗しました");
            }
        } catch (error) {
            console.error("エラー:", error);
            setErrorMessage("アカウント作成中にエラーが発生しました");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">アカウント作成</h1>
            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
            {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium">
                        ユーザー名
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium">
                        パスワード
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                        required
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        登録
                    </button>
                </div>
            </form>
            <p className="mt-4">
                <a
                    href="/login"
                    className="text-blue-500 hover:underline"
                >
                    ログイン画面へ戻る
                </a>
            </p>
        </div>
    );
}
