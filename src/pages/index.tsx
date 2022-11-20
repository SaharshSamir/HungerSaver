import { type NextPage } from "next";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Donations from "@components/Donations";

import { trpc } from "@utils/trpc";
import Navbar from "@components/layouts/navbar";
import AuthButton from "@components/AuthButton";

const Home: NextPage = () => {
  const user = trpc.auth.getUser.useQuery();
  const {data: sessionData} = useSession();
  return (
    <>
      <Navbar />
      { sessionData?.user  && !(user && user.data?.type === "VOLUNTEER") ?
        <Link href="/becomeVol"> <button
            className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
            onClick={() => {
              return;
            }}
          >
            Become a volunteer
          </button>
        </Link>
        : ""
      }
      {sessionData?.user ?
        <Link href="/donate">
          <button
            className="rounded-md border border-black bg-violet-50 px-4 py-2 text-xl shadow-lg hover:bg-violet-100"
            onClick={() => {
              return;
            }}
          >
            Donate
          </button>
        </Link>
        : ""
      }
      <Donations />
    </>
  );
};

export default Home;
