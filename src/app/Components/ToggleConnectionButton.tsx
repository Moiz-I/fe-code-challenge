import { FC } from "react";

interface ToggleConnectionButtonProps {
  toggleConnection: () => void;
  isConnected: boolean;
}

const ToggleConnectionButton: FC<ToggleConnectionButtonProps> = ({
  toggleConnection,
  isConnected,
}) => {
  return (
    <button
      onClick={toggleConnection}
      className={`text-white font-semibold py-2 px-4 mr-3 rounded flex ${
        isConnected
          ? "bg-red-500 hover:bg-red-700"
          : "bg-green-500 hover:bg-green-700"
      }`}
    >
      {isConnected ? "Disconnect" : "Connect"}
    </button>
  );
};

export default ToggleConnectionButton;
