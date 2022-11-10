import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
import type { ChangeEvent, ChangeEventHandler } from "react";
import { clientEnv } from "../env/schema.mjs";

const VolunteerReqUpload: React.FC = () => {
  const session = useSession();
  //   const router = useRouter();
  let formData: FormData;
  const handleChange: ChangeEventHandler = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const data = new FormData();
    if (!e.currentTarget.files || e.currentTarget.files.length === 0) return;

    const file = e.currentTarget.files[0];
    console.log(file);
    data.append("file", file as Blob);
    data.append("upload_preset", "hunger-saver");
    data.append("folder", "hunger-saver");
    console.log(data.get("file"));
    formData = data;
  };
  console.log(process.env);
  const submitHandler = () => {
    if (!formData || formData.getAll("file").length === 0) return;
    console.log(formData.get("upload_preset"));
    console.log(formData.get("file"));
    fetch(
      `https://api.cloudinary.com/v1_1/${clientEnv.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => {
      console.log(r);
    });
    return;
  };

  return (
    <>
      <input type="file" onChange={handleChange} />
      {JSON.stringify(session.data?.user)}
      <button onClick={submitHandler}>Submit</button>
    </>
  );
};

export default VolunteerReqUpload;
