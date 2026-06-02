import Heading from "../components/Heading";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import ShowCard from "../components/ShowCard";
import Loading from "../components/Loading";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllEvents, searchEvents } from "../api/api";

function Browse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const page = parseInt(searchParams.get("page") || "1");
  const searchQuery = searchParams.get("query") || "";

  useEffect(() => {
    setIsLoading(true);
    const fetchData = searchQuery
      ? searchEvents(searchQuery)
      : getAllEvents(page);

    setIsSearch(!!searchQuery);

    fetchData
      .then((data) => {
        setEvents(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }, [page, searchQuery]);

  function handleSearch(query) {
    setSearchParams({ query, page: 1 });
  }

  function handleNextPage() {
    setSearchParams({ query: searchQuery, page: page + 1 });
  }

  function handlePrevPage() {
    setSearchParams({ query: searchQuery, page: page - 1 });
  }

  return (
    <div className="mt-5 px-6 mx-auto">
      <div className="text-center flex flex-col gap-5 mt-15">
        <Heading text="Find something to watch" />
        <p className="text-gray-600 text-sm">
          Search for a specific show, browse all shows, or filter shows by
          genre!
        </p>
        <SearchBar onSearch={handleSearch} defaultValue={searchQuery} />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {isSearch && (
            <div className="text-center flex flex-col gap-2 mt-4">
              <p className="text-lg text-black-500 font-bold">
                Shows that match your search
              </p>
              <p className="text-gray-600 text-sm">
                {events.length} shows found
              </p>
            </div>
          )}
          {events.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
              {events.map((event, index) => (
                <ShowCard key={index} event={event} />
              ))}
            </div>
          )}
          <div className="flex gap-3 justify-center mt-5">
            <Button text="<" onClick={handlePrevPage} disabled={page === 1} />
            <span className="self-center">Page {page}</span>
            <Button
              text=">"
              onClick={handleNextPage}
              disabled={events.length < 25}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Browse;
