import { useEffect } from "react";
import Navbar from "@components/layouts/navbar";
import { useRouter } from "next/router";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";

const Landing = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (sessionData) {
      router.push("/");
      //return (<Landing />)
    }
  }, [sessionData])
  return (
    <>
      <Navbar />
      <p>Landing Page</p>
    </>
  )
}

export default Landing;
