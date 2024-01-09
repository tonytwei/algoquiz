import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import User from "@/models/user";
import { getServerSession } from "next-auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  await connectMongo();

  let user = await User.findOne({ email: params.email });
  let status = 401;
  if (!user) {
    user = new User({ email: params.email });
    await user.save();
    status = 201; // 201 Created status code
  } else {
    status = 200; // 200 OK status code
  }
  return NextResponse.json({ response: user }, { status: status });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  await connectMongo();

  const searchParams = request.nextUrl.searchParams;
  const savedAdd = searchParams.get("savedAdd");
  const completedAdd = searchParams.get("completedAdd");
  const savedRemove = searchParams.get("savedRemove");
  const completedRemove = searchParams.get("completedRemove");

  let addParams: { $addToSet: { saved?: string; completed?: string } } = {
    $addToSet: {},
  };
  if (savedAdd !== null) {
    addParams.$addToSet.saved = savedAdd;
  }
  if (completedAdd !== null) {
    addParams.$addToSet.completed = completedAdd;
  }

  let removeParams: { $pull: { saved?: string; completed?: string } } = {
    $pull: {},
  };
  if (savedRemove !== null) {
    removeParams.$pull.saved = savedRemove;
  }
  if (completedRemove !== null) {
    removeParams.$pull.completed = completedRemove;
  }

  let user;
  try {
    await User.findOneAndUpdate({ email: params.email }, addParams);
    user = await User.findOneAndUpdate({ email: params.email }, removeParams, {
      new: true,
    });
    return NextResponse.json({ response: user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
