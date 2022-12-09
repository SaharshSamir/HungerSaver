import VolunteerReqUpload from "@components/volunteerReqUpload";
import Navbar from "@components/layouts/navbar";
import Footer from "@components/layouts/Footer";

import volunteer from '../../assets/images/volunteer_girl.png';

const Volunteer = () => {
  return (
    <div>
      <Navbar />
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
      }}>
      <img alt='volunteer' style={{ width: 100 }} src={String(volunteer)} />
      </div>
      <div style={{
        display: 'flex',
        alignItems: 'center', justifyContent: 'center',}}>
      <p className="text-lg">
        Please upload any form of identification and we will get back to you
      </p>
      </div>
      <div style={{display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
      }}>
      <VolunteerReqUpload />
      </div>
      <Footer/>
    </div>
  );
};

export default Volunteer;
