// import GenHeading from "@/app/components/generalComps/GenHeading";

// const supportItems = [
//   {
//     img: "/images/ourblog.png",
//     title: "Learn From Our Blog",
//     desc: "Discover tips, insights, and updates in our blog. Stay informed and gain valuable knowledge",
//   },
//   {
//     img: "/images/faq.png",
//     title: "Explore Our FAQ",
//     desc: "Find quick answers to common questions in our comprehensive FAQ section.",
//   },
//   {
//     img: "/images/chatbot.png",
//     title: "Chat With Our Bot",
//     desc: " Available 24/7 to assist you with guidance and solutions.",
//   },
// ];

// const SupportPage = () => {
//   return (
//     <div className="min-h-screen w-full mx-auto p-6 pt-12 px-3 md:px-8 lg:px-8 flex flex-col gap-16 bg-gray-100 dark:bg-transparent ">
//       <div className="w-full lg:w-[90%] mx-auto text-center">
//         <GenHeading
//           text="How Can We Help"
//           classNames="w-full !font-bold !text-4xl dark:text-white"
//         />
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
//           {supportItems.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white p-6 rounded-lg shadow-lg text-slate-800 flex flex-col justify-around items-center"
//             >
//               <img src={item.img} alt={item.title} className="w-full h-3/5" />
//               <div>
//                 <h2 className="text-xl font-semibold mt-4">{item.title}</h2>
//                 <p className="mt-2 ">{item.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SupportPage;

"use client";
import GenHeading from "@/app/components/generalComps/GenHeading";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const supportItems = [
  {
    img: "/images/ourblog.png",
    title: "Learn From Our Blog",
    desc: "Discover tips, insights, and updates in our blog. Stay informed and gain valuable knowledge",
  },
  {
    img: "/images/faq.png",
    title: "Explore Our FAQ",
    desc: "Find quick answers to common questions in our comprehensive FAQ section.",
  },
  {
    img: "/images/chatbot.png",
    title: "Chat With Our Bot",
    desc: " Available 24/7 to assist you with guidance and solutions.",
  },
];

const SupportPage = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <div className="min-h-screen w-full mx-auto p-6 pt-12 px-3 md:px-8 lg:px-8 flex flex-col gap-16 bg-gray-100 dark:bg-transparent relative">
      <div className="w-full lg:w-[90%] mx-auto text-center">
        <GenHeading
          text="How Can We Help"
          classNames="w-full !font-bold !text-4xl dark:text-white"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {supportItems.map((item, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg text-slate-800 flex flex-col justify-around items-center"
            >
              <img src={item.img} alt={item.title} className="w-full h-3/5" />
              <div>
                <h2 className="text-xl font-semibold mt-4">{item.title}</h2>
                <p className="mt-2 ">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg"
      >
        Chat with us
      </button>

      {/* Chat Modal */}
      {isChatOpen && <ChatModal toggleChat={toggleChat} />}
    </div>
  );
};

export default SupportPage;



function ChatModal({ toggleChat }) {
  const conversation = [
    { sender: 'user', message: 'Hi, I need help with my account.' },
    { sender: 'bot', message: 'Hello! How can I assist you today?' },
    { sender: 'user', message: 'I forgot my password, can you help me?' },
    { sender: 'bot', message: 'Sure! Please follow the instructions sent to your email.' },
    { sender: 'user', message: 'I checked my email, but I didn’t receive anything.' },
    { sender: 'bot', message: 'Please check your spam folder, sometimes emails can end up there.' },
    { sender: 'user', message: 'I found it in the spam folder. Thanks!' },
    { sender: 'bot', message: 'You’re welcome! Do you need help with anything else?' },
    { sender: 'user', message: 'Yes, I need to update my payment information.' },
    { sender: 'bot', message: 'I can help with that! Please provide your new payment details.' },
    { sender: 'user', message: 'I’m not sure where to update it. Can you guide me?' },
    { sender: 'bot', message: 'Go to the account settings page and look for the "Payment Information" section.' },
    { sender: 'user', message: 'Found it! I’ve updated my payment info.' },
    { sender: 'bot', message: 'Great! Your information has been updated successfully.' },
    { sender: 'user', message: 'Thank you so much for your help!' },
    { sender: 'bot', message: 'You’re welcome! Let me know if you need anything else.' }
  ];
  

  return (
    <div className="fixed bottom-8 right-8 w-96 h-[550px] bg-opacity-50 flex justify-end items-start rounded-lg overflow-hidden z-50">
      <div className="bg-white w-full h-full shadow-lg flex flex-col justify-between">
        <div className="flex justify-between items-center bg-black text-white p-3 ">
          <h2 className="text-xl font-bold">Chat with our Bot</h2>
          <button onClick={toggleChat} className="">
            <FaTimes className="text-2xl" />
          </button>
        </div>

        <div className="space-y-4 overflow-y-scroll h-2/3 p-2" data-lenis-prevent="true">
          {conversation.map((msg, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg flex justify-start items-start gap-2 ${
                msg.sender === 'user' ? 'bg-blue-100 flex-row-reverse ' : 'bg-gray-100'
              }`}
            >
              <img
                src={msg.sender === 'user' ? '/images/user.jpg' : '/images/bot.png'}
                className="w-12 h-12 rounded-full"
                alt={msg.sender}
              />
              <p className="text-gray-700">{msg.message}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 p-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}




