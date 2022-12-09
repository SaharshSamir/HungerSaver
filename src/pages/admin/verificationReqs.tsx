import AdminVerificationReqs from "@components/AdminVerificationReqs";
import Navbar from "@components/layouts/navbar";
import { trpc } from "@utils/trpc";

const VerificationRequest = () => {
  // const {data: sessionData} = trpc.auth.getSession.useQuery();
  return (
    <>
      <Navbar />
      <AdminVerificationReqs />
    </>
  );
};

export default VerificationRequest;
