import VolunteerReqUpload from "@components/volunteerReqUpload";
import Navbar from "@components/layouts/navbar";
import Footer from "@components/layouts/Footer";

const Volunteer = () => {
  return (
    <>
      <Navbar />
      <p className="text-lg">
        Please upload any form of identification and we will get back to you
      </p>
      <VolunteerReqUpload />
      <Footer/>
    </>
  );
};

export default Volunteer;
