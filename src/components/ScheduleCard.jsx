import Button from "./Button";
import { removeFromSchedule } from "../api/api";
import { useUser } from "../context/UserContext";

function ScheduleCard({ event, onDelete }) {
  const {
    artist,
    title,
    genre,
    performance_space,
    images,
    website,
    venue,
    disabled,
    code,
    performances,
  } = event;
  const { start, end } = performances[0];
  const { user, token } = useUser();

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const image = Object.values(images)?.[0]?.versions?.["thumb-100"]?.url;

  function seeMore() {
    window.location.href = website;
  }

  function deleteEvent() {
    removeFromSchedule(user.id, token, code).then(() => {
      onDelete();
    });
  }

  return (
    <div className="bg-neutral-100 flex flex-col p-1 rounded-xl border border-neutral-300 shadow-sm gap-2 overflow-hidden">
      <div className="relative">
        {image && <img className="w-full" src={image} alt={title} />}
      </div>

      <span className="self-center text-xs bg-neutral-300 px-2 py-0.5 rounded-xl">
        {genre}
      </span>

      <h1 className="font-bold text-black-500 text-center">
        {title.replace("FAKE ", "")}
      </h1>
      <p className="text-xs italic text-center">
        {artist.replace("DEMO: ", "")}
      </p>
      <a
        className="bg-neutral-200 p-2 rounded-sm mt-auto"
        href={venue.web_address}
      >
        <div className="flex gap-0.5 items-center">
          <p className="font-bold text-sm">{venue.code}</p>
          <p className="text-xs line-clamp-1">
            {venue.name.replace("DEMO: ", "")}
          </p>
          <p className="text-xs line-clamp-1 hidden md:block ml-auto text-neutral-500">
            {performance_space.name.replace("DEMO: ", "")}
          </p>
        </div>
        <hr className="my-1 border-neutral-400 border-0.5" />
        <p className="text-xs">
          {formatDateTime(start)} - {formatDateTime(end)}
        </p>
        <hr className="my-1 border-neutral-400 border-0.5" />
        <p className="text-xs md:hidden">
          {performance_space.name.replace("DEMO: ", "")}
        </p>
        <hr className="my-1 border-neutral-400 border-0.5 md:hidden" />
        <div className="flex gap-2 items-center">
          <p className="text-xs">Accessibility:</p>
          {performance_space.wheelchair_access && (
            <p className="text-xs bg-neutral-300 rounded-2xl p-1 font-bold">
              WC
            </p>
          )}
          {disabled.audio && (
            <p className="text-xs bg-neutral-300 rounded-2xl p-1 font-bold">
              AD
            </p>
          )}
          {disabled.captioning && (
            <p className="text-xs bg-neutral-300 rounded-2xl p-1 font-bold">
              CC
            </p>
          )}
          {disabled.signed && (
            <p className="text-xs bg-neutral-300 rounded-2xl p-1 font-bold">
              BSL
            </p>
          )}
          {!performance_space.wheelchair_access &&
            !disabled.audio &&
            !disabled.captioning &&
            !disabled.signed && <p className="text-xs">N/A</p>}
        </div>
      </a>
      <div className="flex gap-1 justify-center">
        <Button
          text="See More"
          className="bg-yellow-300 hover:bg-yellow-400 text-xs"
          onClick={seeMore}
        />
        <Button
          text="Remove"
          className="bg-yellow-300 hover:bg-yellow-400 text-xs"
          onClick={deleteEvent}
        />
      </div>
    </div>
  );
}

export default ScheduleCard;
