"use client";

import { FiDownload } from "react-icons/fi";
import { FaMoneyBillWave } from "react-icons/fa";
import { BiSearch, BiFilter, BiSort } from "react-icons/bi";
import Link from "next/link";
import GetPaidModal from "./GetPaidModal";
import { useState } from "react";
import GenHeading from "@/app/components/generalComps/GenHeading";
import { AiOutlinePlus } from "react-icons/ai";
import { HiOutlineCurrencyDollar } from "react-icons/hi";



const transactions = Array(5).fill({
  title: "Project Title",
  transactionId: "Transaction ID",
  date: "17 April 2024",
  status: "Open",
  earnings: "$180",
  paymentMethod: "Payment Method",
});

export default function MyBalancePage() {
  const [showModal, setShowModal] = useState(false);


  return (
    <div className="min-h-screen w-full  md:w-[90%] mx-auto py-16  flex flex-col gap-6 bg-gray-100 dark:bg-transparent ">
      {/* Balance Summary */}
      <div className="w-full flex justify-between items-center  ">
        <GenHeading text={"Balance"} classNames="!p-0" />
        <button onClick={() => setShowModal(true)} className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          Get paid <AiOutlinePlus />
        </button>

      {showModal && <GetPaidModal onClose={() => setShowModal(false)} />}
    </div>


      <div className="bg-white p-6 rounded-lg flex justify-between items-center mb-6">
        <div>
          <p className="text-gray-700">Total</p>
          <p className="text-xl font-semibold">$100.00</p>
        </div>
        <div>
          <p className="text-gray-700">In review</p>
          <p className="text-xl font-semibold">$100.00</p>
        </div>
        <div>
          <p className="text-gray-700">Available</p>
          <p className="text-xl font-semibold">$100.00</p>
        </div>
        <div>
          <p className="text-gray-700">Withdrawal balance</p>
          <p className="text-xl font-semibold">$100.00</p>
        </div>

      </div>

<div className="w-full flex justify-between items-center">
        {/* Transaction History */}
        <GenHeading text={"Transaction History"} />
  
        {/* Filters */}
        <div className="flex items-center gap-4 mb-4 bg-gray-100 p-4 rounded-lg">
          <div className="flex items-center bg-white px-3 py-2 rounded-md shadow-md">
            <BiSearch className="text-gray-500 mr-2" />
            <input type="text" placeholder="Search" className="outline-none" />
          </div>
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
            <BiFilter /> Status
          </button>
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg shadow-md">
            <BiSort /> Sort
          </button>
        </div>
</div>

      {/* Transaction List */}
      <div className="space-y-4 bg-white rounded-lg shadow-md divide-y-2 ">

{transactions.map((tx, index) => (
  <Link
    key={index}
    href={`/my-balance/transaction-detailes?transactionId=${index}`}
    className=" p-4  flex justify-between items-center"
  >
    <div className="space-y-1">
      <h3 className="font-semibold text-lg">{tx.title}</h3>
      <h3 className=""><span>{tx.title}</span> <span>{`(${tx.transactionId})`}</span></h3>
      <p className="text-gray-500 text-sm">in {tx.date}</p>
      <p className="text-green-500 border-primary border-[1px] rounded-xl p-1 px-4 w-fit font-medium">{tx.status}</p>
    </div>
    <div className="flex flex-col justify-center items-center gap-2">
    <FiDownload className="text-xl text-primary cursor-pointer" />
      <p className="font-semibold text-lg">Earnings: {tx.earnings}</p>
      <p className="text-gray-500 flex items-center gap-1 bg-gray-100 p-1 rounded-lg ">
        <HiOutlineCurrencyDollar /> {tx.paymentMethod}
      </p>
    </div>
  </Link>
))}

      </div>
    </div>
  );
}
