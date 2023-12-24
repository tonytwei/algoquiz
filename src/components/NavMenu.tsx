"use client";
import { signIn, signOut } from "next-auth/react";

export default function NavMenu(params: {
  session: any;
  saved: any;
  completed: any;
}) {
  return (
    <>
      <h1>{params.session?.user?.name}</h1>
      <br />
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}
