import { useSession } from "next-auth/react";
import Image from "next/image";
import { signIn, signOut } from "next-auth/react";
import AuthButton from "@components/AuthButton";
import { Session } from "next-auth";
import { useRouter } from "next/router";
import logo from "../../../assets/images/logo.png";

interface User {
  name: string;
  email: string;
  image: string;
}

const Navbar = () => {
  const { data: sessionData } = useSession();
  const user: User = {
    name: sessionData?.user?.name ?? "",
    email: sessionData?.user?.email ?? "",
    image: sessionData?.user?.image ?? "",
  };
  const router = useRouter();
  return (
    <div className=" bg-green-800 p-4">
      <div className="flex w-full justify-between ">
      <div className="md:flex-[0.1] flex-initial justify-center items-center">
        <img src="../../../assets/images/logo.png" alt="logo" className="w-10 cursor-pointer" />
      </div>
        <div onClick={() => router.push("/")} className="flex items-center justify-center text-2xl font-semibold text-slate-50 cursor-pointer">
          Hunger Saver
        </div>
        <div className="">
          {sessionData && sessionData?.user ? (
            <AuthedNavItems user={user} sessionData={sessionData} />
          ) : (
            <AuthButton />
          )}
        </div>
      </div>
    </div>
  );
};

const AuthedNavItems = ({ user, sessionData }: { user: User, sessionData: Session }) => {
  return (
    <div className="flex">
      <div className="mr-3 flex items-center justify-center text-lg font-medium text-slate-100">
        {user.name}
      </div>
      <div className="dropdown avatar">
        <div className="w-16 rounded-full">
          <Image
            src={user.image}
            alt="profile image"
            width={75}
            height={75}
            tabIndex={0}
          />
          <ul
            tabIndex={0}
            className="dropdown-content menu rounded-box right-0 mt-8 w-32 bg-zinc-100 p-2 text-sm shadow"
          >
            <li>
              <button
                className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
                onClick={sessionData ? () => signOut() : () => signIn()}
              >
                {sessionData ? "Sign out" : "Sign in"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
