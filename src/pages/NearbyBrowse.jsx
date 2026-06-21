import Heading from "../components/Heading";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { getAllEvents } from "../api/api";
import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import DateFilter from "../components/DateFilter";
import GenreFilter from "../components/GenreFilter";
import ShowCard from "../components/ShowCard";
import Switch from "../components/Switch";
import Map from "../components/Map";

function NearbyBrowse() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [dateFilter, setDateFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [pendingDate, setPendingDate] = useState("");
  const [pendingGenre, setPendingGenre] = useState("");
  const [view, setView] = useState("list");
  const [isDisabled, setIsDisabled] = useState(false);

  const page = parseInt(searchParams.get("page") || "1");

  const isInEdinburgh = (lat, lon) => {
    return lat >= 55.9 && lat <= 56.0 && lon >= -3.3 && lon <= -3.1;
  };

  useEffect(() => {
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
        if (!isInEdinburgh(latitude, longitude)) {
          setIsLoading(false);
          return;
        }
        getAllEvents(
          page,
          dateFilter,
          genreFilter,
          latitude,
          longitude,
          "1miles",
          "75",
        ).then((data) => {
          setEvents(data);
          setIsDisabled(data.length === 0);
          setIsLoading(false);
        });
      },
      (error) => {
        console.log("Location error:", error);
        setIsLoading(false);
      },
    );
  }, [page, dateFilter, genreFilter]);

  function handleFilters(e) {
    e.preventDefault();
    setDateFilter(pendingDate);
    setGenreFilter(pendingGenre);
    setShowFilters(false);
  }

  function handleNextPage() {
    setSearchParams({ page: page + 1 });
  }

  function handlePrevPage() {
    setSearchParams({ page: page - 1 });
  }

  return (
    <div className="mt-5 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col gap-5 mt-15">
        <div className="text-center">
          <Heading text="Nearby" />
          <p className="text-gray-600 text-sm mt-2">
            Browse shows on near you today!
          </p>
        </div>
      </div>

      {isLoading ? (
        <Loading />
      ) : !currentLocation ? (
        <Loading />
      ) : isInEdinburgh(currentLocation.latitude, currentLocation.longitude) ? (
        <div>
          <div className="flex mt-3 gap-2">
            <div className="w-3/4">
              <Button
                text={showFilters ? "Hide Filters" : "Filters"}
                onClick={() => setShowFilters((prev) => !prev)}
                className="bg-gray-100 w-full"
                disabled={isDisabled}
              />
            </div>
            <div className="w-1/4 flex items-center">
              <Switch setView={setView} isDisabled={isDisabled} />
            </div>
          </div>
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

          {events.length === 0 ? (
            <div>
              <p className="text-center text-gray-500 mt-10 mb-3">
                No events near you! Try a different day or genre.
              </p>
              <form onSubmit={handleFilters}>
                <div className="flex flex-col gap-3 mt-3 p-4 border border-gray-200 rounded-xl bg-gray-50">
                  <DateFilter
                    setDateFilter={setPendingDate}
                    pendingDate={dateFilter}
                  />
                  <GenreFilter setGenreFilter={setPendingGenre} />
                  <Button
                    text={"Set filters"}
                    type="submit"
                    className="bg-yellow-300 hover:bg-yellow-400"
                  />
                </div>
              </form>
            </div>
          ) : view === "list" ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
              {events.map((event, index) => (
                <ShowCard key={index} event={event} filter={dateFilter} />
              ))}
            </div>
          ) : (
            <div className="mt-5">
              <Map events={events} currentLocation={currentLocation} />
            </div>
          )}

          {view === "list" && (
            <div className="flex gap-3 justify-center mt-5">
              <Button text="<" onClick={handlePrevPage} disabled={page === 1} />
              <span className="self-center">Page {page}</span>
              <Button
                text=">"
                onClick={handleNextPage}
                disabled={events.length < 75}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="text-center mt-10">
          <p>Sorry! This feature is only available if you are in Edinburgh!</p>
        </div>
      )}
    </div>
  );
}

export default NearbyBrowse;
