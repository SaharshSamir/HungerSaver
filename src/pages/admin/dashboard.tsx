import AdminVolReqs from "@components/AdminVolReqs";
import AdminVerificationReqs from "@components/AdminVerificationReqs";

const Dashboard = () => {
  return (
    <>
      {/* <AdminVolReqs />
      <AdminVerificationReqs /> */}
      <a href="/admin/VolunteerReqs" className="btn">
        Volunteer Requests
      </a>
      <a href="/admin/verificationReqs" className="btn">
        Verification Requests
      </a>
    </>
  );
};

export default Dashboard;
