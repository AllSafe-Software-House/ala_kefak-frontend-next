'use client';

import { useState } from 'react';
import {  FaPaypal } from 'react-icons/fa';
import { BsBank } from "react-icons/bs";

import { IoClose } from 'react-icons/io5';
import GenHeading from '@/app/components/generalComps/GenHeading';

export default function GetPaidModal({ onClose,headText= "Get Paid"}) {
  const [activeTab, setActiveTab] = useState('bank');
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative">
        <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
          <IoClose size={24} />
        </button>
        <GenHeading text={headText} classNames='w-full text-center my-6 mb-6 !font-bold' />
        
        {/* Tabs */}
        <div className="flex justify-center gap-8 border-b pb-2">
          <button
            className={`text-lg font-medium pb-2 ${activeTab === 'bank' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('bank')}
          >
            Bank Account
          </button>
          <button
            className={`text-lg font-medium pb-2 ${activeTab === 'paypal' ? 'border-b-2 border-green-500 text-green-500' : 'text-gray-500'}`}
            onClick={() => setActiveTab('paypal')}
          >
            Pay Pal
          </button>
        </div>
        
        {/* Content */}
        <div className="mt-4">
          {activeTab === 'bank' ? (
            <BankAccountForm />
          ) : (
            <PayPalForm />
          )}
        </div>
      </div>
    </div>
  );
}

function BankAccountForm() {
  return (
    <div>
      <div className="border p-4 rounded-lg flex gap-3 items-center">

        <BsBank className="text-gray-700 text-2xl" />
        <div>
          <p className="font-semibold">Bank Name</p>
          <p className="text-gray-500 text-sm">Commercial bank of bank is $12</p>
        </div>
      </div>
      <InputField label="Bid Amount" placeholder="Enter amount" />
      <p className="text-gray-500">Commercial bank of bank is $12</p>
      <TotalAmount total={100} fees={12} />
    </div>
  );
}

function PayPalForm() {
  return (
    <div>
      <div className="border p-4 rounded-lg flex gap-3 items-center">
        <FaPaypal className="text-blue-500 text-2xl" />
        <div>
          <p className="font-semibold">Bank Name</p>
          <p className="text-gray-500 text-sm">Commercial bank of bank is $12</p>
        </div>
      </div>
      <InputField label="PayPal Account" placeholder="Enter PayPal email" />
      <InputField label="Bid Amount" placeholder="Enter amount" />
      <p className="text-gray-500">Fees is 10%</p>
      <TotalAmount total={100} fees={12} />
    </div>
  );
}

function InputField({ label, placeholder }) {
  return (
    <div className="mt-4">
      <label className="block text-gray-700 font-medium mb-1">{label}</label>
      <input type="text" placeholder={placeholder} className="w-full border rounded-lg p-2" />
    </div>
  );
}

function TotalAmount({ total, fees }) {
  return (
    <div className="mt-4">
      <p className="text-lg font-semibold flex justify-between">
        <span>Total</span> <span>${total - fees}</span>
      </p>
      <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-lg font-medium">Get paid</button>
    </div>
  );
}
