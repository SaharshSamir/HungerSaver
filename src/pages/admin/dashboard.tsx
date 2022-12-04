import AdminVolReqs from "@components/AdminVolReqs";
import AdminVerificationReqs from "@components/AdminVerificationReqs";
import Link from "next/link";

const Dashboard = () => {
  return (
    <>
      {/* <AdminVolReqs />
      <AdminVerificationReqs /> */}
      <Link href="/admin/VolunteerReqs" className="btn">
        Volunteer Requests
      </Link>
      <Link href="/admin/verificationReqs" className="btn">
        Verification Requests
      </Link>
    </>
  );
};

export default Dashboard;
