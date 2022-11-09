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
    <>
      <div className="flex w-full justify-between bg-green-800">
        <div className="">Hunger Saver</div>
        <div className="">
          {session.data?.user ? <AuthedNavItems user={user} /> : ""}
        </div>
      </div>
    </>
  );
};

const AuthedNavItems = ({ user }: { user: User }) => {
  return (
    <>
      <div>{user.name}</div>
      <Image src={user.image} alt="profile image" width={100} height={100} />
    </>
  );
};

export default Navbar;
