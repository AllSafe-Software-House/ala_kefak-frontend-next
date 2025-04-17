// 'use client';

// import { useState } from 'react';
// import {  FaPaypal } from 'react-icons/fa';
// import { BsBank } from "react-icons/bs";

// import { IoClose } from 'react-icons/io5';
// import GenHeading from '@/app/components/generalComps/GenHeading';

// export default function GetPaidModal({ onClose }) {
//   const [activeTab, setActiveTab] = useState('bank');
  
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-10">
//       <div className="bg-white rounded-lg min-w-[340px] w-[90%] max-w-md p-6 relative">
//         <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
//           <IoClose size={24} />
//         </button>
//         <GenHeading text={"Subscribe now"} classNames='w-full text-center my-6 mb-6 !font-bold' />
        
//         {/* Tabs */}
//         <div className="flex justify-center gap-8 border-b pb-2">
//           <button
//             className={`text-lg font-medium pb-2 ${activeTab === 'bank' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
//             onClick={() => setActiveTab('bank')}
//           >
//             Bank Account
//           </button>
//           <button
//             className={`text-lg font-medium pb-2 ${activeTab === 'paypal' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
//             onClick={() => setActiveTab('paypal')}
//           >
//             Pay Pal
//           </button>
//         </div>
        
//         {/* Content */}
//         <div className="mt-4">
//           {activeTab === 'bank' ? (
//             <BankAccountForm />
//           ) : (
//             <PayPalForm />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// function BankAccountForm() {
//   return (
//     <div>
//       <div className="border p-4 rounded-lg flex gap-3 items-center">

//         <BsBank className="text-gray-700 text-2xl" />
//         <div>
//           <p className="font-semibold">Bank Name</p>
//           <p className="text-gray-500 text-sm">Commercial bank of bank is $12</p>
//         </div>
//       </div>
//       <InputField label="Bid Amount" placeholder="Enter amount" />
//       <p className="text-gray-500">Commercial bank of bank is $12</p>
//       <TotalAmount total={100} fees={12} />
//     </div>
//   );
// }

// function PayPalForm() {
//   return (
//     <div>
//       <div className="border p-4 rounded-lg flex gap-3 items-center">
//         <FaPaypal className="text-blue-500 text-2xl" />
//         <div>
//           <p className="font-semibold">Bank Name</p>
//           <p className="text-gray-500 text-sm">Commercial bank of bank is $12</p>
//         </div>
//       </div>
//       <InputField label="PayPal Account" placeholder="Enter PayPal email" />
//       <InputField label="Bid Amount" placeholder="Enter amount" />
//       <p className="text-gray-500">Fees is 10%</p>
//       <TotalAmount total={100} fees={12} />
//     </div>
//   );
// }

// function InputField({ label, placeholder }) {
//   return (
//     <div className="mt-4">
//       <label className="block text-gray-700 font-medium mb-1">{label}</label>
//       <input type="text" placeholder={placeholder} className="w-full border rounded-lg p-2" />
//     </div>
//   );
// }

// function TotalAmount({ total, fees }) {
//   return (
//     <div className="mt-4">
//       <p className="text-lg font-semibold flex justify-between">
//         <span>Total</span> <span>${total - fees}</span>
//       </p>
//       <button className="mt-4 w-full bg-primary text-white py-2 rounded-lg font-medium">Pay</button>
//     </div>
//   );
// }



'use client';

import { useState } from 'react';
import { FaPaypal } from 'react-icons/fa';
import { BsBank } from "react-icons/bs";
import { IoClose } from 'react-icons/io5';
import GenHeading from '@/app/components/generalComps/GenHeading';

export default function GetPaidModal({ onClose ,headText="Subscribe now"}) {
  const [activeTab, setActiveTab] = useState('bank');
  const [paymentStatus, setPaymentStatus] = useState(null); 

  const handlePayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5;
      if (isSuccess) {
        setPaymentStatus('success');
      } else {
        setPaymentStatus('error');
      }
    }, 2000);
  };

  const resetPaymentStatus = () => {
    setPaymentStatus(null);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 pt-10">
      <div className="bg-white rounded-lg min-w-[340px] w-[90%] max-w-md p-6 relative">
        <button className="absolute top-4 right-4 text-gray-500" onClick={onClose}>
          <IoClose size={24} />
        </button>
        <GenHeading text={headText} classNames='w-full text-center my-6 mb-6 !font-bold' />
        
        {/* Tabs */}
        {!paymentStatus &&<div className="flex justify-center gap-8 border-b pb-2">
          <button
            className={`text-lg font-medium pb-2 ${activeTab === 'bank' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
            onClick={() => { setActiveTab('bank'); resetPaymentStatus(); }}
          >
            Bank Account
          </button>
          <button
            className={`text-lg font-medium pb-2 ${activeTab === 'paypal' ? 'border-b-2 border-primary text-primary' : 'text-gray-500'}`}
            onClick={() => { setActiveTab('paypal'); resetPaymentStatus(); }}
          >
            Pay Pal
          </button>
        </div>}
        
        {/* Content */}
        <div className="mt-4">
          {paymentStatus === 'processing' ? (
            <div className="text-center py-4">
              <p className="text-gray-700 font-medium">Processing payment...</p>
            </div>
          ) : paymentStatus === 'success' ? (
            <div className="text-center py-4">
              <div className='w-full flex flex-col justify-center items-center gap-4'>
                <img src="/images/successpay.png" className='size-[250px] object-cover' alt="" />
                <p className="text-primary text-xl font-medium">Payment Successful! Thank you for your purchase.</p>
              </div>
              <button
                className="mt-4 w-full bg-primary text-white py-2 rounded-lg font-medium"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          ) : paymentStatus === 'error' ? (
            <div className="text-center py-4">
              <div className='w-full flex flex-col justify-center items-center gap-4'>
              <img src="/images/errpay.png" className='size-[250px] object-cover' alt="" />

                <p className="text-redwarn text-xl font-medium">Payment Failed! Please check your details and try again.</p>
              </div>
              <button
                className="mt-4 w-full bg-redwarn text-white py-2 rounded-lg font-medium"
                onClick={resetPaymentStatus}
              >
                Retry
              </button>
            </div>
          ) : (
            activeTab === 'bank' ? (
              <BankAccountForm onPay={handlePayment} />
            ) : (
              <PayPalForm onPay={handlePayment} />
            )
          )}
        </div>
      </div>
    </div>
  );
}

function BankAccountForm({ onPay }) {
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
      <TotalAmount total={100} fees={12} onPay={onPay} />
    </div>
  );
}

function PayPalForm({ onPay }) {
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
      <TotalAmount total={100} fees={12} onPay={onPay} />
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

function TotalAmount({ total, fees, onPay }) {
  return (
    <div className="mt-4">
      <p className="text-lg font-semibold flex justify-between">
        <span>Total</span> <span>${total - fees}</span>
      </p>
      <button
        className="mt-4 w-full bg-primary text-white py-2 rounded-lg font-medium"
        onClick={onPay}
      >
        Pay
      </button>
    </div>
  );
}