import Button from "./Button";
import { removeFromSchedule } from "../api/api";
import { useUser } from "../context/UserContext";

function PastScheduleCard({ event, onDelete }) {
  const {
    artist,
    title,
    genre,
    performance_space,
    images,
    venue,
    disabled,
    code,
    performances,
    website,
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

  const image = Object.values(images)?.[0]?.versions?.["thumb-100"]?.url;

  function deleteEvent() {
    removeFromSchedule(user.id, token, code).then(() => {
      onDelete();
    });
  }

  return (
    <div className="bg-neutral-100 flex flex-col p-1 rounded-xl border border-neutral-300 shadow-sm gap-2 overflow-hidden opacity-50">
      <div className="relative">
        {image && <img className="w-full" src={image} alt={title} />}
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
      <div className="flex justify-center mt-auto">
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

export default PastScheduleCard;
