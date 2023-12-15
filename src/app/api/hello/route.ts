import { NextResponse, NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    return new NextResponse('hi')
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    console.log(body)
    console.log("POST REQUEST")
    return new NextResponse('OK')
}