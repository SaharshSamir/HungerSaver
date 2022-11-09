import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/layouts/navbar";

const Volunteer = () => {
  const [user, setUser] = useState();
  return (
    <>
      <Navbar />
      <p>
        Please upload any form of identification and we will get back to you
      </p>
      <Stuff />
    </>
  );
};

const Stuff: React.FC = () => {
  const session = useSession();
  const router = useRouter();
  const submitHandler = () => {
    return;
  };
  useEffect(() => {
    if (!session.data?.user) {
      console.log(!session.data?.user);
    }
  }, [session]);

  return (
    <>
      <input type="file" />
      {JSON.stringify(session.data?.user)}
      <button onClick={submitHandler}>Submit</button>
    </>
  );
};

export default Volunteer;
