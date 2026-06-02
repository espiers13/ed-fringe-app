import { useState } from "react";

function GenreFilter({ setGenreFilter }) {
  const [selected, setSelected] = useState("");
  const genres = [
    "Cabaret and Variety",
    "Children's Shows",
    "Comedy",
    "Dance, Physical Theatre & Circus",
    "Events",
    "Exhibitions",
    "Music",
    "Musicals and Opera",
    "Spoken Word",
    "Theatre",
  ];

  function handleChange(e) {
    setSelected(e.target.value);
    setGenreFilter(e.target.value);
  }

  return (
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
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"
          />
        </svg>
      </div>
      <select
        value={selected}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-xl text-sm text-gray-600 bg-white focus:ring-1 focus:ring-gray-300 focus:outline-none pl-9"
      >
        <option value="">Any genre</option>
        {genres.map((item, index) => (
          <option value={item} key={index}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreFilter;
