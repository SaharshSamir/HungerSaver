import { useEffect } from "react";
import Navbar from "@components/layouts/navbar";
import Footer from "@components/layouts/Footer";
import { OrderStatus } from "@prisma/client";
import enumToArray from "@utils/enumToArray";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import Image from "next/image";

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
      <div className="h-[80vh]">
        <div className="flex flex-col items-center justify-center">
          <p className="my-8 text-4xl">Track Your Order</p>
          <ul className="steps">{renderSteps()}</ul>
        </div>
        {/*----------------------below is tanmay's code------------------*/}

        {/*--------------------------------------------------------------------------- */}
      </div>
      <Footer />
    </>
  );
};

export default MyOrder;
// {/* <section className="body-font relative text-gray-600">
//           <div className="absolute inset-0 bg-gray-300">
//             {/* <iframe width="100%" height="100%" frameborder="0" marginheight="0" marginwidth="0" title="map" scrolling="no" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.4421287948226!2d73.8660096505698!3d18.463621887380558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ea950f616219%3A0x321bdae2cea9f064!2sVishwakarma%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1670616553297!5m2!1sen!2sin" style="filter:brightness(2) contrast(1.2) opacity(0.3);"></iframe> */}
//           </div>

//           <div className="container mx-auto flex flex-wrap px-5 py-24">
//             <div className="flex w-full flex-wrap">
//               <div className="md:w-1/2 md:py-6 md:pr-10 lg:w-2/5">
//                 <div className="relative flex pb-12">
//                   <div className="absolute inset-0 flex h-full w-10 items-center justify-center">
//                     <div className="pointer-events-none h-full w-1 bg-green-200"></div>
//                   </div>

//                   <div className="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
//                     <Image
//                       src="/user.png"
//                       width="25"
//                       height="30"
//                       alt={"user"}
//                     />
//                     <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
//                     <circle cx="12" cy="7" r="4"></circle>
//                   </div>
//                   <div className="flex-grow pl-4">
//                     <h2 className="title-font mb-1 text-sm font-medium tracking-wider text-green-900">
//                       Volunteer found
//                     </h2>
//                   </div>
//                 </div>

//                 <div className="relative flex pb-12">
//                   <div className="absolute inset-0 flex h-full w-10 items-center justify-center">
//                     <div className="pointer-events-none h-full w-1 bg-green-200"></div>
//                   </div>
//                   <div className="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
//                     <Image
//                       src="/scooter.png"
//                       width="30"
//                       height="40"
//                       alt={"scooter"}
//                     />
//                     <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
//                   </div>
//                   <div className="flex-grow pl-4">
//                     <h2 className="title-font mb-1 text-sm font-medium tracking-wider text-green-900">
//                       On my way to pickup
//                     </h2>
//                   </div>
//                 </div>

//                 <div className="relative flex pb-12">
//                   <div className="absolute inset-0 flex h-full w-10 items-center justify-center">
//                     <div className="pointer-events-none h-full w-1 bg-green-200"></div>
//                   </div>
//                   <div className="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
//                     <Image
//                       src="/placeholder.png"
//                       width="25"
//                       height="30"
//                       alt={"placeholder"}
//                     />
//                     <circle cx="12" cy="5" r="3"></circle>
//                     <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
//                   </div>
//                   <div className="flex-grow pl-4">
//                     <h2 className="title-font mb-1 text-sm font-medium tracking-wider text-green-900">
//                       At pickup location
//                     </h2>
//                   </div>
//                 </div>

//                 <div className="relative flex pb-12">
//                   <div className="absolute inset-0 flex h-full w-10 items-center justify-center">
//                     <div className="pointer-events-none h-full w-1 bg-green-200"></div>
//                   </div>
//                   <div className="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
//                     <Image
//                       src="/delivery-time.png"
//                       width="25"
//                       height="30"
//                       alt={"delivery-time"}
//                     />
//                     <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
//                   </div>
//                   <div className="flex-grow pl-4">
//                     <h2 className="title-font mb-1 text-sm font-medium tracking-wider text-green-900">
//                       On my way to drop
//                     </h2>
//                   </div>
//                 </div>

//                 <div className="relative flex">
//                   <div className="relative z-10 inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
//                     <Image
//                       src="/check-mark.png"
//                       width="25"
//                       height="30"
//                       alt={"check-mark"}
//                     />
//                     <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
//                     <path d="M22 4L12 14.01l-3-3"></path>
//                   </div>
//                   <div className="flex-grow pl-4">
//                     <h2 className="title-font mb-1 text-sm font-medium tracking-wider text-green-900">
//                       Delivered
//                     </h2>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section> */}
