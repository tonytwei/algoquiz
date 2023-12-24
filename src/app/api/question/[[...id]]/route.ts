import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import Question from "@/models/question";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const DEFAULT_ID: string = process.env.DEFAULT_QUESTION_ID!;
  const id: string = params.id || DEFAULT_ID;
  console.log("/app/api/question/" + id);

  await connectMongo();

  let question = await Question.findOne({ id: id });
  let status = 200;
  if (!question) {
    console.log("Question not found");
    status = 400;
  } else {
    console.log("Question found");
  }

  return NextResponse.json({ response: question }, { status: status });
}
