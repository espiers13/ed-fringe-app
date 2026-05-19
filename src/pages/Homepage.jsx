import Heading from "../components/Heading";
import Button from "../components/Button";
import SearchBar from "../components/SearchBar";

function Homepage() {
  function browseClick() {
    console.log("browse");
  }

  function nearbyClick() {
    console.log("nearby");
  }

  function scheduleClick() {
    console.log("schedule");
  }

  return (
    <main className="mt-5 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col gap-5 mt-6 text-center">
          <Heading text="Find something to watch" />
          <p className="text-gray-600 text-sm">
            Search for a specific show, browse all shows, or click Nearby to see
            what's near you now!
          </p>
          <SearchBar />
          <div className="grid grid-cols-2 gap-3">
            <Button text="Browse" onClick={browseClick} />
            <Button text="Nearby" onClick={nearbyClick} />
            <Button
              text="My Schedule"
              onClick={scheduleClick}
              className="col-span-2"
            />
          </div>
        </div>

        <img
          src="public/stock-img-1.jpg"
          className="rounded-xl w-full object-cover"
        />
      </div>
    </main>
  );
}

export default Homepage;
