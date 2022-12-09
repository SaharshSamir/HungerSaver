import { useEffect } from "react";
import Navbar from "@components/layouts/navbar";
import Footer from "@components/layouts/Footer";
import { useRouter } from "next/router";
import { trpc } from "@utils/trpc";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

const Landing = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (sessionData) {
      router.push("/");
      //return (<Landing />)
    }
  }, [sessionData, router]);
  return (
    <>
      <div
        style={{
          backgroundImage: `url(/istockphoto-524903696-612x612.jpg)`,
          backgroundSize: "contain",
          fontFamily: "sans-serif",
        }}
      >
        <Navbar />
        <section className="body-font text-gray-600">
          <div className="container mx-auto flex flex-col items-center justify-center px-5 py-24">
            <Image
              className="mb-10 w-5/6 rounded object-cover object-center md:w-3/6 lg:w-2/6"
              alt="hero"
              width="1000"
              height="1000"
              src="/tfh-removebg-preview.png"
            />
            <div className="w-full text-center lg:w-2/3">
              <h1 className="title-font mb-4 text-3xl font-medium text-green-900" />
              <section id="buttons">
                <a
                  className="green-glassmorphism cursor-pointer"
                  onClick={() => signIn()}
                >
                  Get started
                </a>
                <a className="green-glassmorphism" href="/locations" onClick={() => router.push("/locations")}>
                  Our Locations
                </a>
              </section>
            </div>
          </div>
        </section>

        <section id="section1" className="body-font text-gray-600">
          <div className="container mx-auto px-5 py-24">
            <div className="mb-20 flex w-full flex-col text-center">
              <h1>Say No To Food Wastage</h1>
              <p className="mx-auto text-base leading-relaxed lg:w-2/3">
                Food wastage has always been a issue which is constantly rising.
                We aim to solve this by taking a small step. This website
                pleadges to solve hunger problem by deilvering excess food to
                the needy and we need your help as well. Become a volunteer and
                you are set to make a difference.
              </p>
              <p className="mx-auto text-base leading-relaxed lg:w-2/3">
                These following statistics show why hunger and food wastage is a
                serious problem.
              </p>
            </div>

            <div className="-m-4 flex flex-wrap text-center">
              <div className="w-full p-4 sm:w-1/2 md:w-1/4">
                <div className="rounded-lg border-2 border-gray-200 px-4 py-6">
                  <Image
                    src={"/rice-bowl.png"}
                    width="250"
                    height="250"
                    alt={"rice-bowl"}
                  />
                  <h2 className="title-font text-3xl font-medium text-gray-900">
                    1.3 Billion Tonnes
                  </h2>
                  <p className="leading-relaxed">
                    Food wasted across the globe
                  </p>
                </div>
              </div>

              <div className="w-full p-4 sm:w-1/2 md:w-1/4">
                <div className="rounded-lg border-2 border-gray-200 px-4 py-6">
                  <Image
                    src="/money.png"
                    width="250"
                    height="250"
                    alt={"money"}
                  />
                  <h2 className="title-font text-3xl font-medium text-gray-900">
                    $1 trillion
                  </h2>
                  <p className="leading-relaxed">Amount value of food wasted</p>
                </div>
              </div>

              <div className="w-full p-4 sm:w-1/2 md:w-1/4">
                <div className="rounded-lg border-2 border-gray-200 px-4 py-6">
                  <Image
                    className="Images"
                    src="/social-group.png"
                    width="250"
                    height="250"
                    alt={"social-group"}
                  />
                  <h2 className="title-font text-3xl font-medium text-gray-900">
                    800 million
                  </h2>
                  <p className="leading-relaxed">
                    People sleep hungry every night
                  </p>
                </div>
              </div>

              <div className="w-full p-4 sm:w-1/2 md:w-1/4">
                <div className="rounded-lg border-2 border-gray-200 px-4 py-6">
                  <Image
                    src="/trolley.png"
                    width="250"
                    height="250"
                    alt={"trolley"}
                  />
                  <h2 className="title-font text-3xl font-medium text-gray-900">
                    40% Farm Waste
                  </h2>
                  <p className="leading-relaxed">
                    Wastage due to inefficient supply
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="section2" className="body-font text-gray-600">
          <div className="container mx-auto px-5 py-24">
            <h1>How We Operate</h1>
            <div className="container mx-auto flex flex-wrap px-5 py-24">
              <div className="relative mx-auto flex pt-10 pb-20 sm:items-center md:w-2/3">
                <div className="absolute inset-0 flex h-full w-6 items-center justify-center">
                  <div className="pointer-events-none h-full w-1 bg-green-200"></div>
                </div>
                <div className="title-font relative z-10 mt-10 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-medium text-white sm:mt-0">
                  1
                </div>
                <div className="flex flex-grow flex-col items-start pl-6 sm:flex-row sm:items-center md:pl-8">
                  <div className="bg--100 text--500 inline-flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full">
                    <Image src="/in.png" width="55" height="40" alt={"in"} />
                  </div>
                  <div className="mt-6 flex-grow sm:mt-0 sm:pl-6">
                    <h2 className="title-font mb-1 text-xl font-medium text-gray-900">
                      Register
                    </h2>
                    <p className="leading-relaxed">
                      Any user who wants to visit the website will first have to
                      sign up, in order to know the users purpose and
                      credentials.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto flex pb-20 sm:items-center md:w-2/3">
                <div className="absolute inset-0 flex h-full w-6 items-center justify-center">
                  <div className="pointer-events-none h-full w-1 bg-green-200"></div>
                </div>
                <div className="title-font relative z-10 mt-10 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-medium text-white sm:mt-0">
                  2
                </div>
                <div className="flex flex-grow flex-col items-start pl-6 sm:flex-row sm:items-center md:pl-8">
                  <div className="bg--100 text--500 inline-flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full">
                    <Image
                      src="/porridge-pongal.png"
                      width="55"
                      height="40"
                      alt={"porridge-pongal"}
                    />
                  </div>
                  <div className="mt-6 flex-grow sm:mt-0 sm:pl-6">
                    <h2 className="title-font mb-1 text-xl font-medium text-gray-900">
                      Donate/Order
                    </h2>
                    <p className="leading-relaxed">
                      After the user has signed up, they can donate the food or
                      order it. Certain SOPSs would be mentioned to them in both
                      the cases.{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto flex pb-20 sm:items-center md:w-2/3">
                <div className="absolute inset-0 flex h-full w-6 items-center justify-center">
                  <div className="pointer-events-none h-full w-1 bg-green-200"></div>
                </div>
                <div className="title-font relative z-10 mt-10 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-medium text-white sm:mt-0">
                  3
                </div>
                <div className="flex flex-grow flex-col items-start pl-6 sm:flex-row sm:items-center md:pl-8">
                  <div className="bg--100 text--500 inline-flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full">
                    <Image
                      src="/verified.png"
                      width="55"
                      height="40"
                      alt={"verified"}
                    />
                  </div>
                  <div className="mt-6 flex-grow sm:mt-0 sm:pl-6">
                    <h2 className="title-font mb-1 text-xl font-medium text-gray-900">
                      Check Authenticity
                    </h2>
                    <p className="leading-relaxed">
                      Once the order has been placed or donated by a user, the
                      admin can check the credentials to verify the availability
                      of food and for authentic delivery as well.
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative mx-auto flex pb-10 sm:items-center md:w-2/3">
                <div className="absolute inset-0 flex h-full w-6 items-center justify-center">
                  <div className="pointer-events-none h-full w-1 bg-green-200"></div>
                </div>
                <div className="title-font relative z-10 mt-10 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-sm font-medium text-white sm:mt-0">
                  4
                </div>
                <div className="flex flex-grow flex-col items-start pl-6 sm:flex-row sm:items-center md:pl-8">
                  <div className="bg--100 text--500 inline-flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full">
                    <Image
                      src="/scooter.png"
                      width="55"
                      height="40"
                      alt={"scooter"}
                    />
                  </div>
                  <div className="mt-6 flex-grow sm:mt-0 sm:pl-6">
                    <h2 className="title-font mb-1 text-xl font-medium text-gray-900">
                      Deliver
                    </h2>
                    <p className="leading-relaxed">
                      Any volunteer in the certain area will be appointed to
                      deliver the food with certain procedure to follow. All
                      updates of the delivery will be visible to the user at
                      real time. In case of any mishap, it will be notified to
                      the user.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Landing;
