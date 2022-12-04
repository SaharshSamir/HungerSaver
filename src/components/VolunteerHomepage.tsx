import type { User } from "@prisma/client";
import Navbar from "@components/layouts/navbar";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";

interface Props {
  user: User;
  isLoading: boolean;
}

const VolunteerHomepage = ({ user, isLoading }: Props) => {
  //hooks
  const { data, isLoading: isGetOrdersLoading } =
    trpc.order.getOrders.useQuery();

  //volunteer picks up an order
  const {
    mutate,
    data: newVolData,
    isLoading: isNewVolLoading,
  } = trpc.volunteer.newVolunteer.useMutation();

  const activeOrders = trpc.volunteer.activeOrders.useQuery({ volId: user.id });
  const router = useRouter();

  if (isLoading || isGetOrdersLoading || isNewVolLoading) {
    return <p>Loading...</p>;
  }

  const handleVolunteer = (orderId: string, volunteerId: string) => {
    mutate({ orderId, volunteerId });
    if (newVolData) {
      router.push("/vol/currentOrder");
    }
  };

  const handleOrderRedirect = (orderId: string) => {
    localStorage.setItem("currentOrderId", orderId);
    router.push(`/vol/currentOrder/${orderId}`);
  };
  return (
    <>
      <Navbar />
      <h1>Volunteer Homepage</h1>
      {JSON.stringify(data)}

      <div className="mt-10 flex justify-center">
        <div className="w-5/6 overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Pickup</th>
                <th>Dropoff</th>
                <th>Ordered At</th>
                <th>Food Type</th>
                <th>Pickup Contact</th>
                <th>Expiry</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data?.map((order, idx) => {
                const isActiveOrder =
                  activeOrders.data?.filter((o) => o.orderId === order.id)
                    .length || [].length > 0;
                console.log("isActive", isActiveOrder);
                return (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{order?.donation?.address}</td>
                    <td>{order.deliveryLocation}</td>
                    <td>
                      {order.placedAt.getUTCHours()}:
                      {order.placedAt.getUTCMinutes()}{" "}
                    </td>
                    <td>{order.donation.foodType}</td>
                    <td>{order.donation.contact}</td>
                    <td>{order.donation.expiry.getDate()}</td>
                    <td>
                      {isActiveOrder ? (
                        <ViewOrderButton
                          onClick={handleOrderRedirect}
                          orderId={order.id}
                        />
                      ) : (
                        <VolunteerButton
                          onClick={handleVolunteer}
                          userId={user.id}
                          orderId={order.id}
                        />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

interface VolButtonProps {
  onClick: (orderId: string, userId: string) => void;
  orderId: string;
  userId: string;
}
const VolunteerButton = (props: VolButtonProps) => {
  return (
    <button
      onClick={() => props.onClick(props.orderId, props.userId)}
      className="btn-primary btn"
    >
      Volunteer
    </button>
  );
};

interface ViewOrderProps {
  onClick: (orderId: string) => void;
  orderId: string;
}
const ViewOrderButton = (props: ViewOrderProps) => {
  console.log(props.orderId);
  return (
    <button
      onClick={() => props.onClick(props.orderId)}
      className="btn-outline btn-primary btn"
    >
      View Order
    </button>
  );
};
export default VolunteerHomepage;
