import Heading from "../components/Heading";
import Button from "../components/Button";

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
    <main className="mt-5">
      <div className="text-center">
        <img src="public/stock-img-1.jpg" className="rounded-xl" />
        {/* <Heading text="Homepage" /> */}
        <div className="grid grid-cols-2 gap-5 w-fit mx-auto mt-5">
          <Button text="Browse" onClick={browseClick} />
          <Button text="Nearby" onClick={nearbyClick} />
          <Button
            text="My Schedule"
            onClick={scheduleClick}
            className="col-span-2"
          />
        </div>
      </div>
    </main>
  );
}

export default Homepage;
