import VolunteerReqUpload from "@components/volunteerReqUpload";
import Navbar from "@components/layouts/navbar";
import Footer from "@components/layouts/Footer";
import Image from "next/image";

const Volunteer = () => {
  return (
    <div className="h-screen">
      <Navbar />
      <div className="flex w-full">
        <div className="my-3 flex w-full items-center justify-center border-r-[1px] border-teal-600">
          <Image
            src="/volunteer_girl.png"
            height={500}
            width={500}
            alt="volunteer girl"
          />
        </div>
        <div className="flex w-full items-center justify-center p-4">
          {/* <p className="text-lg">
            Please upload any form of identification and we will get back to you
          </p> */}
          <VolunteerReqUpload />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Volunteer;
