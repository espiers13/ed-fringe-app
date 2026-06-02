import Heading from "../components/Heading";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import ShowCard from "../components/ShowCard";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllEvents } from "../api/api";

function Browse() {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents()
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }, []);

  return (
    <div className="mt-5 px-6 mx-auto">
      <div className="text-center flex flex-col gap-5 mt-15">
        <Heading text="Find something to watch" />
        <p className="text-gray-600 text-sm">
          Search for a specific show, browse all shows, or filter shows by
          genre!
        </p>
        <SearchBar />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
        {events.map((event, index) => (
          <ShowCard key={index} event={event} />
        ))}
      </div>
    </div>
  );
}

export default Browse;
