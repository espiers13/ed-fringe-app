import Button from "./Button";
import { useState } from "react";

function SearchBar({ className = "" }) {
  const [query, setQuery] = useState("");

  function searchQuery(e) {
    setQuery(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(query);
  }

  return (
    <form className={`${className}`}>
      <label
        htmlFor="search"
        className="block mb-2.5 text-sm font-medium text-heading sr-only "
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-body"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="search"
          className="block w-full p-3 ps-9 border border-gray-500 text-black-500 text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
          placeholder="Search"
          onChange={searchQuery}
          required
        />
        <Button
          type="submit"
          className="absolute end-1.5 bottom-1 top-1 bg-yellow-300 hover:bg-yellow-400"
          text={"Search"}
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
}

export default SearchBar;
