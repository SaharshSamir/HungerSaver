import { useEffect } from "react";
import Navbar from "@components/layouts/navbar";
import Footer from "@components/layouts/Footer";
import { useRouter } from "next/router";
import { trpc } from "@utils/trpc";
import { useSession } from "next-auth/react";
import Images from '../../assets/images/rice-bowl.png';

const Landing = () => {
  const { data: sessionData } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (sessionData) {
      router.push("/");
      //return (<Landing />)
    }
  }, [sessionData])
  return (
    <>
      <body>
        <Navbar/>
        <section className="text-gray-600 body-font">
          <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
            <img className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded" alt="hero" src="tfh-removebg-preview.png" />
            <div className="text-center lg:w-2/3 w-full">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-green-900" />
              <section id="buttons" />
              <a href="#section1">Get started</a>
              <a href="#section2">Know More</a>
            </div>
          </div>
        </section>

        <section id="section1" className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h1>Say No To Food Wastage</h1>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Food wastage has always been a issue which is constantly rising. We aim to solve this by taking a small step. This website pleadges to solve hunger problem by deilvering excess food to the needy and we need your help as well. Become a volunteer and you are set to make a difference.</p>
              <p className="lg:w-2/3 mx-auto leading-relaxed text-base">These following statistics show why hunger and food wastage is a serious problem.</p>
              </div>
            
            <div className="flex flex-wrap -m-4 text-center">
              <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                  <img className="Images" src={Images} width="250" height="250" alt={"rice-bowl"} />
                  <h2 className="title-font font-medium text-3xl text-gray-900">1.3 Billion Tonnes</h2>
                  <p className="leading-relaxed">Food wasted across the globe</p>
                </div>
              </div>

              <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                  <img src="money.png" width="250" height="250" />
                  <h2 className="title-font font-medium text-3xl text-gray-900">$1 trillion</h2>
                  <p className="leading-relaxed">Amount value of food wasted</p>
                </div>
              </div>

              <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                  <img className="Images" src={require("../../assets/images/social-group.png")} width="250" height="250" alt={"social-group"}/>
                  <h2 className="title-font font-medium text-3xl text-gray-900">800 million</h2>
                  <p className="leading-relaxed">People sleep hungry every night</p>
                </div>
              </div>

              <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div className="border-2 border-gray-200 px-4 py-6 rounded-lg">
                  <image imageRendering={"trolley.png"} width="250" height="250" />
                  <h2 className="title-font font-medium text-3xl text-gray-900">40% Farm Waste</h2>
                  <p className="leading-relaxed">Wastage due to inefficient supply</p>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section id="section2" className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1>How We Operate</h1>
          <div className="container px-5 py-24 mx-auto flex flex-wrap">
            <div className="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-green-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-green-500 text-white relative z-10 title-font font-medium text-sm">1</div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 bg--100 text--500 rounded-full inline-flex items-center justify-center">
                  <img src="in.png" width="55" height="40" />
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Register</h2>
                  <p className="leading-relaxed">Any user who wants to visit the website will first have to sign up, in order to know the users purpose and credentials.</p>
                </div>
              </div>
            </div>
            <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-green-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-green-500 text-white relative z-10 title-font font-medium text-sm">2</div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 bg--100 text--500 rounded-full inline-flex items-center justify-center">
                  <img src="porridge-pongal.png" width="55" height="40" />
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Donate/Order</h2>
                  <p className="leading-relaxed">After the user has signed up, they can donate the food or order it. Certain SOPSs would be mentioned to them in both the cases. </p>
                </div>
              </div>
            </div>
            <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-green-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-green-500 text-white relative z-10 title-font font-medium text-sm">3</div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 bg--100 text--500 rounded-full inline-flex items-center justify-center">
                  <img src="verified.png" width="55" height="40" />
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Check Authenticity</h2>
                  <p className="leading-relaxed">Once the order has been placed or donated by a user, the admin can check the credentials to verify the availability of food and for authentic delivery as well.</p>
                </div>
              </div>
            </div>
            <div className="flex relative pb-10 sm:items-center md:w-2/3 mx-auto">
              <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
                <div className="h-full w-1 bg-green-200 pointer-events-none"></div>
              </div>
              <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-green-500 text-white relative z-10 title-font font-medium text-sm">4</div>
              <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
                <div className="flex-shrink-0 w-24 h-24 bg--100 text--500 rounded-full inline-flex items-center justify-center">
                  <img src="scooter.png" width="55" height="40" />
                </div>
                <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
                  <h2 className="font-medium title-font text-gray-900 mb-1 text-xl">Deliver</h2>
                  <p className="leading-relaxed">Any volunteer in the certain area will be appointed to deliver the food with certain procedure to follow. All updates of the delivery will be visible to the user at real time. In case of any mishap, it will be notified to the user. </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </body>
    <Footer/>
    </>
  );
}

export default Landing;
