import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/utils/connectMongo";
import User from "@/models/user";
import { getServerSession } from "next-auth";
import { NextApiRequest } from "next";

export async function GET(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  // TODO: remove comments
  // const session = await getServerSession();
  // if (!session || !session.user) {
  //   console.log("No session found");
  //   return NextResponse.json({ error: "No session found" }, { status: 402 });
  // }
  // if (session.user.email !== params.email) {
  //   console.log("User not authorized");
  //   return NextResponse.json({ error: "No session found" }, { status: 403 });
  // }

  console.log("/app/api/user/" + params.email);

  await connectMongo();

  let user = await User.findOne({ email: params.email });
  let status = 401;
  if (!user) {
    console.log("User not found");
    status = 400;
  } else {
    console.log("User found");
  }

  return NextResponse.json({ response: user }, { status: status });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { email: string } }
) {
  // TODO: remove comments
  // const session = await getServerSession();
  // if (!session || !session.user) {
  //   console.log("No session found");
  //   return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/account`);
  // }
  // if (session.user.email !== params.email) {
  //   console.log("User not authorized");
  //   return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/account`);
  // }

  console.log("/app/api/user/" + params.email);

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
