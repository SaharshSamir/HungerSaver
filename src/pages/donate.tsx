/* 
    When asking a user to donate food, we ask in the details of the food and add the food item
    to out list of donations (Donateion table). We also link the user to the donation they have made.
*/
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
interface FormData {
  name: string;
}
const Donate = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<FieldValues | FormData> = (something) => {
    console.log(something);
  };
  return (
    <>
      <p className="text-4xl">Donate Food</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input {...register("name")} />
      </form>
    </>
  );
};

export default Donate;
