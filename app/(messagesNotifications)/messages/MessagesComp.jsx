"use client";
import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "react-query";
import { getData } from "@/app/providers/TheQueryProvider";
import GenHeading from "@/app/components/generalComps/GenHeading";
import ErrorPage from "@/app/components/sceletons/ErrorPage";
import { SlOptions } from "react-icons/sl";
import { FaFile } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { IoIosAttach } from "react-icons/io";
import { IoSend } from "react-icons/io5";
import { useSearchParams } from "next/navigation";

const MessagesComp = () => {
  const searchParams = useSearchParams();
  const conversationid = searchParams.get("conversationid");

  const { data, isLoading, error } = useQuery("conversations", () =>
    getData("conversations")
  );

  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    if (data) {
      if (conversationid) {
        const foundConversation = data.conversations.find(
          (conv) => conv.id == conversationid
        );
        setConversation(foundConversation || data.conversations[0]);
      } else {
        setConversation(data.conversations[0]);
      }
    }
  }, [data, conversationid]);

  const handleSend = (message) => {
    setMessages([...messages, { text: message, sender: "me" }]);
  };

  const handleChangeConversation = (id) => {
    const foundConversation = data.conversations.find(
      (conv) => conv.id == id
    );
    setConversation(foundConversation || data.conversations[id]);
    // setConversation(data.conversations[id]);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <ErrorPage />;

  return (
    <div className="w-full min-h-[70vh] py-8 flex justify-center items-center bg-gray-200 dark:bg-transparent">
      <div className="h-[85vh] w-[90%] overflow-hidden shadow-lg rounded-lg  grid grid-cols-[1fr_3fr_1fr] bg-gray-900 text-white">
        <ConversationList
          conversations={data?.conversations}
          handleChangeConversation={handleChangeConversation}
          selected={conversation}
        />
        <ChatWindow conversation={conversation} handleSend={handleSend} />
        <InfoSide />
      </div>
    </div>
  );
};

export default MessagesComp;

function ConversationList({ conversations, handleChangeConversation ,selected }) {
  return (
    <div className="w-full border-r-2 overflow-hidden h-[85vh] bg-gray-100">
      <GenHeading
        text={"All chats"}
        classNames="w-full p-4 text-slate-800 font-medium text-3xl shadow-md py-4"
      />
      <div
        className="flex flex-col gap-2 p-2 mt-2 max-h-[90%] overflow-y-scroll"
        data-lenis-prevent="true"
      >
        {conversations.map((conv, i) => (
          <div
            key={i}
            // conversation
            className={`flex justify-start cursor-pointer bg-white items-center gap-3 p-2 animation hover:bg-primary/30 rounded-md transition ${conv?.id == selected?.id && "bg-primary/50" } `}
            onClick={() => handleChangeConversation(conv?.id)}
          >
            <img
              src="/images/user.jpg"
              className="w-16 h-16 rounded-full object-cover"
              alt="User"
            />
            <div className="flex flex-col text-gray-800 flex-grow">
              <p className="font-semibold ">{conv.participants[0]}</p>
              <p className="line-clamp-2">
                {conv.messages[conv.messages.length - 1].text}
              </p>
            </div>
            <div className="h-full flex flex-col justify-around items-center text-gray-800">
              <p className="text-white rounded-full bg-primary p-1 flex justify-center items-center">
                <span className="text-xs text-center">
                  {conv.unread}
                </span>
              </p>
              <p className="text-xs whitespace-nowrap">
                {
                  conv.messages[conv.messages.length - 1]
                    .sent_at
                }
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatWindow({ conversation, handleSend }) {
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [conversation?.messages]);

  return (
    <div className="w-full border-l-2 overflow-hidden h-[85vh] flex flex-col bg-gray-100">
      <div className="w-full flex justify-between items-center text-slate-800 shadow-md p-4 py-4">
        <GenHeading
          text={conversation?.participants[0]}
          classNames="w-full !m-0 font-medium text-3xl"
        />
        <SlOptions />
      </div>
      <div
        ref={messagesContainerRef}
        className="p-4 flex-1 overflow-y-scroll"
        data-lenis-prevent="true"
      >
        {conversation?.messages.map((msg, index) => (
          <div
            key={index}
            className={`flex w-full ${
              msg.sender === "me" ? "justify-end text-end" : "justify-start"
            } mb-4`}
          >
            <div
              className={`w-[70%] p-3 rounded-xl ${
                msg.sender === "me"
                  ? "bg-green-600 text-white"
                  : "text-gray-800 bg-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {/* دا مخفى بس عشان يبقى ريفرنس لاخر رساله */}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex items-center p-4 bg-white border m-3 rounded-md">
        <input
          type="text"
          className="w-full p-3 text-gray-800 bg-white rounded-xl focus:outline-none"
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.target.value.trim()) {
              handleSend(e.target.value);
              e.target.value = "";
            }
          }}
        />
        <div className=" flex justify-center items-center gap-3">
          <IoIosAttach className="text-primary text-3xl" />
          <IoSend className="text-white bg-primary text-4xl p-2 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

function InfoSide() {
  return (
    <div className="h-full bg-white flex flex-col justify-start items-start gap-2">
      <div className="w-full border-b p-3">
        <GenHeading classNames="p-4 " text={"Project summary"} />
        <div className="text-gray-800">
          <div className="w-full flex justify-between items-center p-2 font-medium">
            <span>status</span>
            <span>Open</span>
          </div>

          <div className="w-full flex justify-between items-center p-2 font-medium">
            <span>Budget</span>
            <span>800 $</span>
          </div>

          <div className="w-full flex justify-between items-center p-2 font-medium">
            <span>DeadLine</span>
            <span>12 sep 2025</span>
          </div>

          <div className="w-full flex justify-between items-center p-2 font-medium">
            <span>Location</span>
            <span>Egypt</span>
          </div>
        </div>
      </div>
      <div className="w-full p-3">
        <GenHeading classNames="p-4 " text={"Project Files"} />
        <ProjectImages />
      </div>
    </div>
  );
}

const ProjectImages = () => {
  return (
    <div className="space-y-2 w-full px-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="w-full border rounded-lg p-2 flex justify-between items-center text-gray-700"
        >
          <div className="flex justify-start items-center gap-6">
            <FaFile className="text-indigo-500 text-3xl md:text-3xl" />
            <div className="text-gray-700 dark:text-gray-200">
              <p className="text-sm font-medium">File Name . Format</p>
              <p className="text-xs">1,156 MB</p>
            </div>
          </div>
          <FiDownload className="text-xl " />
        </div>
      ))}
    </div>
  );
};
