"use client";
import { useState } from "react";
import Image from "next/image";

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const selectItem = (item: any) => {
    setSelectedItem(item);
  };

  return (
    <div className="bg-gray-100 z-10 flex items-center justify-center">
      <div className="bg-white w-64 rounded-3xl shadow-lg px-6 py-12">
        <div className="space-y-8 flex flex-col items-center">
          <Image src="/pdu_logo.png" alt="PDU Logo" width={64} height={64} />

          <div
            className="p-4 cursor-pointer"
            onClick={() => selectItem("analyzer")}
          >
            <Image
              className={`mx-auto w-16 mb-4 ${
                selectedItem === "analyzer" ? "drop-shadow-md" : ""
              }`}
              src="/image_analyzer_icon.png"
              alt="Image Analyzer Icon"
              width={64}
              height={64}
            />
            <span
              className={
                selectedItem === "analyzer" ? "text-blue-500 font-semibold" : ""
              }
            >
              Image Analyzer
            </span>
          </div>

          <div
            className="p-4 cursor-pointer"
            onClick={() => selectItem("realtime")}
          >
            <Image
              className={`mx-auto w-16 mb-4 ${
                selectedItem === "realtime" ? "drop-shadow-md" : ""
              }`}
              src="/real_time_icon.png"
              alt="Real-Time Icon"
              width={64}
              height={64}
            />
            <span
              className={
                selectedItem === "realtime" ? "text-blue-500 font-semibold" : ""
              }
            >
              Real-time Precision
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
