import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import Question from "@/models/question";

export async function GET(
  request: NextRequest,
  { query }: { query: { id?: string[]; all: boolean } }
) {
  const params = request.nextUrl.searchParams;
  const ids = params.getAll("id");
  const all = params.get("all") == "true";

  await connectMongo();

  let questions: any;
  if (all) {
    questions = await Question.find({}).limit(10);
  } else {
    questions = await Question.find({ id: { $in: ids } });
  }
  let status: number;
  if (questions.length == 0) {
    status = 400;
  } else {
    status = 200;
  }

  return NextResponse.json({ response: questions }, { status: status });
}
