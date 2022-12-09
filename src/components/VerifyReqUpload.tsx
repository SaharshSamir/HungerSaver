import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router.js";
import { useForm } from "react-hook-form";
import type { SubmitHandler, FieldValues } from "react-hook-form";
import { ChangeEvent, ChangeEventHandler, useEffect } from "react";
import { clientEnv } from "../env/schema.mjs";
import { trpc } from "../utils/trpc";
import Loader from "./layouts/Loader.jsx";
import ErrorAlert from "@components/elements/ErrorAlert";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
const schema = z.object({
  registrationNo: z.string(),
  city: z.string(),
  file:
    typeof window === "undefined"
      ? z.undefined()
      : z.instanceof(FileList).refine((file) => file.length !== 0, {
          message: "File is required",
        }),
});

interface FormShape {
  registrationNo: string;
  city: string;
  file: FileList;
}

const VerifyReqUpload: React.FC = () => {
  const session = useSession();
  //let formData: FormData;
  // const [file, setFile] = useState<string | Blob>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormShape>({ resolver: zodResolver(schema) });
  const { mutate, isLoading, data } =
    trpc.user.newVerificationReq.useMutation();

  if (isLoading) {
    return <Loader/>;
  }

  if (data) {
    console.log(data);
    router.push("/");
  }
  //form submit handler
  const submitHandler: SubmitHandler<FieldValues & FormShape> = async (
    input
  ) => {
    const file = input.file[0];
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
        registrationNo: input.registrationNo,
        city: input.city,
      });
    }
    return;
  };

  return (
    <div className="flex flex-col">
      <p>upload identification for verification</p>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="my-2 w-full max-w-xs ">
          <label className="text-slate-600">Registration Number</label>
          <input
            type="text"
            placeholder="Registration No"
            className="input-bordered input w-full max-w-xs"
            {...register("registrationNo", { required: true })}
          />
          {errors.registrationNo && (
            <ErrorAlert message={errors.registrationNo.message} />
          )}
        </div>
        <div className="my-2 w-full max-w-xs ">
          <label className="text-slate-600">Your City</label>
          <input
            type="text"
            placeholder="City"
            className="input-bordered input w-full max-w-xs"
            {...register("city", { required: true })}
          />
          {errors.city && <ErrorAlert message={errors.city.message} />}
        </div>
        <div className="my-2 w-full max-w-xs ">
          <label className="text-slate-600">Upload Document</label>
          <input
            type="file"
            className="file-input-bordered file-input w-full max-w-xs"
            {...register("file", { required: true })}
          />
          {errors.file && <ErrorAlert message={errors.file.message} />}
        </div>
        <button type="submit" className="btn-primary btn max-w-xs">
          Submit
        </button>
      </form>
    </div>
  );
};

export default VerifyReqUpload;
