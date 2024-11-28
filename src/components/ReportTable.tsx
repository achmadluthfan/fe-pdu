"use client";
import React from "react";

interface DataPoint {
  // imageUrl: string;
  time: string;
  volume: number;
  // time: string;
}

interface ReportTableProps {
  dataPoints: DataPoint[];
}

const ReportTable: React.FC<ReportTableProps> = ({ dataPoints }) => {
  return (
    <table className="w-full">
      <thead>
        <tr className="text-center">
          {/* <th className="px-6 py-3 w-[50%] text-xs text-[#115CA9] font-bold uppercase">
            Name
          </th> */}
          <th className="px-6 py-3 w-[50%] text-xs text-[#115CA9] font-bold uppercase">
            Volume
          </th>
          <th className="px-6 py-3 w-auto text-xs text-[#115CA9] font-bold uppercase">
            Date
          </th>
        </tr>
      </thead>
      <tbody>
        {dataPoints.map((point, index) => (
          <tr key={index}>
            {/* <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-10 w-10">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={point.imageUrl}
                    alt={point.imageUrl}
                  />
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-gray-900">
                    {point.imageUrl}
                  </div>
                </div>
              </div>
            </td> */}
            <td className="px-6 text-center py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{point.volume}%</div>
            </td>
            <td className="px-6 flex text-center py-4 whitespace-nowrap">
              <span className="flex-grow text-xs leading-5 font-medium rounded-md">
                {point.time}
                {/* {point.date} */}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReportTable;
