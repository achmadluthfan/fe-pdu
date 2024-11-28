"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Loading from "@/components/ui/Loading";
import { useDataContext } from "@/context";

const RecentActivity = () => {
  const [activities, setActivites] = useState<any>([]);
  const [image, setImage] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const { data, setData } = useDataContext();

  useEffect(() => {
    const getActivities = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/volumes/?limit=3`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        setActivites(data.data);
        setData(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    getActivities();
  }, [data]);

  const [limit, setLimit] = useState(5);
  const initialLimit = 1;

  // const displayedActivities = activities.slice(0, limit);

  const showMore = () => setLimit(limit + 5);
  const showLess = () => setLimit(initialLimit);

  const formatTimestamp = (timestamp: any) => {
    const date = new Date(timestamp);
    const formattedTime = date.toLocaleTimeString("id-ID"); // Jam:Menit:Detik
    return `${formattedTime} `;
  };

  const formateDate = (timestamp: any) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("id-ID");
    return formattedDate;
  };

  return (
    <>
      <div className="mx-auto w-full">
        <h2 className="text-2xl font-bold text-red-500 mb-4">
          Recent Activity
        </h2>
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-center border-b-2">
                <th className="px-6 py-3 w-auto text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 w-[50%] text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Number of Stone
                </th>
                <th className="px-6 py-3 w-auto text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
                <th className="px-6 py-3 w-[50%] text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 w-[50%] text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {/* {displayedActivities.map((activity, index) => ( */}
              {loading ? (
                <Loading />
              ) : (
                activities.map((activity: any, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Image
                            className="h-10 w-10 rounded-full cursor-pointer"
                            src={activity.image_url}
                            alt={activity.image_url}
                            width={100}
                            height={100}
                            onClick={() => setImage(activity.image_url)}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 text-center py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {activity.number_of_stones}
                      </div>
                    </td>
                    <td className="px-6 text-center py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {activity.percentage_area.toFixed(2)}%
                      </div>
                    </td>
                    <td className="px-6 text-center py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatTimestamp(activity.time)}
                      </div>
                    </td>
                    <td className="px-6 text-center py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formateDate(activity.time)}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right pr-10 text-[#7D7D7D]">
          {/* {activities.length > limit && (
            <button onClick={showMore} className="text-[#7D7D7D] font-semibold">
              Show More
            </button>
          )} */}
          {limit > initialLimit && (
            <button
              onClick={showLess}
              className="text-red-600 font-semibold ml-2"
            >
              Show Less
            </button>
          )}
        </div>
      </div>
      <div className="">
        <div
          className={`w-full h-full absolute top-0 left-0 ${
            image == "" ? "z-[-10]" : "z-40"
          } bg-slate-900 opacity-50`}
        ></div>
        <div className="w-[50%] gap-x-3 left-[50%] translate-x-[-50%] top-[50%] transition-all duration-300 flex justify-center translate-y-[-50%]  fixed z-50">
          <Image
            className="w-[50%] aspect-auto object-cover"
            src={image}
            alt={image}
            width={1000}
            height={1000}
          />
          <button
            onClick={() => setImage("")}
            className={`p-2 h-fit ${
              image == "" ? "hidden" : "block"
            } bg-gray-200 hover:bg-gray-300 text-gray-600 rounded-full focus:outline-none`}
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default RecentActivity;
