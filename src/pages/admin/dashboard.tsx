import { User, VolunteerRequest } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "@utils/trpc";

const Dashboard = () => {
  const router = useRouter();
  const session = useSession();
  const { data, isLoading, error } = trpc.auth.getUser.useQuery();
  useEffect(() => {
    if (data?.type && data?.type !== "ADMIN") {
      router.push("/");
    }
  }, []);
  if (!session.data?.user) return;
  console.log(data);
  return (
    <>
      <p>Dashboard</p>
      <VolunteerRequests />
    </>
  );
};

const VolunteerRequests = () => {
  const { data } = trpc.user.getVolunteerReqs.useQuery();
  return (
    <>
      <p>somethihg</p>
      {data?.map((req, idx) => {
        return <SingleReq data={req} key={idx} />;
      })}
    </>
  );
};

interface DataProps {
  data: VolunteerRequest & {
    user: User;
  };
}

const SingleReq = ({ data }: DataProps) => {
  return (
    <div className="border-slate-600 p-2">
      <p>user: {JSON.stringify(data.user)}</p>
      <Image src={data.documennt || ""} alt="doc" width={100} height={100} />
    </div>
  );
};

export default Dashboard;
