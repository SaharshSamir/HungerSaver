/* When asking a user to donate food, we ask in the details of the food and add the food item to out list of donations (Donateion table). We also link the user to the donation they have made.
 */
import type { FoodType } from "@prisma/client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

// type SubmitHandlerArgs = FormData

interface FormData {
  name: string;
  expiry: string;
  quantity: string;
  address: string;
  contact: string;
  foodType: FoodType;
  city: string;
}
const Donate = () => {
  const router = useRouter();
  const session = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { mutate, data, isLoading } = trpc.user.newDonation.useMutation();

  const onSubmit: SubmitHandler<FieldValues & FormData> = (input) => {
    console.log(input);

    mutate({
      name: input.name,
      expiry: new Date(input.expiry),
      contact: input.contact,
      address: input.address,
      foodType: input.foodType,
      quantity: Number.parseInt(input.quantity),
      city: input.city,
    });
  };

  if (data) {
    router.reload();
  }

  useEffect(() => {
    if (!session.data?.user) {
      router.push("/");
    }
  }, []);

  if (isLoading) {
    return <p className="text-6xl">Loading...</p>;
  }

  return (
    <>
      <p className="text-4xl ">Donate Food</p>
      <div className="flex w-full items-center justify-center">
        <form
          className="flex w-4/6 flex-col items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="my-2 w-full max-w-xs ">
            <label className="text-slate-600">Food Name</label>
            <input
              type="text"
              placeholder="Name"
              className="input-bordered input  w-full max-w-xs"
              {...register("name")}
            />
          </div>
          <div className="my-2 w-full max-w-xs">
            <label className="text-slate-600">Expiry Date</label>
            <input
              className="input-bordered input w-full max-w-xs"
              type="date"
              {...register("expiry")}
            />
          </div>
          <div className="my-2 w-full max-w-xs">
            <label className="text-slate-600">Food Quantity</label>
            <input
              type="number"
              placeholder="Quantity"
              className="input-bordered input w-full max-w-xs"
              {...register("quantity")}
            />
          </div>
          <div className="my-2 w-full max-w-xs">
            <label className="text-slate-600">Your City</label>
            <select
              className="select-bordered select w-full max-w-xs text-slate-600"
              {...register("city")}
            >
              <option disabled selected className="text-slate-600">
                City
              </option>
              <option value="Pune">Pune</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Aurangabad">Aurangabad</option>
              <option value="Nagpur">Nagpur</option>
              <option value="Nashik">Nashik</option>
            </select>
          </div>
          <div className="my-2 w-full max-w-xs">
            <label className="text-slate-600">Your Address</label>
            <input
              type="text"
              placeholder="Address"
              className="input-bordered input w-full max-w-xs"
              {...register("address")}
            />
          </div>
          <div className="my-2 w-full max-w-xs">
            <label className="text-slate-600">Your Phone No.</label>
            <input
              type="text"
              placeholder="Contact"
              className="input-bordered input w-full max-w-xs"
              {...register("contact")}
            />
          </div>
          <div className="my-2 w-full max-w-xs">
            <label className="text-slate-600">Food Type</label>
            <select
              className="select-bordered select w-full max-w-xs"
              {...register("foodType")}
            >
              <option disabled selected className="text-slate-600">
                Food Type
              </option>
              <option value="VEG">Veg</option>
              <option value="NON_VEG">Non Veg</option>
            </select>
          </div>
          <button className="btn-primary btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Donate;
