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

  const formatTime = (dateString) =>
    new Date(dateString).toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const firstDate = new Date(performances[0].start).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
  });
  const lastDate = new Date(
    performances[performances.length - 1].start,
  ).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
  });

  const allSameTime = performances.every(
    (p) => formatTime(p.start) === formatTime(performances[0].start),
  );

  const timeDisplay = allSameTime
    ? formatTime(performances[0].start)
    : "Times vary";

  const image = Object.values(images)?.[0]?.versions?.["square-150"]?.url;

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
      <div className="flex justify-center">
        {image && <img className="w-40" src={image} alt={title} />}
      </div>

      <span className="self-center text-xs bg-neutral-300 px-2 py-0.5 rounded-xl">
        {genre}
      </span>

      <a
        className="font-bold text-black-500 text-center hover:underline"
        href={website}
        target="_blank"
        rel="noopener noreferrer"
      >
        {title}
      </a>
      <p className="text-xs italic text-center">{artist}</p>
      <div className="bg-neutral-200 p-2 rounded-sm mt-auto">
        <a
          className="flex gap-0.5 items-center hover:underline"
          href={venue.web_address}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="font-bold text-sm">{venue.code}</p>
          <p className="text-xs line-clamp-1">{venue.name}</p>
          <p className="text-xs line-clamp-1 hidden md:block ml-auto text-neutral-500">
            {performance_space.name}
          </p>
        </a>
        <hr className="my-1 border-neutral-400 border-0.5" />
        <p className="text-xs">
          {firstDate === lastDate ? firstDate : `${firstDate} – ${lastDate}`}
          {" | "}
          {timeDisplay}
        </p>
        <hr className="my-1 border-neutral-400 border-0.5" />
        <p className="text-xs md:hidden">{performance_space.name}</p>
        <hr className="my-1 border-neutral-400 border-0.5 md:hidden" />
        <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-2">
          <p className="text-xs">Accessibility:</p>
          {performance_space.wheelchair_access ||
          disabled.audio ||
          disabled.captioning ||
          disabled.signed ? (
            <div className="flex gap-2 items-center flex-wrap">
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
            </div>
          ) : (
            <p className="text-xs">N/A</p>
          )}
        </div>
      </div>
      <div className="flex gap-1 justify-center">
        <button
          className="bg-yellow-300 p-2 w-full hover:bg-yellow-400 text-xs rounded-xl"
          onClick={seeMore}
        >
          See More
        </button>
        <button
          className="bg-yellow-300 p-2 w-full hover:bg-yellow-400 text-xs rounded-xl"
          onClick={deleteEvent}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default ScheduleCard;
