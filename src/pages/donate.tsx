/* When asking a user to donate food, we ask in the details of the food and add the food item to out list of donations (Donateion table). We also link the user to the donation they have made.
 */
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Footer from "@components/layouts/Footer";
import { useEffect } from "react";
import Loader from "@components/layouts/Loader";
import Navbar from "@components/layouts/navbar";
import {useNavigate} from "react-router-dom";

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

  const { mutate, data, isLoading } = trpc.user.newDonation.useMutation();

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

  if (data) {
    router.reload();
  }

  useEffect(() => {
    if (!session.data?.user) {
      router.push("/");
    }
  }, []);

  if (isLoading) {
    return <Loader/>;
  }

  return (
    <div > 
    <Navbar/>
      <div style={{
        display: 'flow-root',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50vh',
      }}><p className="flex w-full justify-center text-4xl ">Donate Food</p>
      <div className="flex w-full items-center justify-center" >
        <form
          className="flex w-4/6 flex-col items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            type="text"
            placeholder="Name"
            className="input-bordered input my-2 w-full max-w-xs"
            {...register("name")}
          />
          <input
            className="input-bordered input my-2 w-full max-w-xs"
            type="date"
            {...register("expiry")}
          />
          <input
            type="text"
            placeholder="Quantity"
            className="input-bordered input my-2 w-full max-w-xs"
            {...register("quantity")}
          />
          <input
            type="text"
            placeholder="Your Address"
            className="input-bordered input my-2 w-full max-w-xs"
            {...register("address")}
          />
          <input
            type="text"
            placeholder="Contact"
            className="input-bordered input my-2 w-full max-w-xs"
            {...register("contact")}
          />
          <select
            className="select-bordered select my-2 w-full max-w-xs"
            {...register("foodType")}
          >
            <option disabled selected>
              Food Type
            </option>
            <option value="VEG" className="flex w-full justify-center text-green  ">Veg</option>
            <option value="NON_VEG">Non Veg</option>
          </select>
          <button className="btn-primary btn" type="submit">
            Submit
          </button> 
        </form>
      </div>
      <Footer/>
      </div>
    </div>
    
  );
};

export default Donate;
export const Item = () => {
  const navigate = useNavigate();
  return (
      <>
        <button onClick={() => navigate(-1)}>Back</button> 
      </>
  );
};
