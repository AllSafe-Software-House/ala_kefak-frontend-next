"use client";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaLightbulb, FaXbox } from "react-icons/fa";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { IoDiamond } from "react-icons/io5";
import GetPaidModal from "./GetPaidModal";
import { useState } from "react";

const plans = [
  {
    name: "Basic Plan",
    description: "Ideal for small projects or startups.",
    price: "$500",
    oldPrice: "$900",
    features: [
      "Basic design and functionality",
      "Limited customization options",
      "Delivery within 2-4 weeks",
      "Post-delivery support for 1 month",
    ],

    icon: <FaXbox />,
    bg: "bg-white",
    text: "text-black",
  },
  {
    name: "Professional Plan",
    description: "Perfect for medium-sized projects or growing businesses.",
    price: "$700",
    oldPrice: "$900",
    features: [
      "Advanced design and functionality",
      "Moderate customization options",
      "Delivery within 4-8 weeks",
      "Post-delivery support for 3 months",
      "Integration with third-party tools",
    ],
    icon: <FaLightbulb />,

    bg: "bg-black text-white",
    text: "text-white",
  },
  {
    name: "Premium Plan",
    description: "Built for large-scale projects or enterprises.",
    price: "$900",
    oldPrice: "$1200",
    features: [
      "Delivery within 8-16 weeks",
      "Fully customized design and functionality",
      "Scalable architecture for growth",
      "Post-delivery support for 6+ months",
      "Dedicated project manager",
      "Advanced integrations and performance optimization",
    ],
    icon: <IoDiamond />,
    bg: "bg-white",
    text: "text-black",
  },
];
const ChoosePlan = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="min-h-screen w-[95%] lg:w-[90%] mx-auto p-6 pt-10 px-3 md:px-8 lg:px-8 flex flex-col gap-16 bg-gray-100 dark:bg-transparent ">
      <div className="w-full text-xl lg:text-3xl flex justify-between items-center">
        <p className=" flex justify-start items-center gap-4 font-medium">
          <FaArrowLeft
            className="cursor-pointer"
            onClick={() => router.back()}
          />
          <span className="whitespace-pre-wrap lg:whitespace-nowrap ">
            Choose the Perfect Plan for Your Software Project
          </span>
        </p>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-10">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`p-4 rounded-2xl shadow-lg w-full lg:w-[80%] min-w-[320px] min-h-[70vh]  ${plan.bg}`}
          >
            <div className="text-2xl text-primary bg-primary/20 p-2 w-fit rounded-lg ">
              {plan.icon}
            </div>

            <div className="space-y-1 my-10">
              <h2 className={`text-xl lg:text-2xl font-semibold ${plan.text}`}>
                {plan.name}
              </h2>
              <p className={` ${plan.text}`}>{plan.description}</p>
            </div>

            <div className="flex items-center gap-2 my-8 text-3xl ps-6 ">
              <span className=" font-bold">{plan.price}</span>
              <span className="line-through text-gray-400">
                {plan.oldPrice}
              </span>
            </div>

            <button
            onClick={() => setShowModal(true)}
            className="bg-primary text-white py-2 px-4 rounded-lg w-full hover:bg-primaryhover animation mb-8  ">
              Choose Plan
            </button>
            <hr />
            <ul className="mt-8 space-y-4">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-600 ">
                  <IoMdCheckmarkCircle className="text-primary !text-xl " />
                  <span
                    className={`${plan.text} text-sm whitespace-pre-wrap w-full `}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      {showModal && <GetPaidModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ChoosePlan;
