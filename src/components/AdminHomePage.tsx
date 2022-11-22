import { useRouter } from "next/router"
import Navbar from "@components/layouts/navbar";

const AdminHomePage = () => {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <button className="btn" onClick={() => router.push("/admin/dashboard")}>
        Volunteer Requests
      </button>
    </>
  )
}

export default AdminHomePage;
