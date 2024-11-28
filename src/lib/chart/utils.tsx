// "use client";
// import { Ref, useEffect, useRef, useState } from "react";
// import Chart from "chart.js/auto";
// import { useMemo } from "react";

// interface DataPoint {
//   date: string;
//   time: string;
//   percentage: number;
// }

// export const DataChart = ({ dataPoints }: { dataPoints: DataPoint[] }) => {
//   const chartRef = useRef(null);
//   const [filteredData, setFilteredData] = useState(dataPoints);
//   const [fromDate, setFromDate] = useState("");
//   const [fromTime, setFromTime] = useState("00:00");
//   const [toDate, setToDate] = useState("");
//   const [toTime, setToTime] = useState("23:59");
//   const [isSortMenuVisible, setIsSortMenuVisible] = useState(false);

//   // Update the chart based on filtered data

//   // Handle sorting and updating the chart when clearing the sort
//   const clearSort = () => {
//     const latestDate = dataPoints.reduce((latest, point) => {
//       return new Date(point.date) > new Date(latest) ? point.date : latest;
//     }, dataPoints[0].date);

//     setFromDate(latestDate);
//     setFromTime("00:00");
//     setToDate(latestDate);
//     setToTime("23:59");
//     setIsSortMenuVisible(false);

//     const filtered = dataPoints.filter((point) => point.date === latestDate);
//     setFilteredData(filtered);
//     updateChart(filtered);
//   };

//   // Use effect to initialize chart when the component is mounted
//   useEffect(() => {
//     if (chartRef.current) {
//       const chartInstance = new Chart(chartRef.current, {
//         type: "line", // or other chart types you need
//         data: {
//           labels: filteredData.map((point) => point.time),
//           datasets: [
//             {
//               label: "Percentage",
//               data: filteredData.map((point) => point.percentage),
//               borderColor: "#115CA9", // Add your desired border color
//               fill: false,
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           scales: {
//             x: { beginAtZero: true },
//             y: { beginAtZero: true },
//           },
//         },
//       });

//       return () => {
//         // Clean up chart instance when component unmounts
//         chartInstance.destroy();
//       };
//     }
//   }, [filteredData]); // Re-run when filteredData changes

//   return (
//     <div>
//       <canvas ref={chartRef}></canvas>
//       <button onClick={clearSort}>Clear Sort</button>
//     </div>
//   );
// };

// export const updateChart = (
//   chartRef: Ref<HTMLCanvasElement>,
//   filteredData: any
// ) => {
//   const labels = filteredData.map((point: DataPoint) => point.time);
//   const data = filteredData.map((point: DataPoint) => point.percentage);
//   const chartInstance = chartRef.current
//     ? Chart.getChart(chartRef.current)
//     : null;

//   if (chartInstance) {
//     chartInstance.data.labels = labels;
//     chartInstance.data.datasets[0].data = data;
//     chartInstance.update();
//   }
// };

// const generateCSV = (data: Array<{ date: string; value: number }>) => {
//   const headers = ["Date", "Percentage"];
//   const rows = data.map((dp) => [dp.date, dp.value]);
//   const csv = [headers, ...rows]
//     .map((row) => row.join(";")) // Join each row by commas
//     .join("\n"); // Separate rows by new lines

//   return csv;
// };

// const displayedDate = ({
//   dataPoints,
//   fromDate,
//   fromTime,
//   toDate,
//   toTime,
// }) => {
//   const displayedDate = useMemo(() => {
//     const dateOptions = {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     };

//     const defaultDateTime = dataPoints.reduce((latest, point) => {
//       return new Date(point.date) > new Date(latest) ? point.date : latest;
//     }, dataPoints[0].date);

//     const fromDateTime = new Date(`${fromDate}T${fromTime}`);
//     const toDateTime = new Date(`${toDate}T${toTime}`);

//     // If both dates are the same, display that date
//     if (fromDate === toDate) {
//       return new Date(defaultDateTime).toLocaleDateString(
//         "en-US",
//         dateOptions
//       );
//     } else {
//       return `${fromDateTime.toLocaleDateString(
//         "en-US",
//         dateOptions
//       )} - ${toDateTime.toLocaleDateString("en-US", dateOptions)}`;
//     }
//   }, [dataPoints, fromDate, fromTime, toDate, toTime]);

//   return (
//     <div>
//       <p>{displayedDate}</p>
//     </div>
//   );
// };

// const downloadCSV = (csvContent: string, fileName: string) => {
//   const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
//   const link = document.createElement("a");
//   const url = URL.createObjectURL(blob);

//   link.setAttribute("href", url);
//   link.setAttribute("download", fileName);
//   link.style.visibility = "hidden";
//   document.body.appendChild(link);
//   link.click();
//   document.body.removeChild(link);

//   return {
//     dataPoints,
//     displayedDate,
//     exportToCSV,
//   };
// };

// const exportToCSV = () => {
//   const csvContent = generateCSV(
//     dataPoints.map((dp) => ({ date: dp.date, value: dp.percentage }))
//   );
//   downloadCSV(csvContent, "data.csv");
// };
