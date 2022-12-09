import { useRouter } from "next/router";
import Navbar from "@components/layouts/navbar";
import { trpc } from "@utils/trpc";
import { User } from "@prisma/client";
import Loader from "./layouts/Loader";
import Link from "next/link";

interface Props {
  user: User;
  isLoading: boolean;
}

const AdminHomePage = ({ user, isLoading }: Props) => {
  const router = useRouter();
  if (isLoading) return <Loader />;
  return (
    <>
      <Navbar />
      <Link href="/admin/volunteerReqs" className="btn">
        Volunteer Requests
      </Link>
      <Link href="/admin/verificationReqs" className="btn">
        Verification Requests
      </Link>
    </>
  );
};

export default AdminHomePage;
