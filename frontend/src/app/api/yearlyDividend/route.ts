import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    return NextResponse.json({
            labels: ["2020", "2021", "2022", "2023", "2024"],
            data: [500, 700, 800, 1200, 1500]
        });
}
