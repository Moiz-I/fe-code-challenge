"use client"; //required to mark as client side code in NextJS 13

import React, { useEffect, useRef, useState } from "react";
import Trade from "../..//types/Trade";
import Table from "./Components/Table";
import ToggleConnectionButton from "./Components/ToggleConnectionButton";
import TradeFilter from "./Components/TradeFilter";

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
    <div className="mt-2 flex flex-col p-10 items-center">
      <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
        <h1 className="text-lg font-semibold px-8">
          Latest Trades for ETH-USD
        </h1>
        <Table filteredTrades={filteredTrades} />
        <div className="flex flex-row justify-end px-10">
          <ToggleConnectionButton
            toggleConnection={toggleConnection}
            isConnected={isConnected}
          />
          <TradeFilter
            filter={filter}
            handleFilterChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
}
