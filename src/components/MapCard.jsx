import { useUser } from "../context/UserContext";
import { addToSchedule, removeFromSchedule } from "../api/api";
import { useState } from "react";

function MapCard({ event }) {
  const [isAdded, setIsAdded] = useState(false);
  const [message, setMessage] = useState("");
  const { user, token } = useUser();
  const image = Object.values(event.images)?.[0]?.versions?.["thumb-100"]?.url;

  const { genre_tags } = event;

  function showMessage(text) {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  }

  function addEvent() {
    addToSchedule(user.id, token, event.code).then(() => {
      setIsAdded(true);
      showMessage("Added! ✓");
    });
  }

  function removeEvent() {
    removeFromSchedule(user.id, token, event.code).then(() => {
      setIsAdded(false);
      showMessage("Removed!");
    });
  }

  return (
    <div className="flex flex-col p-1 gap-1 overflow-hidden text-center">
      <a
        href={event.website}
        target="_blank"
        rel="noreferrer"
        className="font-bold hover:underline"
      >
        <img src={image} className="w-25 mx-auto mb-2" />
        {event.title}
      </a>
      {message && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg animate-fade">
          <p className="text-white font-bold text-sm">{message}</p>
        </div>
      )}
      <span className="self-center text-xs bg-neutral-300 px-2 py-0.5 rounded-xl">
        {event.genre}
      </span>
      <p className="text-xs italic">{event.artist}</p>

      <p className="text-xs">{genre_tags}</p>
      <a
        href={event.venue.web_address}
        target="_blank"
        rel="noreferrer"
        className="text-xs hover:underline"
      >
        {event.venue.name}
      </a>
      <button className="mt-1" onClick={isAdded ? removeEvent : addEvent}>
        <span className="self-center text-xs bg-yellow-300 px-2 py-1 rounded-xl hover:bg-yellow-400 transition-colors duration-200">
          {isAdded ? "Remove" : "Add to Schedule"}
        </span>
      </button>
    </div>
  );
}

export default MapCard;
