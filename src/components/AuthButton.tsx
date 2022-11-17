import { Session } from "next-auth";
import { signOut, signIn } from "next-auth/react";

const AuthButton = ({ sessionData }: { sessionData?: Session }) => {
  return (
    <button
      className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
      onClick={sessionData ? () => signOut() : () => signIn()}
    >
      {sessionData ? "Sign out" : "Sign in"}
    </button>
  );
};

export default AuthButton;
