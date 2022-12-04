import type { Donation as DonationType } from "@prisma/client";
import { trpc } from "@utils/trpc";
import OrderDetailsInputModal from "@components/OrderDetailsInputModal";
import ViewOrderButton from "./ViewOrderButton";
import { useRouter } from "next/router";

const Donations = () => {
  const { data, isLoading } = trpc.user.getDonations.useQuery();
  const { data: userData, isLoading: userIsLoading } =
    trpc.auth.getUserWithOrders.useQuery();

  console.log(userData);
  if (isLoading || userIsLoading) {
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
              {userData ? <th></th> : null}
            </tr>
          </thead>
          <tbody>
            {data?.map((d, idx) => {
              const isOrdered =
                (userData?.placedOrders.filter((o) => o.donationId === d.id)
                  .length || [].length) > 0;
              return (
                <Donation
                  idx={idx}
                  donation={d}
                  key={idx}
                  userId={userData?.id}
                  isOrdered={isOrdered}
                />
              );
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
  userId,
  isOrdered,
}: {
  idx: number;
  donation: DonationType;
  userId?: string;
  isOrdered: boolean;
}) => {
  const router = useRouter();
  const {
    mutate,
    isLoading: isOrderLoading,
    data,
  } = trpc.order.placeOrder.useMutation();
  const handleOrder = ({
    address,
    donationId,
  }: {
    address: string;
    donationId: string;
  }) => {
    // console.log(donationId);
    console.log(address, donationId);
    mutate({ address, donationId });
  };

  if (data) {
    router.reload();
  }
  console.log("donation: ", donation, userId);
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
        {userId ? (
          <td>
            {isOrdered ? (
              <ViewOrderButton isAuthed={userId} donationId={donation.id} />
            ) : (
              <OrderDetailsInputModal
                isOrderLoading={isOrderLoading}
                donation={donation}
                handleOrder={handleOrder}
                userId={userId}
              />
            )}
          </td>
        ) : null}
      </tr>
    </>
  );
};

export default Donations;
