import type { Donation as DonationType } from "@prisma/client";
import { trpc } from "@utils/trpc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./elements/modal";
import Spinner from "./elements/spinner";

const Donations = () => {
  const { data, isLoading } = trpc.user.getDonations.useQuery();

  if (isLoading) {
    return <p className="text-5xl">Loading...</p>;
  }

  return (
    <div className="mt-10 flex justify-center">
      <div className="w-5/6 overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Food Type</th>
              <th>Contact</th>
              <th>Expiry</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((d, idx) => {
              return <Donation idx={idx} donation={d} key={idx}/>;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Donation = ({
  idx,
  donation,
}: {
  idx: number;
  donation: DonationType;
}) => {
  const { mutate, isLoading: isOrderLoading } =
    trpc.order.placeOrder.useMutation();
  const handleOrder = ({
    address,
    donationId,
  }: {
    address: string;
    donationId: string;
  }) => {
    mutate({ address, donationId });
  };

  return (
    <>
      <tr key={idx}>
        <th>{idx + 1}</th>
        <td>{donation.name}</td>
        <td>{donation.quantity}</td>
        <td>{donation.foodType}</td>
        <td>{donation.contact}</td>
        <td>{donation.expiry.getDate()}</td>
        <td>{donation.address}</td>
        <td>
          <OrderDetailsInputModal
            isOrderLoading={isOrderLoading}
            donation={donation}
            handleOrder={handleOrder}
          />
        </td>
      </tr>
    </>
  );
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

type FormData = {
  address: string;
};

const OrderDetailsInputModal = ({
  isOrderLoading,
  donation,
  handleOrder,
}: DonateButtonType) => {
  const { handleSubmit, register } = useForm<FormData>();

  if (isOrderLoading) {
    return <Spinner />;
  }

  const onSubmit: SubmitHandler<FormData | FieldValues> = (input) => {
    handleOrder({ address: input.address, donationId: donation.id });
  };

  return (
    <Modal buttonTitle="ORder">
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
    </Modal>
  );
};

export default Donations;

/*
      <button
        onClick={() =>
          handleOrder({ address: donation.address, donationId: donation.id })
        }
        className="btn-primary btn"
      >
        Order
      </button>
 */
