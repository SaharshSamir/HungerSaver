import type { User, VolunteerRequest } from "@prisma/client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "@utils/trpc";
import Navbar from "@components/layouts/navbar";
import Modal from "./elements/modal";

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
      <p>Dashboard</p>
      <p>somethihg</p>
      <div className="flex w-full justify-center">
        <div className="w-5/6 overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>City</th>
                <th>Contact</th>
                <th>Document Type</th>
                <th>Document</th>
                <th>Approve</th>
              </tr>
            </thead>
            <tbody>
              {reqData?.map((req, idx) => {
                console.log("idx", idx);
                return <SingleReq key={idx} data={req} idx={idx} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

interface DataProps {
  data: VolunteerRequest & {
    user: User;
  };
  idx: number;
}

const SingleReq = ({ data, idx }: DataProps) => {
  console.log("key", idx);
  const { mutate } = trpc.user.handleVolunteerReq.useMutation();

  const router = useRouter();

  const handleVolReq = (isApproved: boolean) => {
    mutate({ reqId: data.id, isApproved });
    router.reload();
  };

  console.log("user age year", data.user.dob?.getFullYear());
  console.log("current year", data.user.dob?.getFullYear());
  const age =
    (data.user.dob?.getFullYear() || 0) - (new Date().getFullYear() || 0);

  return (
    <tr key={idx}>
      <th>{idx + 1}</th>
      <td>{data.user.name}</td>
      <td>{data.user.email}</td>
      <td>{age}</td>
      <td>{data.user.city}</td>
      <td>{data.user.contact}</td>
      <td>{data.documentType}</td>
      <td>
        <Modal buttonTitle="View Document">
          <Image
            src={data.documennt ? data.documennt : ""}
            alt="document"
            height={1000}
            width={1000}
          />
        </Modal>
      </td>
      <td>
        <button
          onClick={() => handleVolReq(true)}
          className="btn-success btn mr-2"
        >
          Yes
        </button>
        <button
          onClick={() => handleVolReq(false)}
          className="btn-error btn ml-2"
        >
          No
        </button>
      </td>
    </tr>
  );
};

export default Dashboard;

// <div className="border-2 border-solid border-slate-600 p-2">
//   <p>user: {JSON.stringify(data.user)}</p>
//   <Image src={data.documennt || ""} alt="doc" width={100} height={100} />
//   <button
//     onClick={() => {
//       handleVolReq(true);
//     }}
//   >
//     Ok
//   </button>
//   <button onClick={() => handleVolReq(false)}>No</button>
// </div>
