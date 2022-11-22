import type { User, VolunteerRequest } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "@utils/trpc";
import Navbar from "@components/layouts/navbar";

const Dashboard = () => {
  const router = useRouter();
  const session = useSession();
  const { data, isLoading, error } = trpc.auth.getUser.useQuery(undefined, {
    retry: 4,
  });
  useEffect(() => {
    if (data?.type && data?.type !== "ADMIN") {
      router.push("/");
    }
  }, [data?.type, router]);
  const { data: reqData, isLoading: isReqLoading } =
    trpc.user.getVolunteerReqs.useQuery();
  //if (!session.data?.user) return (<></>);
  console.log(data);
  if (isLoading || isReqLoading) {
    return <p className="text-4xl">Loading...</p>;
  }
  return (
    <>
      <Navbar />
      <p>Dashboard</p>
      <p>somethihg</p>
      <div className="flex w-full justify-center">
        <div className="w-5/6 overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Document Type</th>
                <th>Document</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {reqData?.map((req, idx) => {
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
