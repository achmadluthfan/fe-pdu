// "use client";

// import { useState, useEffect, useRef } from "react";
// import Chart from "chart.js/auto";
// import ReportTable from "../components/ReportTable"; // Adjust the import path as needed
// import { updateChart } from "@/lib/chart/utils";
// import { useMemo } from "react";

// export default function Report() {
//   const [dataPoints, setDataPoints] = useState([
//     {
//       time: "2024-10-08",
//       volume: 10,
//     },
//     {
//       time: "2024-10-08",
//       volume: 10,
//     },
//     {
//       time: "2024-10-08",
//       volume: 10,
//     },
//   ]);
//   const [fromDate, setFromDate] = useState("");
//   const [fromTime, setFromTime] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [toTime, setToTime] = useState("");
//   const [isSortMenuVisible, setSortMenuVisible] = useState(false);

//   const chartRef = useRef(null);

//   const toggleSortMenu = () => setSortMenuVisible(!isSortMenuVisible);

//   const clearSort = () => {
//     setFromDate("");
//     setFromTime("");
//     setToDate("");
//     setToTime("");
//   };

//   const applySort = () => {
//     // Gabungkan tanggal dan waktu pengguna menjadi objek Date
//     const fromDateTime = new Date(`${fromDate}T${fromTime}`);
//     const toDateTime = new Date(`${toDate}T${toTime}`);

//     // Filter dataPoints berdasarkan range dari fromDateTime sampai toDateTime
//     const filteredData = dataPoints.filter((point) => {
//       const pointDateTime = new Date(`${point.time}T${point.time}`);
//       return pointDateTime >= fromDateTime && pointDateTime <= toDateTime;
//     });

//     // Setelah filter, tutup menu sort
//     setSortMenuVisible(false);

//     // Update chart
//     updateChart(chartRef, filteredData);
//   };

//   const displayedDate = ({
//     dataPoints,
//     fromDate,
//     fromTime,
//     toDate,
//     toTime,
//   }: {
//     dataPoints: Array<{
//       date: string;
//       time: string;
//       percentage: number;
//       imageUrl: string;
//     }>;
//     fromDate: string;
//     fromTime: string;
//     toDate: string;
//     toTime: string;
//   }) => {
//     const displayedDate = useMemo(() => {
//       const dateOptions: Intl.DateTimeFormatOptions = {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//       };

//       const defaultDateTime = dataPoints.reduce((latest, point) => {
//         return new Date(point.date) > new Date(latest) ? point.date : latest;
//       }, dataPoints[0].date);

//       const fromDateTime = new Date(`${fromDate}T${fromTime}`);
//       const toDateTime = new Date(`${toDate}T${toTime}`);

//       // If both dates are the same, display that date
//       if (fromDate === toDate) {
//         return new Date(defaultDateTime).toLocaleDateString(
//           "en-US",
//           dateOptions
//         );
//       } else {
//         return `${fromDateTime.toLocaleDateString(
//           "en-US",
//           dateOptions
//         )} - ${toDateTime.toLocaleDateString("en-US", dateOptions)}`;
//       }
//     }, [dataPoints, fromDate, fromTime, toDate, toTime]);

//     return (
//       <div>
//         <p>{displayedDate}</p>
//       </div>
//     );
//   };

//   const generateCSV = (data: Array<{ date: string; value: number }>) => {
//     const headers = ["Date", "Percentage"];
//     const rows = data.map((dp) => [dp.date, dp.value]);
//     const csv = [headers, ...rows]
//       .map((row) => row.join(";")) // Join each row by commas
//       .join("\n"); // Separate rows by new lines

//     return csv;
//   };

//   const downloadCSV = (csvContent: string, fileName: string) => {
//     const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
//     const link = document.createElement("a");
//     const url = URL.createObjectURL(blob);

//     link.setAttribute("href", url);
//     link.setAttribute("download", fileName);
//     link.style.visibility = "hidden";
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     return {
//       dataPoints,
//       displayedDate,
//       exportToCSV,
//     };
//   };

//   const exportToCSV = () => {
//     const csvContent = generateCSV(
//       dataPoints.map((dp) => ({ date: dp.time, value: dp.volume }))
//     );
//     downloadCSV(csvContent, "data.csv");
//   };

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const response = await fetch("/api/volumes/?limit=3");
//         const data = await response.json();
//         setDataPoints(data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     getData();

//     const latestDate = dataPoints.reduce((latest, point) => {
//       return new Date(point.time) > new Date(latest) ? point.time : latest;
//     }, dataPoints[0].time);

//     // Filter dataPoints untuk hanya menyertakan data pada tanggal terbaru
//     const filteredDataPoints = dataPoints.filter(
//       (point) => point.time === latestDate
//     );

//     // Ambil label (time) dan persentase dari data yang sudah difilter
//     const labels = filteredDataPoints.map((point) => ` ${point.time}`);
//     const percentages = filteredDataPoints.map((point) => point.volume);

//     if (chartRef.current) {
//       const chart = new Chart(chartRef.current, {
//         type: "line",
//         data: {
//           labels: labels, // X axis labels (combined date and time)
//           datasets: [
//             {
//               label: "Percentage",
//               data: percentages, // Y axis data (percentage values)
//               borderColor: "#7987FF",
//               tension: 0.4,
//               pointRadius: 4,
//               pointBackgroundColor: "#7987FF",
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           scales: {
//             y: {
//               beginAtZero: true,
//               max: 100,
//               ticks: {
//                 stepSize: 20,
//                 callback: function (value) {
//                   return value + "%";
//                 },
//               },
//             },
//           },
//           plugins: {
//             legend: {
//               display: false,
//             },
//           },
//         },
//       });
//       return () => chart.destroy();
//     }
//   }, []);
//   // dataPoints

//   return (
//     <div className="p-6 flex flex-col gap-y-12">
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-red-500">Report</h1>
//         <div className="space-x-4">
//           <button
//             onClick={exportToCSV}
//             className="px-4 py-2 text-[#0671E0] bg-[#EAEAEA] rounded transition duration-300"
//           >
//             Export as CSV
//           </button>
//           <button
//             onClick={toggleSortMenu}
//             className="px-4 py-2 text-[#0671E0] bg-[#EAEAEA] rounded transition duration-300"
//           >
//             Sort
//           </button>
//           {isSortMenuVisible && (
//             <div className="absolute right-0 z-50 mt-2 w-[50%] bg-white rounded-lg shadow-lg border p-4">
//               <h3 className="font-semibold mb-2">From</h3>
//               <div className="mb-4 flex gap-x-6">
//                 <input
//                   type="date"
//                   value={fromDate}
//                   onChange={(e) => setFromDate(e.target.value)}
//                   className="w-full px-2 py-1 text-[#7D7D7D] focus:outline-none rounded-lg bg-[#D7E7F7]"
//                 />
//                 <input
//                   type="time"
//                   value={fromTime}
//                   onChange={(e) => setFromTime(e.target.value)}
//                   className="w-full px-2 py-1 text-[#7D7D7D] focus:outline-none rounded-lg bg-[#D7E7F7]"
//                 />
//               </div>
//               <h3 className="font-semibold mb-2">To</h3>
//               <div className="mb-4 flex gap-x-6">
//                 <input
//                   type="date"
//                   value={toDate}
//                   onChange={(e) => setToDate(e.target.value)}
//                   className="w-full px-2 py-1 text-[#7D7D7D] focus:outline-none rounded-lg bg-[#D7E7F7]"
//                 />
//                 <input
//                   type="time"
//                   value={toTime}
//                   onChange={(e) => setToTime(e.target.value)}
//                   className="w-full px-2 py-1 text-[#7D7D7D] focus:outline-none rounded-lg bg-[#D7E7F7]"
//                 />
//               </div>
//               <div>
//                 <button
//                   onClick={clearSort}
//                   className="px-4 py-2 mr-3 text-[#0671E0] bg-[#EAEAEA] rounded"
//                 >
//                   Clear
//                 </button>
//                 <button
//                   onClick={applySort}
//                   className="px-4 py-2 text-[#0671E0] bg-[#EAEAEA] rounded"
//                 >
//                   Apply
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <div className="p-6 flex flex-col gap-y-12 relative bg-white shadow-lg rounded-[35px]">
//         <div>
//           <h2 className="text-xl font-semibold mb-6">
//             {new Date().toLocaleDateString()}
//           </h2>
//           <canvas ref={chartRef}></canvas>
//         </div>
//         <div className="border-t-[3px] border-gray-200" />
//         <ReportTable dataPoints={dataPoints} />
//       </div>
//     </div>
//   );
// }
