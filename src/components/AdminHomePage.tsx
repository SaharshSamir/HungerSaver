import { useRouter } from "next/router";
import Navbar from "@components/layouts/navbar";
import { trpc } from "@utils/trpc";
import { User } from "@prisma/client";

interface Props {
  user: User;
  isLoading: boolean;
}

const AdminHomePage = ({ user, isLoading }: Props) => {
  const router = useRouter();
  if (isLoading) return <p>Loading...</p>;
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
