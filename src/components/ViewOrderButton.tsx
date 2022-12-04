import { OrderStatus } from "@prisma/client";
import { useRouter } from "next/router";

interface Props {
  donationId: string;
  isAuthed: string | undefined;
}

const ViewOrder = (props: Props) => {
  const router = useRouter();

  if (!props.isAuthed) return <></>;

  const handleClick = () => {
    router.push({
      pathname: "/myOrder/[donationId]",
      query: { donationId: props.donationId },
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
