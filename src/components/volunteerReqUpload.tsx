import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router.js";
import ErrorAlert from "@components/elements/ErrorAlert";
import { clientEnv } from "../env/schema.mjs";
import { trpc } from "../utils/trpc";
import Loader from "./layouts/Loader.jsx";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {useForm} from "react-hook-form";
import type { SubmitHandler, FieldValues } from "react-hook-form";
interface FormShape {
  name: string;
  phoneInput: string;
  dob: string;
  docType: string;
  city: string;
  file: FileList;
}

const inputSchema = z.object({
  name: z.string().min(1),
  phoneInput: z.string().min(10).max(10),
  dob: z.string().min(1),
  docType: z.string().min(1),
  city: z.string().min(1),
  file:
    typeof window === "undefined"
      ? z.undefined()
      : z.instanceof(FileList).refine((file) => file.length !== 0, {
          message: "File is required",
        }),
})

const VolunteerReqUpload: React.FC = () => {
  const session = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormShape>({ resolver: zodResolver(inputSchema) });
  //let formData: FormData;
  // const [file, setFile] = useState<string | Blob>();
  const router = useRouter();
  const { mutate, isLoading, data } = trpc.user.newVolunteerReq.useMutation();
  // const user = trpc.auth.getUser.useQuery();

  if (isLoading) {
    return <Loader/>;
  }
  // if (Object.keys(errors).length > 0) alert(JSON.stringify(errors));
  if (data) {
    console.log(data);
    router.push("/");
  }
  //form submit handler
  const submitHandler: SubmitHandler<FieldValues & FormShape> = async (
    input
  ) => {
    // return;
    const formData = new FormData();
    const file = input.file[0];
    if (file) formData.append("file", file);
    formData.append("upload_preset", "hunger-saver");
    formData.append("folder", "hunger-saver");

    const r = await fetch(
      `https://api.cloudinary.com/v1_1/${clientEnv.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const res = await r.json();
    // console.log(poop);
    console.log("file", typeof input.file);
    console.log("input", input);
    console.log(res.secure_url);
    console.log(typeof input.dob);
    if (res.secure_url) {
      mutate({
        name: input.name,
        contact: input.phoneInput,
        dob: new Date(input.dob),
        docType: input.docType,
        city: input.city,
        url: res.secure_url,
      });
    }
    return;
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="my-2 w-full max-w-xs ">
          <label className="text-slate-600">Name</label>
          <input
            type="text"
            placeholder="name"
            className="input-bordered input w-full max-w-xs"
            {...register("name", { required: true })}
          />
          {errors.name && <ErrorAlert message={errors.name.message} />}
        </div>
        <div className="my-2 w-full max-w-xs ">
          <label className="text-slate-600">Phone No</label>
          <input
            type="tel"
            placeholder="contact"
            className="input-bordered input w-full max-w-xs"
            {...register("phoneInput", {
              required: true,
              minLength: 10,
              maxLength: 10,
            })}
          />
          {errors.phoneInput && (
            <ErrorAlert message={errors.phoneInput.message} />
          )}
          {/* <Controller
            name="phoneInput"
            control={control}
            rules={{
              validate: (value) => isValidPhoneNumber(value),
            }}
            render={({ field: { onChange, value } }) => (
              <PhoneInput
                value={value}
                onChange={onChange}
                defaultCountry="TH"
                id="phone-input"
                name="phoneInput"
                control={control}
              />
            )}
          /> */}
          {/* <PhoneInput
            // name="phoneInput"
            className="input-bordered input w-full max-w-xs"
            control={control}
            country={"IN"}
            defaultCountry="IN"
            smartCaret={true}
            inputComponent={InputComponent}
            withCountryCallingCode={true}
            {...register("phoneInput")}
            rules={{ required: true }}
          /> */}
        </div>
        <div className="my-2 w-full max-w-xs ">
          <label className="text-slate-600">
            City You Want to Volunteer in
          </label>
          <input
            type="text"
            placeholder="city"
            className="input-bordered input w-full max-w-xs"
            {...register("city", { required: true })}
          />
          {errors.city && <ErrorAlert message={errors.city.message} />}
        </div>
        <div className="my-2 w-full max-w-xs ">
          <label className="text-slate-600">Date Of Birth</label>
          <input
            type="date"
            placeholder="DOB"
            className="input-bordered input w-full max-w-xs"
            {...register("dob", { required: true })}
          />
          {errors.dob && <ErrorAlert message={errors.dob.message} />}
        </div>
        <div className="my-2 w-full max-w-xs">
          <label className="text-slate-600">Document Type</label>
          <select
            className="select-bordered select w-full max-w-xs"
            {...register("docType", { required: true })}
          >
            <option
              disabled
              value={undefined}
              selected
              className="text-slate-600"
            >
              Document Type
            </option>
            <option value="passport">Passport</option>
            <option value="Aadhar">Aadhar Card</option>
            <option value="Pan">Pan Card</option>
          </select>
          {errors.docType && <ErrorAlert message={errors.docType.message} />}
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

export default VolunteerReqUpload;
