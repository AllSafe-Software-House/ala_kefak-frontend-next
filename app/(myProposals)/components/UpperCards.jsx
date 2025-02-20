import React from "react";
import { SlOptions } from "react-icons/sl";

const UpperCards = () => {
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4">
      {CardsData.map((card, i) => (
        <div
          key={i}
          className="rounded-lg border-2 p-2 lg:p-6 flex flex-col justify-start items-start gap-6 "
        >
          <div className="w-full flex justify-between items-center  font-semibold ">
            <h2 className="text-primary text-xl ">{card.title}</h2>
            <button className="text-xl">
              <SlOptions  />
            </button>
          </div>{" "}
          <p className="text-xl">{card.count}</p>
        </div>
      ))}
    </div>
  );
};

export default UpperCards;

const CardsData = [
  {
    title: "Available proposals",
    count: "10/10",
  },
  {
    title: "Submitted proposals",
    count: "3/6",
  },
  {
    title: "Waiting proposals ",
    count: "3/6",
  },
  {
    title: "Refused",
    count: "1/6",
  },
];
