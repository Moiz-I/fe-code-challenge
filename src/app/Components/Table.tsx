"use client";

import { FC } from "react";
import Trade from "../../../types/Trade";

interface TableProps {
  filteredTrades: Trade[];
}

const Table: FC<TableProps> = ({ filteredTrades }) => {
  return (
    <div className="py-4 sm:px-6 lg:px-8">
      <div className="shadow-md border-gray-200 rounded-lg">
        <table className="table-auto divide-y divide-gray-200 block">
          <thead className="bg-gray-50 block text-sm">
            <tr>
              <th className="px-6 py-4 text-right min-w-[150px]">Trade ID</th>
              <th className="px-6 py-4 text-right min-w-[150px]">Side</th>
              <th className="px-6 py-4 text-right min-w-[150px]">Price</th>
              <th className="px-6 py-4 text-right min-w-[150px]">Size</th>
              <th className="px-6 py-4 text-right min-w-[150px]">Time</th>
            </tr>
          </thead>
          <tbody className="text-sm block w-full overflow-auto h-96">
            {filteredTrades.length === 0 && <p>empty</p>}
            {filteredTrades.map((trade) => (
              <tr
                key={trade.trade_id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 font-mono"
              >
                <td className="px-6 py-4 text-right min-w-[150px]">
                  {trade.trade_id}
                </td>
                <td className="px-6 py-4 text-right min-w-[150px]">
                  {trade.side.toUpperCase()}
                </td>
                <td className="px-6 py-4 text-right min-w-[150px]">
                  {trade.price}
                </td>
                <td className="px-6 py-4 text-right min-w-[150px]">
                  {trade.size}
                </td>
                <td className="px-6 py-4 text-right min-w-[150px]">
                  {trade.time}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
