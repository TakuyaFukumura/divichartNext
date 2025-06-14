"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAuthHeaders } from "@/utils/auth";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const { headers } = getAuthHeaders();
        setIsLoggedIn(!!headers?.Authorization);
        // "login"イベントを監視してログイン状態を更新
        const handleLoginEvent = () => {
            const { headers } = getAuthHeaders();
            setIsLoggedIn(!!headers?.Authorization);
        };
        window.addEventListener("login", handleLoginEvent);
        return () => {
            window.removeEventListener("login", handleLoginEvent);
        };
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("jwtToken"); // トークンを削除
        setIsLoggedIn(false); // ログイン状態を更新
        window.location.reload(); // ページをリロード
    };

    return (
        <nav className="bg-gray-900 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <button className="block lg:hidden text-white" onClick={toggleMenu}>
                    ☰
                </button>
                <div className={`${isOpen ? "block" : "hidden"} lg:flex items-center`}>
                    <Link href="/" className="text-white text-xl font-bold mr-6">
                        divichart
                    </Link>
                    <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4">
                        <li><Link href="/dividendPortfolio" className="text-white">配当ポートフォリオ</Link></li>
                        <li><Link href="/yearlyDividend" className="text-white">年別配当グラフ</Link></li>
                        <li><Link href="/monthlyDividend" className="text-white">月別配当グラフ</Link></li>
                        <li><Link href="/cumulativeDividend" className="text-white">累計配当グラフ</Link></li>
                        <li><Link href="/yearlyCumulativeDividend" className="text-white">年間累計配当グラフ</Link></li>
                        <li><Link href="/dividendIncreaseRate" className="text-white">配当増加率グラフ</Link></li>
                        <li><Link href="/dividendIncrease" className="text-white">配当増加額グラフ</Link></li>
                        <li><Link href="/dividendAchievementRate" className="text-white">配当達成率グラフ</Link></li>
                        <li><Link href="/dividendHistoryList" className="text-white">配当履歴一覧</Link></li>
                    </ul>
                    {isLoggedIn ? (
                        <button 
                            onClick={handleLogout} 
                            className="text-white bg-red-500 px-4 py-2 rounded ml-4"
                        >
                            ログアウト
                        </button>
                    ) : (
                        <Link 
                            href="/login" 
                            className="text-white bg-blue-500 px-4 py-2 rounded ml-4"
                        >
                            ログイン
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
