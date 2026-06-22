import Heading from "../components/Heading";
import Loading from "../components/Loading";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";
import ShowCard from "../components/ShowCard";
import DateFilter from "../components/DateFilter";
import GenreFilter from "../components/GenreFilter";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllEvents, searchEvents, getSchedule } from "../api/api";
import { useUser } from "../context/UserContext";

function Browse() {
  const { user, token } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [pendingDate, setPendingDate] = useState("");
  const [pendingGenre, setPendingGenre] = useState("");
  const [schedule, setSchedule] = useState([]);

  const page = parseInt(searchParams.get("page") || "1");
  const searchQuery = searchParams.get("query") || "";

  useEffect(() => {
    setIsLoading(true);
    const fetchData = searchQuery
      ? searchEvents(searchQuery)
      : getAllEvents(page, dateFilter, genreFilter);

    setIsSearch(!!searchQuery);

    fetchData
      .then((data) => {
        setEvents(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error:", err);
        setIsLoading(false);
      });
  }, [page, searchQuery, dateFilter, genreFilter]);

  useEffect(() => {
    if (user && token) {
      getSchedule(user.id, token).then((data) => {
        setSchedule(data ?? []);
      });
    }
  }, [user, token]);

  function handleSearch(query) {
    setSearchParams({ query, page: 1 });
  }

  function handleFilters(e) {
    e.preventDefault();
    setDateFilter(pendingDate);
    setGenreFilter(pendingGenre);
    setShowFilters(false);
  }
  function handleNextPage() {
    setSearchParams({ query: searchQuery, page: page + 1 });
  }

  function handlePrevPage() {
    setSearchParams({ query: searchQuery, page: page - 1 });
  }

  return (
    <div className="mt-5 px-6 mx-auto">
      <div className="flex flex-col gap-5 mt-15">
        <div className="text-center">
          <Heading text="Find something to watch" />
          <p className="text-gray-600 text-sm mt-2">
            Search for a specific show, browse all shows, or filter shows by
            genre or date!
          </p>
        </div>

        <SearchBar onSearch={handleSearch} defaultValue={searchQuery} />
        <div className="flex flex-col">
          <Button
            text={showFilters ? "Hide Filters" : "Filters"}
            onClick={() => setShowFilters((prev) => !prev)}
            className="bg-gray-100"
          />
          {showFilters && (
            <form onSubmit={handleFilters}>
              <div className="flex flex-col gap-3 mt-3 p-4 border border-gray-200 rounded-xl bg-gray-50">
                <DateFilter setDateFilter={setPendingDate} />
                <GenreFilter setGenreFilter={setPendingGenre} />
                <Button
                  text={"Set filters"}
                  type="submit"
                  className="bg-yellow-300 hover:bg-yellow-400"
                />
              </div>
            </form>
          )}
        </div>
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
          {events.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
              {events.map((event, index) => (
                <ShowCard
                  key={index}
                  event={event}
                  filter={dateFilter}
                  schedule={schedule}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 mt-10">0 events found.</p>
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
