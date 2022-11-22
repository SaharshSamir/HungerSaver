import { useRouter } from "next/router"
import Navbar from "@components/layouts/navbar";
import {trpc }from "@utils/trpc";

const AdminHomePage = () => {
  const router = useRouter();
  const { data: userData, isLoading} = trpc.auth.getUser.useQuery(undefined, {retry: 4});
  if(isLoading) return (<p>Loading...g</p>)
  return (
    <>
      <Navbar />
      <button className="btn" onClick={() => router.push("/admin/dashboard")}>
        Volunteer Requests
      </button>
    </>
  )
}

export default AdminHomePage;
