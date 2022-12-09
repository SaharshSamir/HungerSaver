import { useRouter } from "next/router";
import Navbar from "@components/layouts/navbar";
import { trpc } from "@utils/trpc";
import { User } from "@prisma/client";
import Loader from "./layouts/Loader";
import Footer from "@components/layouts/Footer";
import Link from "next/link";

interface Props {
  user: User;
  isLoading: boolean;
}

const AdminHomePage = ({ user, isLoading }: Props) => {
  const router = useRouter();
  if (isLoading) return <Loader />;
  return (
    <div style={{
      backgroundImage: `url(/vol.png)`,
      backgroundSize: "170%",
      fontFamily: "sans-serif",
    }}>
      <Navbar />
      <div className="flex h-[80vh] w  items-center justify-center pl-0 pr-10">
        <div className="flex">
          <div className="mb-4">
            <div className="w-full">
              <div className="my-10 w-full max-w-xs">
                <Link href="/admin/volunteerReqs" className="flex my-2 w-full rounded p-20  green-glassmorphism text-green animate-slide-in font-semibold">
                  Volunteer Requests
                </Link>
                </div>
                <div className="my-10 w-full max-w-xs ">
                <Link href="/admin/verificationReqs" className="flex my-2 w-full rounded p-20  green-glassmorphism text-green animate-slide-in font-semibold">
                  Verification Requests
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminHomePage;
