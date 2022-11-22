import type { Donation as DonationType } from "@prisma/client";
import Modal from "@components/elements/modal";
import Spinner from "@components/elements/spinner";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

type FormData = {
  address: string;
};

interface DonateButtonType {
  isOrderLoading: boolean;
  donation: DonationType;
  handleOrder: ({
    address,
    donationId,
  }: {
    address: string;
    donationId: string;
  }) => void;
}

const OrderDetailsInputModal = ({
  isOrderLoading,
  donation,
  handleOrder,
}: DonateButtonType) => {
  const { handleSubmit, register } = useForm<FormData>();

  console.log("from order button", donation);
  if (isOrderLoading) {
    return <Spinner />;
  }

  const onSubmit: SubmitHandler<FormData | FieldValues> = (input) => {
    console.log("on submit", donation);
    handleOrder({ address: input.address, donationId: donation.name });
  };

  // return (
  //   <Modal buttonTitle="ORder">
  //     <form onSubmit={handleSubmit(onSubmit)}>
  //       <div className="form-control mr-0 w-full">
  //         <label className="label">
  //           <span className="label-text">Your Address</span>
  //         </label>
  //         <input
  //           type="text"
  //           placeholder=""
  //           className=" input-bordered input w-full "
  //           {...register("address")}
  //         />
  //       </div>
  //       <div className="mt-4 flex w-full justify-center">
  //         <button type="submit" className="btn">
  //           Place Order
  //         </button>
  //       </div>
  //     </form>
  //   </Modal>
  // );
  return (
    <>
      <label htmlFor="my-modal-4" className="btn-primary btn">
        order
      </label>

      <input type="checkbox" id="my-modal-4" className="modal-toggle" />
      <label htmlFor="my-modal-4" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control mr-0 w-full">
              <label className="label">
                <span className="label-text">Your Address</span>
              </label>
              <input
                type="text"
                placeholder=""
                className=" input-bordered input w-full "
                {...register("address")}
              />
            </div>
            <div className="mt-4 flex w-full justify-center">
              <button type="submit" className="btn">
                Place Order
              </button>
            </div>
          </form>
        </label>
      </label>
    </>
  );
};

export default OrderDetailsInputModal;
