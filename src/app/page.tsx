"use client"; //required to mark as client side code in NextJS 13

import React, { useEffect, useState } from "react";
// import { Trade } from "./types"; TODO

interface Trade {
  //refactor this
  trade_id: string;
  price: number;
  size: number;
  side: string;
  time: string;
}

const WEBSOCKET_URL = "wss://ws-feed.exchange.coinbase.com";
const SUBSCRIPTION_MESSAGE = {
  type: "subscribe",
  channels: ["matches"],
  product_ids: ["ETH-USD"],
};

export default function Home() {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [filter, setFilter] = useState<"BUY" | "SELL" | "ALL">("ALL");

  //use effect to connect to websocket and receive data

  return (
    <div>
      <h1>Latest Trades for ETH-USD</h1>
      <label htmlFor="filter">Filter: </label>
      <select id="filter" value={filter} onChange={() => {}}>
        <option value="ALL">All</option>
        <option value="BUY">Buy</option>
        <option value="SELL">Sell</option>
      </select>
      <table>
        <thead>
          <tr>
            <th>Trade ID</th>
            <th>Price</th>
            <th>Size</th>
            <th>Side</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>test</tr>
        </tbody>
      </table>
    </div>
  );
}
