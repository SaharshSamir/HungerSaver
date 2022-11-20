import { OrderStatus } from "@prisma/client";
import { useRouter } from "next/router";

interface Props {
  orderId: string;
}

const ViewOrder = (props: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: "/myOrder/[orderId]",
      query: { orderId: props.orderId },
    });
  };
  return (
    <>
      <button onClick={handleClick} className="btn-outline btn-primary btn">
        View Order
      </button>
    </>
  );
};

export default ViewOrder;
