import Button from "./Button";
import { useState } from "react";
import { addToSchedule, removeFromSchedule } from "../api/api";
import { useUser } from "../context/UserContext";

function ShowCard({ event, filter }) {
  const [isAdded, setIsAdded] = useState(false);
  const [message, setMessage] = useState("");
  const { user, token } = useUser();
  const {
    artist,
    title,
    genre,
    performance_space,
    description,
    images,
    website,
    venue,
    disabled,
    performances,
    code,
  } = event;

  const formatTime = (dateString) =>
    new Date(dateString).toLocaleString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatDateTime = (dateString) =>
    new Date(dateString).toLocaleString("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  const image = Object.values(images)?.[0]?.versions?.["thumb-100"]?.url;

  function seeMore() {
    window.open(website, "_blank");
  }

  function showMessage(text) {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  }

  function addEvent() {
    addToSchedule(user.id, token, code).then(() => {
      setIsAdded(true);
      showMessage("Added! ✓");
    });
  }

  function removeEvent() {
    removeFromSchedule(user.id, token, code).then(() => {
      setIsAdded(false);
      showMessage("Removed!");
    });
  }
  return (
    <div className="bg-neutral-100 flex flex-col p-3 rounded-xl border border-neutral-300 shadow-sm gap-2 overflow-hidden">
      <div className="relative">
        {image && <img className="w-50 mx-auto" src={image} alt={title} />}
        {message && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg animate-fade">
            <p className="text-white font-bold text-sm">{message}</p>
          </div>
        )}
        <button
          onClick={isAdded ? removeEvent : addEvent}
          className="group absolute top-2 right-2 bg-white/70 hover:bg-white p-1.5 rounded-full transition-colors duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 h-4 stroke-red-500 transition-colors duration-200 ${isAdded ? "fill-red-500" : "fill-transparent group-hover:fill-red-500"}`}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </div>

      <span className="self-center text-xs bg-neutral-300 px-2 py-0.5 rounded-xl">
        {genre}
      </span>

      <p className="font-bold text-black-500 text-center text-sm">{title}</p>
      <p className="text-xs italic text-center">{artist}</p>
      <p className="text-xs line-clamp-10 min-w-0">{description}</p>
      <a
        className="bg-neutral-200 p-2 rounded-sm mt-auto"
        href={venue.web_address}
      >
        <div className="flex gap-0.5 items-center">
          <p className="font-bold text-sm">{venue.code}</p>
          <p className="text-xs line-clamp-1">{venue.name}</p>

          <p className="text-xs line-clamp-1 hidden md:block ml-auto text-neutral-500">
            {performance_space.name}
          </p>
        </div>
        <hr className="my-1 border-neutral-400 border-0.5 md:hidden" />
        <div className="flex flex-col gap-0.5">
          {filter === "today" ? (
            performances.map((p, i) => (
              <p key={i} className="text-xs">
                {formatTime(p.start)}
              </p>
            ))
          ) : (
            <p className="text-xs">
              {formatDateTime(performances[0].start)}
              {performances.length > 1 &&
                ` – ${formatDateTime(performances[performances.length - 1].start)}`}
            </p>
          )}
        </div>
        <hr className="my-1 border-neutral-400 border-0.5" />
        <p className="text-xs md:hidden">{performance_space.name}</p>

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
          text={isAdded ? "Remove" : "Add to Schedule"}
          className="bg-yellow-300 hover:bg-yellow-400 text-xs"
          onClick={isAdded ? removeEvent : addEvent}
        />
      </div>
    </div>
  );
}

export default ShowCard;
