import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router.js";
// import { useRouter } from "next/router";
import { ChangeEvent, ChangeEventHandler, useEffect } from "react";
import { clientEnv } from "../env/schema.mjs";
import { trpc } from "../utils/trpc";
import Loader from "./layouts/Loader.jsx";

const VolunteerReqUpload: React.FC = () => {
  const session = useSession();
  //let formData: FormData;
  const [file, setFile] = useState<string | Blob>();
  const router = useRouter();
  const { mutate, isLoading, data } = trpc.user.newVolunteerReq.useMutation();
  const user = trpc.auth.getUser.useQuery();

  if (isLoading) {
    return <Loader/>;
  }

  if (data) {
    console.log(data);
    router.push("/");
  }
  //form submit handler
  const submitHandler = async () => {
    console.log(file);

    const formData = new FormData();
    if (file) formData.append("file", file);
    formData.append("upload_preset", "hunger-saver");
    formData.append("folder", "hunger-saver");
    if (!file) return;
    const r = await fetch(
      `https://api.cloudinary.com/v1_1/${clientEnv.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const res = await r.json();
    if (res.secure_url) {
      mutate({
        url: res.secure_url,
      });
    }
    return;
  };

  return (
    <div className="flex flex-col">
      <input
        type="file"
        onChange={(e) => (e.target.files ? setFile(e?.target?.files[0]) : "")}
        className="file-input-bordered file-input w-full max-w-xs"
      />
      <button onClick={submitHandler} className="btn-primary btn max-w-xs">
        Submit
      </button>
    </div>
  );
};

export default VolunteerReqUpload;
