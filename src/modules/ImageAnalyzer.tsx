"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useDataContext } from "@/context";
// import { notFound } from "next/navigation";

interface UploadData {
  status: string;
  message: string;
  data: {
    percentage_area: number;
    number_of_stones: number;
    image_url: string;
  };
}

const ImageAnalyzer = () => {
  const [imageData, setImageData] = useState(null);
  const [image, setImage] = useState<any>("");
  const [isTooLarge, setIsTooLarge] = useState(false);
  const [isUnsupported, setIsUnsupported] = useState(false);
  const [isOnProgress, setIsOnProgress] = useState(false);
  const [uploadData, setUploadData] = useState<UploadData>();

  const { data, setData } = useDataContext();

  const { toast } = useToast();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];

    const checkAlreadyFile = event.target.files.length > 1;

    if (file) {
      resetAlerts();
      setIsOnProgress(true);

      // Check file size
      if (file.size > 500 * 1024) {
        setIsTooLarge(true);
        setIsOnProgress(false);
        return;
      }

      // Check file type
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setIsUnsupported(true);
        setIsOnProgress(false);
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      toast({
        title: "In Progress",
        description: "Please wait while we upload the image",
        className: "bg-blue-500 text-white",
        // duration: 150000,
      });

      try {
        const response = await fetch(
          // `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/volumes/upload`,
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/volumes/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const dataResponse = await response.json();

        if (!dataResponse) {
          return {
            notFound: true,
          };
        }

        if (response.ok) {
          toast({
            title: "Finished",
            description: `${dataResponse.message}`,
            className: "bg-green-500 text-white ",
          });

          setUploadData(dataResponse.data);

          setData((prevData: any) => prevData + 1);

          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        } else {
          toast({
            title: "Failed",
            description: `${dataResponse.message}`,
            className: "bg-red-500 text-white",
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  // const formatTimestamp = (timestamp: any) => {
  //   const date = new Date(timestamp);
  //   const formattedTime = date
  //     .toLocaleTimeString("id-ID", { hour12: false })
  //     .replace(/\./g, ":");
  //   const formattedDate = date.toLocaleDateString("id-ID");
  //   return `${formattedDate} ${formattedTime} `;
  // };

  const resetAlerts = () => {
    setIsTooLarge(false);
    setIsUnsupported(false);
    setIsOnProgress(false);
  };

  return (
    <>
      <div className="w-full">
        <div className="w-full py-12">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold text-red-500">Image Analyzer</h1>
            <button className="text-gray-400 hover:text-gray-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>
          </div>

          <div className="bg-white rounded-[35px] xl:h-80 shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row h-full">
              <div className="w-full md:w-[46%] p-6 border-b md:border-b-0 md:border-r border-gray-200">
                <div className="flex flex-col items-center justify-center h-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-400 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleFileUpload}
                    className="hidden"
                    ref={fileInputRef}
                  />
                  <button
                    onClick={triggerFileInput}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  >
                    UPLOAD
                  </button>
                  <p className="text-sm text-gray-500 mt-2">
                    JPEG, JPG, PNG | Max 500KB
                  </p>
                </div>
              </div>
              <div className="w-full md:w-[54%] p-6 flex flex-col items-center justify-center">
                <h2 className="text-2xl font-semibold mb-4">RESULT</h2>

                {uploadData ? (
                  <>
                    <p className="font-semibold text-lg">
                      {/* .toFixed(2) */}
                      {/* Volume : {uploadData.data.percentage_area}% */}
                    </p>
                    <p className="font-semibold text-lg">
                      Jumlah Batu : {uploadData.data.number_of_stones}
                    </p>
                    <button
                      onClick={() => setImage(uploadData.data.image_url)}
                      className="bg-blue-500 px-4 mt-2 py-2 rounded-md text-white font-semibold"
                    >
                      View Image
                    </button>
                  </>
                ) : (
                  <p className="text-gray-500">No information available yet</p>
                )}
              </div>
            </div>
          </div>
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

export default ImageAnalyzer;
