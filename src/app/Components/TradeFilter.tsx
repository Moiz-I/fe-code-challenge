import { FC } from "react";

interface TradeFilterProps {
  filter: "BUY" | "SELL" | "ALL";
  handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const TradeFilter: FC<TradeFilterProps> = ({ filter, handleFilterChange }) => {
  return (
    <select
      id="filter"
      value={filter}
      onChange={handleFilterChange}
      className="bg-white hover:bg-gray-100 text-gray-600 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
    >
      <option value="ALL">All</option>
      <option value="BUY">Buy</option>
      <option value="SELL">Sell</option>
    </select>
  );
};

export default TradeFilter;
