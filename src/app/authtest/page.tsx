"use client";
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        <h1>{session?.user?.name}</h1>
        <button
          className="text-neutral-100 hover:text-neutral-300"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  } else {
    return (
      <button
        className="text-neutral-100 hover:text-neutral-300"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    );
  }
}

export default function AuthTest() {
  return (
    <div>
      <SessionProvider>
        <AuthButton />
      </SessionProvider>
    </div>
  );
}
