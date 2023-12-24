import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import User from "@/models/user";

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  const DEFAULT_EMAIL: string = "email";
  const email: string = params.email || DEFAULT_EMAIL;
  console.log("/app/api/email/" + email);

  await connectMongo();

  let user = await User.findOne({ email: email });
  let status = 200;
  if (!user) {
    console.log("User not found");
    status = 400;
  } else {
    console.log("User found");
  }

  return NextResponse.json({ response: user }, { status: status });
}
