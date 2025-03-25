import Link from "next/link";

export default function Header() {
    return (
        <nav className="bg-gray-900 p-4">
            <div className="container mx-auto flex items-center justify-between">
                <button className="block lg:hidden text-white">
                    ☰
                </button>
                <div className="hidden lg:flex items-center">
                    <Link href="/" className="text-white text-xl font-bold mr-6">
                        divichart
                    </Link>
                    <ul className="flex space-x-4">
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
                </div>
            </div>
        </nav>
    );
}
