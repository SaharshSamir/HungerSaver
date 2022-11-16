import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "../../utils/trpc";

const Dashboard = () => {
  const router = useRouter();
  const session = useSession();
  const { data, isLoading, error } = trpc.auth.getUser.useQuery();
  useEffect(() => {
    if (data?.type && data?.type !== "ADMIN") {
      router.push("/");
    }
  }, []);
  if (!session.data?.user) return;
  console.log(data);
  return (
    <>
      <p>Dashboard</p>
      <AuthStuff />
    </>
  );
};

const AuthStuff = () => {
  return (
    <>
      <p>somethihg</p>
    </>
  );
};

export default Dashboard;
