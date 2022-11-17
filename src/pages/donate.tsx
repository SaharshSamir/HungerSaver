/* 
    When asking a user to donate food, we ask in the details of the food and add the food item
    to out list of donations (Donateion table). We also link the user to the donation they have made.
*/
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { trpc } from "@utils/trpc";
import { TRPCClient } from "@trpc/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface FormData {
  name: string;
  expiry: string;
  quantity: string;
  address: string;
  contact: string;
  foodType: string;
}

const Donate = () => {
  const router = useRouter();
  const session = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {mutate, data, isLoading} = trpc.user.newDonation.useMutation();


  const onSubmit: SubmitHandler<FieldValues | FormData> = (input) => {
    console.log(input);

    mutate({
      name: input.name,
      expiry: new Date(input.expiry),
      contact: input.contact,
      address: input.address,
      foodType: input.foodType,
      quantity: input.quantity,
    });

  };

  if(data) {
    router.reload();
  }

  useEffect(() => {

    if(!session.data?.user) {
      router.push("/");
    }
  }, [])

  if(isLoading){
    return (
      <p className="text-6xl">Loading...</p>
    )
  }
  
  return (
    <>
      <p className="text-4xl ">Donate Food</p>
      <form className="flex flex-col w-40" onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input
          className="border-2 border-solid border-slate-600"
          {...register("name")}
        />
        <label>Expiry</label>
        <input
          className="border-2 border-solid border-slate-600"
          type="date"
          {...register("expiry")}
        />
        <label>Quantity</label>
        <input
          className="border-2 border-solid border-slate-600"
          {...register("quantity")}
        />
        <label>Address</label>
        <input
          className="border-2 border-solid border-slate-600"
          {...register("address")}
        />
        <label>Contact</label>
        <input
          className="border-2 border-solid border-slate-600"
          {...register("contact")}
        />
        <label>Food Type</label>
        <input
          className="border-2 border-solid border-slate-600"
          {...register("foodType")}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default Donate;
