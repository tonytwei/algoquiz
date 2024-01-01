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

  console.log("/app/api/email/" + params.email);

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
  const searchParams = request.nextUrl.searchParams;
  console.log(searchParams);

  console.log("savedAdd:", searchParams.get("savedAdd"));
  console.log("completedAdd:", searchParams.get("completedAdd"));
  console.log("savedRemove:", searchParams.get("savedRemove"));
  console.log("completedRemove:", searchParams.get("completedRemove"));

  console.log("/app/api/email/" + params.email);

  await connectMongo();

  // update params not working
  const updateParams = {
    $addToSet: {
      saved: searchParams.get("savedAdd"),
      completed: searchParams.get("completedAdd"),
    },
    $pull: {
      saved: searchParams.get("savedRemove"),
      completed: searchParams.get("completedRemove"),
    },
  };

  console.log(updateParams);
  let user = await User.findOneAndUpdate(
    { email: params.email },
    updateParams,
    { new: true }
  );

  return NextResponse.json({ response: user }, { status: 200 });
}
