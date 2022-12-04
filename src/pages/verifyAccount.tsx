import VolunteerReqUpload from "@components/volunteerReqUpload";
import Navbar from "@components/layouts/navbar";
import VerifyReqUpload from "@components/VerifyReqUpload";

const VerifyAccount = () => {
  return (
    <>
      <Navbar />
      <p className="text-lg">
        Please upload any form of identification and we will get back to you
      </p>
      <VerifyReqUpload />
    </>
  );
};

export default VerifyAccount;
