import Navbar from "../components/layouts/navbar";
import VolunteerReqUpload from "../components/volunteerReqUpload";

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
