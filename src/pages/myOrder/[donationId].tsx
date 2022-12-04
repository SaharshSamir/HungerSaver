import { useEffect } from "react";
import Navbar from "@components/layouts/navbar";
import { OrderStatus } from "@prisma/client";
import enumToArray from "@utils/enumToArray";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";

interface OrderStatusUIArr {
  value: OrderStatus | undefined;
  display?: string;
}

const orderStatusArr: OrderStatusUIArr[] = [
  {
    value: "FOUND",
    display: "Volunteer Found",
  },
  {
    value: "OW_PICKUP",
    display: "On My Way To Pickup",
  },
  {
    value: "AT_LOCATION",
    display: "At Pickup Location",
  },
  {
    value: "OW_DROP",
    display: "On My Way To Drop",
  },
  {
    value: "DELIVERED",
    display: "Delivered",
  },
];

const MyOrder = () => {
  const router = useRouter();
  let { donationId } = router.query;
  if (typeof donationId === "object") {
    donationId = donationId[0];
  }
  const statusArr = enumToArray(OrderStatus);
  // console.log(orderStatusArr);
  const { data: orderData, error: orderError } =
    trpc.order.getOrderFromDonation.useQuery({
      donationId: donationId || "",
    });
  const stepIncomplete = "step";
  const stepCompleted = "step step-primary";
  useEffect(() => {
    if (orderError && orderError.message === "UNAUTHORIZED") {
      router.push("/");
    }
  }, [orderError, router]);
  const renderSteps = () => {
    return (
      <>
        {orderStatusArr.map((o, idx) => {
          // let isDone = false;
          // if()
          console.log(orderData && idx < statusArr.indexOf(orderData?.status));
          console.log(
            idx,
            orderStatusArr.indexOf({ value: orderData?.status })
          );
          console.log(orderData?.status);
          return (
            <>
              <li
                className={
                  orderData && idx < statusArr.indexOf(orderData?.status)
                    ? stepCompleted
                    : stepIncomplete
                }
              >
                {o.display}
              </li>
            </>
          );
        })}
      </>
    );
  };
  return (
    <>
      <Navbar />
      <p>donationId: {donationId}</p>
      <p>orderId: {orderData?.id}</p>
      <p>{JSON.stringify(orderData)}</p>

      <ul className="steps">
        {renderSteps()}
        {/* <li className="step-primary step">Searching For a Volunteer</li>
        <li className="step-primary step">Found a Volunteer</li>
        <li className="step">On The Way To Pickup Location</li>
        <li className="step">At Pickup Location</li>
        <li className="step">On The Way To Drop Location</li>
        <li className="step">Delivered</li> */}
      </ul>
    </>
  );
};

export default MyOrder;
