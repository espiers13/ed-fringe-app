import { useState } from "react";

function DateFilter({ setDateFilter }) {
  const [selected, setSelected] = useState("");
  const [pickedDate, setPickedDate] = useState("");

  function handleChange(e) {
    setSelected(e.target.value);
    setDateFilter(e.target.value);
    if (e.target.value !== "pick") setPickedDate("");
  }

  const today = new Date().toISOString().split("T")[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split("T")[0];

  return (
    <div>
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <select
          value={selected}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-xl text-sm text-gray-600 bg-white focus:ring-1 focus:ring-gray-300 pl-9"
        >
          <option value="">Anytime</option>
          <option value={today}>Today</option>
          <option value={tomorrow}>Tomorrow</option>

          <option value="pick">
            {pickedDate ? pickedDate : "Pick a date"}
          </option>
        </select>
      </div>
      {selected === "pick" && (
        <input
          type="date"
          min="2026-08-01"
          max="2026-08-31"
          required
          className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:ring-1 focus:ring-gray-300 focus:outline-none mt-1"
          onChange={(e) => {
            setSelected("pick");
            setPickedDate(e.target.value);
            setDateFilter(e.target.value);
          }}
        />
      )}
    </div>
  );
}

export default DateFilter;
