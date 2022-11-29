import { Order, OrderStatus, User } from "@prisma/client";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useRef, useState } from "react";

const CurrentOrder = () => {
  const router = useRouter();
  const [step, setStep] = useState<string | undefined>(undefined);
  const [order, setOrder] = useState<Order | undefined>(undefined);

  let { orderId } = router.query;

  if (typeof orderId === "object") {
    orderId = orderId[0];
  }

  const { data: orderData } = trpc.order.getOrder.useQuery({
    orderId: orderId || "",
  });

  const {
    data: newOrderData,
    mutate,
    isLoading: isNewOrderMutateLoading,
  } = trpc.order.updateOrderStep.useMutation();

  const submitForm = (e: FormEvent) => {
    e.preventDefault();
    console.log(step);
    const stepp: OrderStatus | undefined = Object.values(OrderStatus).filter(
      (v) => v === step
    )[0];
    console.log(stepp);
    if (orderId && typeof orderId === "string" && stepp) {
      console.log("here?");
      mutate({ orderId: orderId, step: stepp });
    }
  };

  useEffect(() => {
    if (orderData || newOrderData) setOrder(orderData);
  }, [orderData, newOrderData]);
  return (
    <>
      <form onSubmit={submitForm}>
        <select
          onChange={(e) => {
            setStep(e.target.value);
          }}
          className="select-bordered select w-full max-w-xs"
        >
          <option disabled selected>
            Which Step Have You Completed?
          </option>
          <option value={OrderStatus.OW_PICKUP}>On My Way To Pickup</option>
          <option value={OrderStatus.AT_LOCATION}>At Pickup Location</option>
          <option value={OrderStatus.OW_DROP}>On My Way To Drop</option>
          <option value={OrderStatus.DELIVERED}>Delivered</option>
        </select>
        <button type="submit" className="btn-primary btn">
          Save
        </button>
      </form>
      <p>Volunteer Current Order</p>
      <h2>current status: {JSON.stringify(order?.status)}</h2>
    </>
  );
};

export default CurrentOrder;
