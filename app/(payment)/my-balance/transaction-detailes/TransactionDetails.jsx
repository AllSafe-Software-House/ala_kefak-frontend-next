"use client"
import { useRouter } from "next/navigation";
import { FiArrowLeft, FiDownload } from "react-icons/fi";
import { TbArrowsExchange } from "react-icons/tb";

const TransactionDetails = () => {
  const router = useRouter()
  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-semibold text-2xl"
        onClick={()=> router.back()}
        >
          <FiArrowLeft className="text-xl " /> Transaction Details
        </button>
        <button className="bg-primary text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-600">
          Export <FiDownload />
        </button>
      </div>

      {/* Summary */}
      <div className="bg-primary/20 p-6 rounded-lg mb-6 text-center flex flex-col justify-center items-center">
      <TbArrowsExchange className="bg-primary text-white rounded-full p-1 text-5xl" />
        <h2 className="text-green-700 text-lg font-semibold my-3">Transaction Details</h2>
        <div className="w-full text-gray-700 space-y-3">
          <div className="w-full px-2 border-b  flex justify-between items-center text-lg font-medium">
            <span>Platform Fees</span>
            <span>$20</span>
          </div>
          <div className="w-full px-2 flex justify-between items-center text-lg font-medium">
            <span>Total</span>
            <span>$200</span>
          </div>
        
        </div>
      </div>

      {/* Transaction Info */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Transaction ID</span>
          <span className="font-semibold">#1223467</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Status</span>
          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded">Open</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Payment Method</span>
          <span className="bg-gray-100 px-2 py-1 rounded"> Payment Method</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Translated By</span>
          <span className="font-semibold">Client Name</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Transaction Date</span>
          <span className="font-semibold">12 Abril 2024</span>
        </div>
        <div className="flex justify-between border-b pb-2">
          <span className="text-gray-600">Project Title</span>
          <span className="font-semibold">E-Commerce Mobile App</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Transaction Type</span>
          <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded"> Transaction Type</span>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
