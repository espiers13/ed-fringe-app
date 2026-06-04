import { removeFromSchedule } from "../api/api";
import { useUser } from "../context/UserContext";

function DailySchedule({ events, onDelete }) {
  const { user, token } = useUser();
  if (!events || events.length === 0) {
    return <p className="text-sm text-neutral-500">Nothing scheduled</p>;
  }
  const toMinutes = (dateStr) => {
    const d = new Date(dateStr);
    return d.getHours() * 60 + d.getMinutes();
  };

  const starts = events.map((e) => toMinutes(e.performances[0].start));
  const ends = events.map((e) => toMinutes(e.performances[0].end));
  const minHour = Math.floor(Math.min(...starts) / 60);
  const maxHour = Math.ceil(Math.max(...ends) / 60);

  const HOUR_HEIGHT = 60;

  const hours = Array.from(
    { length: maxHour - minHour + 1 },
    (_, i) => minHour + i,
  );

  const getColumns = (evs) => {
    const cols = [];
    evs.forEach((ev) => {
      const s = toMinutes(ev.performances[0].start);
      const e = toMinutes(ev.performances[0].end);
      let placed = false;
      for (let c = 0; c < cols.length; c++) {
        const lastEnd = toMinutes(
          cols[c][cols[c].length - 1].performances[0].end,
        );
        if (s >= lastEnd) {
          cols[c].push(ev);
          placed = true;
          break;
        }
      }
      if (!placed) cols.push([ev]);
    });
    return cols;
  };

  const cols = getColumns(events);
  const totalCols = cols.length;

  const getGenreColour = (genre) => {
    const genres = {
      Comedy: { bg: "#EEEDFE", border: "#534AB7", text: "#3C3489" },
      Music: { bg: "#E1F5EE", border: "#0F6E56", text: "#085041" },
      Theatre: { bg: "#FAECE7", border: "#993C1D", text: "#712B13" },
      Dance: { bg: "#FBEAF0", border: "#993556", text: "#72243E" },
      "Spoken Word": { bg: "#E6F1FB", border: "#185FA5", text: "#0C447C" },
      Cabaret: { bg: "#FAEEDA", border: "#854F0B", text: "#633806" },
      "Children's Shows": { bg: "#EAF3DE", border: "#3B6D11", text: "#27500A" },
      Exhibition: { bg: "#FCEBEB", border: "#A32D2D", text: "#791F1F" },
    };
    return (
      genres[genre] || { bg: "#F1EFE8", border: "#5F5E5A", text: "#444441" }
    );
  };

  const handleDelete = (code) => {
    removeFromSchedule(user.id, token, code).then(() => {
      onDelete();
    });
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex" style={{ minWidth: "400px" }}>
        <div className="shrink-0 w-12">
          {hours.map((h) => (
            <div
              key={h}
              className="flex items-start justify-end pr-2 text-xs text-neutral-400"
              style={{ height: HOUR_HEIGHT }}
            >
              {h.toString().padStart(2, "0")}:00
            </div>
          ))}
        </div>

        {/*events area*/}
        <div
          className="flex-1 relative"
          style={{ height: (maxHour - minHour + 1) * HOUR_HEIGHT }}
        >
          {hours.map((h) => (
            <div
              key={h}
              className="border-t border-neutral-200"
              style={{ height: HOUR_HEIGHT }}
            />
          ))}

          {cols.map((col, ci) =>
            col.map((ev, ei) => {
              const s = toMinutes(ev.performances[0].start);
              const e = toMinutes(ev.performances[0].end);
              const top = s - minHour * 60;
              const height = Math.max(e - s - 4, 20);
              const startH = Math.floor(s / 60)
                .toString()
                .padStart(2, "0");
              const startM = (s % 60).toString().padStart(2, "0");
              const endH = Math.floor(e / 60)
                .toString()
                .padStart(2, "0");
              const endM = (e % 60).toString().padStart(2, "0");

              const colour = getGenreColour(ev.genre);

              return (
                <div
                  key={`${ci}-${ei}`}
                  className="absolute rounded-lg p-1.5 overflow-hidden text-xs border"
                  style={{
                    top,
                    height,
                    left: `calc(${(ci / totalCols) * 100}% + 2px)`,
                    width: `calc(${(1 / totalCols) * 100}% - 8px)`,
                    background: colour.bg,
                    borderColor: colour.border,
                    color: colour.text,
                  }}
                >
                  <button
                    className="absolute top-1 right-1 text-[10px] leading-none opacity-50 hover:opacity-100"
                    onClick={() => handleDelete(ev.code)}
                  >
                    ✕
                  </button>
                  <p className="font-medium truncate">
                    {ev.title.replace("FAKE ", "")}
                  </p>
                  <p className="truncate opacity-75 text-[10px]">
                    {startH}:{startM}–{endH}:{endM}
                  </p>
                  <p className="truncate opacity-75 text-[10px]">
                    {ev.venue.name.replace("DEMO: ", "")}
                  </p>
                  <p className="truncate opacity-75 text-[10px]">
                    {ev.artist.replace("DEMO: ", "")}
                  </p>
                </div>
              );
            }),
          )}
        </div>
      </div>
    </div>
  );
}

export default DailySchedule;
