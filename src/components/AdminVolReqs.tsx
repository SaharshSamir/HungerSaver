import type { User, VolunteerRequest } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "@utils/trpc";
import Navbar from  "@components/layouts/navbar";

const Dashboard = () => {
  const router = useRouter();
  const session = useSession();
  const { data, isLoading, error } = trpc.auth.getUser.useQuery();
  useEffect(() => {
    if (data?.type && data?.type !== "ADMIN") {
      router.push("/");
    }
  }, [data?.type, router]);
  //if (!session.data?.user) return (<></>);
  console.log(data);
  if (isLoading) {
    return <p className="text-4xl">Loading...</p>;
  }
  return (
    <>
      <Navbar />
      <p>Dashboard</p>
      <VolunteerRequests />
    </>
  );
};

const VolunteerRequests = () => {
  const { data, isLoading } = trpc.user.getVolunteerReqs.useQuery();
  if (isLoading) {
    return <p className="text-4xl">Loading...</p>;
  }
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
  const { mutate } = trpc.user.handleVolunteerReq.useMutation();
  const router = useRouter();
  const handleVolReq = (isApproved: boolean) => {
    mutate({ reqId: data.id, isApproved });
    router.reload();
  };
  return (
    <div className="border-2 border-solid border-slate-600 p-2">
      <p>user: {JSON.stringify(data.user)}</p>
      <Image src={data.documennt || ""} alt="doc" width={100} height={100} />
      <button
        onClick={() => {
          handleVolReq(true);
        }}
      >
        Ok
      </button>
      <button onClick={() => handleVolReq(false)}>No</button>
    </div>
  );
};

export default Dashboard;
