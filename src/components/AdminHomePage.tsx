import { useRouter } from "next/router";
import Navbar from "@components/layouts/navbar";
import { trpc } from "@utils/trpc";
import { User } from "@prisma/client";
import Loader from "./layouts/Loader";

interface Props {
  user: User;
  isLoading: boolean;
}

const AdminHomePage = ({ user, isLoading }: Props) => {
  const router = useRouter();
  if(isLoading) return (<Loader/>)
  return (
    <>
      <Navbar />
      <button className="btn" onClick={() => router.push("/admin/dashboard")}>
        Volunteer Requests
      </button>
    </>
  );
};

export default AdminHomePage;
