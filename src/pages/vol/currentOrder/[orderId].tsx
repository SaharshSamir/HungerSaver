import { User } from "@prisma/client";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


const CurrentOrder = () => {
  const router = useRouter();

  let { orderId } = router.query;

  if (typeof orderId === "object") {
    orderId = orderId[0];
  }
  
  const {data: orderData} = trpc.order.getOrder.useQuery({orderId: orderId || ""});
  return (
    <>
      <p>Volunteer Current Order</p>
      <p>{JSON.stringify(orderId)}</p>
      <p>{JSON.stringify(orderData)}</p>
    </>
  );
};

export default CurrentOrder;
