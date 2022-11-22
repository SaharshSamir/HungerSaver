import type  { NextPage } from "next";
import { useSession } from "next-auth/react";

import AdminHomePage from "@components/AdminHomePage";
import { trpc } from "@utils/trpc";
import DonorHomePage from "@components/DonorHomepage";
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
  const {data: userData, isLoading} = trpc.auth.getUser.useQuery();
  const { data: sessionData } = useSession();

  if(isLoading){return (<p>Laading...</p>)}

  if(userData?.type === "ADMIN"){
    return (<AdminHomePage />);
  }
   
  return (
    <>
      <DonorHomePage />
    </>
  );
};

export default Home;
