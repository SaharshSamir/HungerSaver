import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import AdminHomePage from "@components/AdminHomePage";
import { trpc } from "@utils/trpc";
import DonorHomePage from "@components/DonorHomepage";
import { useEffect } from "react";
import VolunteerHomepage from "@components/VolunteerHomepage";
import Footer from "@components/layouts/Footer";
/*
  reference: 
  https://robinhoodarmy.com/  
TODO:
ADMIN
1. phone no, dropdown(aadhar, paan, liscence, passport), number, image 2. view all the orders (have access to details)
3.  tally of total food delivered

HOMEPAGE
basically landing page

VOLUNTEER
ask volunteer when order is done, how many ppl were fed
after delivery, admin has to be notified about the number of people fed.
*/

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!sessionData) {
      router.push("/landing");
      //return (<Landing />)
    }
  }, []);
  return <HomePageContent />;
};

const HomePageContent = () => {
  const { data: userData, isLoading } = trpc.auth.getUser.useQuery(undefined, {
    retry: 4,
  });

  if (userData?.type === "ADMIN") {
    return <AdminHomePage user={userData} isLoading={isLoading} />;
  }

  if (userData?.type === "VOLUNTEER") {
    return <VolunteerHomepage user={userData} isLoading={isLoading} />;
  }

  return <DonorHomePage user={userData} isLoading={isLoading} />;
};

const Landing = () => {
  return (<>
    <h1>Landing Page</h1>
    <Footer/>
    </>
  )
}
export default Home;
