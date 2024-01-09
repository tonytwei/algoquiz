import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import Question from "@/models/question";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const filter: { [key: string]: any } = {};
  Object.entries(Object.fromEntries(params)).forEach(([key, value]) => {
    if (typeof value === "string") filter[key] = { $in: value.split(",") };
  });

  await connectMongo();

  let status = 200;
  let res = await Question.where(filter)
    .select("id title difficulty")
    .exec()
    .then((res) => {
      const order = ["easy", "medium", "hard"];
      res = res.sort(
        (a, b) => order.indexOf(a.difficulty) - order.indexOf(b.difficulty)
      );
      return res;
    })
    .catch((error) => {
      console.error(error);
      status = 401;
    });

  return NextResponse.json({ response: res }, { status: status });
}
