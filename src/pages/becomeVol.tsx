import VolunteerReqUpload from "@components/volunteerReqUpload";
import Navbar from "@components/layouts/navbar";

const Volunteer = () => {
  return (
    <>
      <Navbar />
      <p>
        Please upload any form of identification and we will get back to you
      </p>
      <VolunteerReqUpload />
    </>
  );
};

export default Volunteer;
