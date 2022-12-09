import VolunteerReqUpload from "@components/volunteerReqUpload";
import Navbar from "@components/layouts/navbar";
import VerifyReqUpload from "@components/VerifyReqUpload";
import Footer from "@components/layouts/Footer";
import Image from "next/image";

const VerifyAccount = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-[80vh] items-center justify-between">
        <div className="flex h-full w-1/2 items-center justify-center bg-[#6FC585]">
          <Image
            src="/food-donation.jpg"
            height={600}
            width={500}
            alt="food donation"
          />
        </div>
        <div className="h-full w-1/2">
          <VerifyReqUpload />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VerifyAccount;
