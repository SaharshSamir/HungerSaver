import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
import type { ChangeEvent, ChangeEventHandler } from "react";
import { clientEnv } from "../env/schema.mjs";
import { trpc } from "../utils/trpc";

const VolunteerReqUpload: React.FC = () => {
  const session = useSession();
  let formData: FormData;

  const { mutate, isLoading, data } = trpc.user.newVolunteerReq.useMutation();

  //form change handler
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

  //form submit handler
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
      //TODO: useQuery to make a new VolunteerRequest in the DB
      if (r.url) {
        mutate({
          url: r.url,
        });
      }
      console.log(r.url);
    });
    if (data) {
      alert(`success, ig ${JSON.stringify(data)}`);
    }
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
