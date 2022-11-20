import { OrderStatus } from "@prisma/client";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";

const MyOrder = () => {
  const router = useRouter();
  let { orderId } = router.query;
  if (typeof orderId === "object") {
    orderId = orderId[0];
  }
  const orderStatusArr = Object.keys(OrderStatus).filter((v) =>
    isNaN(Number(v))
  );
  console.log(orderStatusArr);
  const { data } = trpc.order.getOrder.useQuery({ orderId: orderId || "" });
  console.log(data);
  const OrderSteps = Object.keys(OrderStatus);
  const stepIncomplete = "step";
  const stepCompleted = "step step-primary";
  return (
    <>
      <p>{orderId}</p>
      <p>{JSON.stringify(data)}</p>

      <ul className="steps">
        <li className="step-primary step">Searching For a Volunteer</li>
        <li className="step-primary step">Found a Volunteer</li>
        <li className="step">On The Way To Pickup Location</li>
        <li className="step">At Pickup Location</li>
        <li className="step">On The Way To Drop Location</li>
        <li className="step">Delivered</li>
      </ul>
    </>
  );
};

export default MyOrder;
//OW_PICKUP
//AT_LOCATION
//OW_DROP
//DELIVERED
//CANCELED
