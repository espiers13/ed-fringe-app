import { useState } from "react";
import listIcon from "../assets/listIcon.svg";
import mapIcon from "../assets/mapIcon.svg";

function Switch({ setView, isDisabled }) {
  const [button, setButton] = useState("list");

  const mapClick = () => {
    setButton("map");
    setView("map");
  };

  const listClick = () => {
    setButton("list");
    setView("list");
  };

  return (
    <div className="flex rounded-lg border border-gray-300 overflow-hidden">
      <button
        className={`flex items-center gap-1.5 px-4 py-2 text-sm transition-colors disabled:opacity-20 ${
          button === "list"
            ? "bg-yellow-300 font-medium"
            : "bg-white text-gray-500 hover:bg-gray-50"
        }`}
        onClick={listClick}
        disabled={isDisabled}
      >
        <img src={listIcon} className="w-4 h-4" />
        <span className="hidden sm:inline">List</span>
      </button>
      <button
        className={`flex items-center gap-1.5 px-4 py-2 text-sm transition-colors disabled:opacity-20 ${
          button === "map"
            ? "bg-yellow-300 font-medium"
            : "bg-white text-gray-500 hover:bg-gray-50"
        }`}
        onClick={mapClick}
        disabled={isDisabled}
      >
        <img src={mapIcon} className="w-4 h-4" />
        <span className="hidden sm:inline">Map</span>
      </button>
    </div>
  );
}

export default Switch;
