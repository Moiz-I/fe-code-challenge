"use client"; //required to mark as client side code in NextJS 13

import React, { useEffect, useRef, useState } from "react";
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
  const [isConnected, setIsConnected] = useState(false);
  const websocket = useRef<WebSocket | null>(null); //since websocket connected only once, useRef is used over useState

  //useEffect refactored so websocket connected only on render, and not on every time user toggles the connected button

  useEffect(() => {
    //connect to websocket
    websocket.current = new WebSocket(WEBSOCKET_URL);

    websocket.current.onopen = () => {
      websocket.current?.send(JSON.stringify(SUBSCRIPTION_MESSAGE));
    };

    const webSocket = websocket.current;

    return () => {
      //when component unmounts
      webSocket.close();
    };
  }, []);

  useEffect(() => {
    //listen for messages
    if (!websocket.current) return;

    websocket.current.onmessage = (event) => {
      if (!isConnected) return;
      const data = JSON.parse(event.data);
      //retrieve trades of type 'match' and limit to 20 trades
      if (data.type === "match") {
        setTrades((prevTrades) => [data, ...prevTrades].slice(0, 20));
      }
    };
  }, [isConnected]); //only run when isConnected changes

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as "BUY" | "SELL" | "ALL");
  };

  const filteredTrades = trades.filter((trade) => {
    if (filter === "ALL") return true;
    return trade.side === filter.toLowerCase();
  });

  const toggleConnection = () => {
    setIsConnected((prevIsConnected) => !prevIsConnected);
  };

  return (
    <div>
      <h1>Latest Trades for ETH-USD</h1>
      <label htmlFor="filter">Filter: </label>
      <select id="filter" value={filter} onChange={handleFilterChange}>
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
          {filteredTrades.map((trade) => (
            <tr key={trade.trade_id}>
              <td>{trade.trade_id}</td>
              <td>{trade.side.toUpperCase()}</td>
              <td>{trade.price}</td>
              <td>{trade.size}</td>
              <td>{new Date(trade.time).toLocaleTimeString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={toggleConnection}>
        {isConnected ? "Disconnect" : "Connect"}
      </button>
    </div>
  );
}
