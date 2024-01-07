import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import Question from "@/models/question";

export async function GET(
  request: NextRequest,
  { query }: { query: { id?: string[] } }
) {
  const params = request.nextUrl.searchParams;
  const ids = params.getAll("id");

  await connectMongo();

  let questions = await Question.find({ id: { $in: ids } });
  let status: number;
  if (questions.length == ids.length) {
    console.log("Questions found");
    status = 200;
  } else {
    console.log("Questions not found");
    status = 400;
  }

  return NextResponse.json({ response: questions }, { status: status });
}
