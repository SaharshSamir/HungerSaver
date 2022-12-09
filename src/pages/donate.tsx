/* When asking a user to donate food, we ask in the details of the food and add the food item to out list of donations (Donateion table). We also link the user to the donation they have made.
 */
import type { FoodType } from "@prisma/client";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Footer from "@components/layouts/Footer";
import { useEffect } from "react";
import Loader from "@components/layouts/Loader";
import Navbar from "@components/layouts/navbar";
import Image from "next/image";

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
  }, [session, router]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Navbar />
      <div className="flex h-[80vh] items-center justify-between">
        <div className="flex h-full w-1/2 items-center justify-center bg-[#7BCB90]">
          <Image
            src="/food-donation2.jpg"
            height={600}
            width={500}
            alt="food donation"
          />
        </div>
        <div className="flex h-full w-1/2 flex-col items-center justify-center">
          <p className="flex w-full justify-center text-4xl ">Donate Food</p>
          <div className="flex w-full items-center justify-center">
            <form
              className="flex w-4/6 flex-col items-center justify-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex">
                <div className="mx-2">
                  <div className="w-full">
                    <div className="my-2 w-full max-w-xs ">
                      <label className="text-sm text-slate-600">Food Name</label>
                      <input
                        type="text"
                        placeholder="Food Name"
                        className="input-bordered input my-2 w-full max-w-xs"
                        {...register("name")}
                      />
                    </div>
                  </div>
                  <div className="my-2 w-full max-w-xs ">
                    <label className="text-sm text-slate-600">
                      Expiry Date
                    </label>
                    <input
                      className="input-bordered input my-2 w-full max-w-xs"
                      type="date"
                      {...register("expiry")}
                    />
                  </div>
                  <div className="my-2 w-full max-w-xs ">
                    <label className="text-sm text-slate-600">Quanitity</label>
                    <input
                      type="text"
                      placeholder="Quantity"
                      className="input-bordered input my-2 w-full max-w-xs"
                      {...register("quantity")}
                    />
                  </div>
                </div>
                {/*}----------------------------------------------------SPLIT------------------------------*/}
                <div className="mx-2">
                  <div className="my-2 w-full max-w-xs ">
                    <label className="text-sm text-slate-600">
                      Your Address
                    </label>
                    <input
                      type="text"
                      placeholder="Your Address"
                      className="input-bordered input my-2 w-full max-w-xs"
                      {...register("address")}
                    />
                  </div>
                  <div className="my-2 w-full max-w-xs ">
                    <label className="text-sm text-slate-600">
                      Your City
                    </label>
                    <input
                      type="text"
                      placeholder="City"
                      className="input-bordered input my-2 w-full max-w-xs"
                      {...register("city")}
                    />
                  </div>
                  <div className="my-2 w-full max-w-xs ">
                    <label className="text-sm text-slate-600">Contact</label>
                    <input
                      type="text"
                      placeholder="Contact"
                      className="input-bordered input my-2 w-full max-w-xs"
                      {...register("contact")}
                    />
                  </div>
                  <div className="my-2 w-full max-w-xs ">
                    <label className="text-sm text-slate-600">Food Type</label>
                    <select
                      className="select-bordered select my-2 w-full max-w-xs"
                      {...register("foodType")}
                    >
                      <option disabled selected>
                        Food Type
                      </option>
                      <option
                        value="VEG"
                        className="text-green flex w-full justify-center  "
                      >
                        Veg
                      </option>
                      <option value="NON_VEG">Non Veg</option>
                    </select>
                  </div>
                </div>
              </div>
              <button className="btn-primary btn" type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Donate;
// export const Item = () => {
//   // const navigate = useNavigate();
//   return (
//       <>
//         <button onClick={() => navigate(-1)}>Back</button>
//       </>
//   );
// };
