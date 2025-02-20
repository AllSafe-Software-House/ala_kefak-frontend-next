"use client";

import GenHeading from "@/app/components/generalComps/GenHeading";
import ErrorPage from "@/app/components/sceletons/ErrorPage";
import { getData } from "@/app/providers/TheQueryProvider";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { useQuery } from "react-query";

const NotificationsComp = () => {
    const searchParams = useSearchParams();
    const notificationid = searchParams.get("notificationid");
  const [selected, setselected] = useState(null);

  const { data, isLoading, error } = useQuery("notifications", () =>
    getData("notifications")
  );

    useEffect(() => {
      if (data) {
        console.log(data)
        if (notificationid) {
          const foundNotification= data.notifications.find(
            (conv) => conv.id == notificationid
          );
          setselected(foundNotification || data.notifications[0]);
        } else {
          setselected(data.notifications[0]);
        }
      }
    }, [data, notificationid]);


  return (
    <div className="w-[98%] lg:w-[90%] mx-auto min-h-screen flex flex-col justify-start items-start gap-4 py-8">
      <GenHeading text={"All Notifications"} />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <ErrorPage />
      ) : (
        <div className="w-full flex flex-col justify-start items-start gap-1 ">
          {data?.notifications?.map((notification) => (
            <div
              key={notification.id}
              className={`w-full flex justify-start items-center gap-4 animation group  p-3 ${notification?.id == selected?.id ? "bg-primary/40   font-medium" :"bg-white"} `}
            >
              <div className="rounded-full text-2xl p-4 bg-gray-100 text-slate-900">
                <FaRegUser />
              </div>
              <div className="w-full text-base flex flex-col justify-start items-start gap-2">
                <p className="animation group-hover:text-primary cursor-default">
                  {notification.text}
                </p>
                <p className="text-sm self-end">
                  {moment(new Date(notification.timestamp)).fromNow()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationsComp;
