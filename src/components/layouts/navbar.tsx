import { useSession } from "next-auth/react";
import Image from "next/image";

interface User {
  name: string;
  email: string;
  image: string;
}

const Navbar = () => {
  const session = useSession();
  const user: User = {
    name: session.data?.user?.name ?? "",
    email: session.data?.user?.email ?? "",
    image: session.data?.user?.image ?? "",
  };
  return (
    <div className=" p-4 bg-green-800">
      <div className="flex w-full justify-between ">
        <div className="">Hunger Saver</div>
        <div className="">
          {session.data?.user ? <AuthedNavItems user={user} /> : ""}
        </div>
      </div>
    </div>
  );
};

const AuthedNavItems = ({ user }: { user: User }) => {
  return (
    <div className="flex">
      <div>{user.name}</div>
      <div className="avatar">
        <div className="w-16 rounded-full">
          <Image src={user.image} alt="profile image" width={75} height={75} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
