import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { getSchedule, getEventByCode, deleteAccount } from "../api/api";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Heading from "../components/Heading";
import ScheduleCard from "../components/ScheduleCard";
import PastScheduleCard from "../components/PastScheduleCard";
import Button from "../components/Button";
import DailySchedule from "../components/DailySchedule";

function Schedule() {
  const { user, token, logout } = useUser();
  const navigate = useNavigate();
  const { name, id } = user;
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAccountDetails, setShowAccountDetails] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [showDeleteForm, setShowDeleteForm] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [error, setError] = useState("");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  function fetchSchedule() {
    setIsLoading(true);
    getSchedule(id, token)
      .then((data) => {
        return Promise.all(data.map((item) => getEventByCode(item.code)));
      })
      .then((events) => {
        setSchedule(events);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    fetchSchedule();
  }, []);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ latitude, longitude });
      },
      (error) => {
        console.log("Location error:", error);
      },
    );
  }, []);

  // const today = new Date();

  const today = new Date(2026, 7, 19); // 19th August 2026

  const isToday = (dateString) => {
    const date = new Date(dateString);
    return date.toDateString() === today.toDateString();
  };

  const isTomorrow = (dateString) => {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return new Date(dateString).toDateString() === tomorrow.toDateString();
  };

  const isThisWeek = (dateString) => {
    const date = new Date(dateString);
    const weekFromNow = new Date(today);
    weekFromNow.setDate(today.getDate() + 7);
    return (
      date > today &&
      date <= weekFromNow &&
      !isToday(dateString) &&
      !isTomorrow(dateString)
    );
  };

  const isUpcoming = (dateString) => {
    const date = new Date(dateString);
    const weekFromNow = new Date(today);
    weekFromNow.setDate(today.getDate() + 7);
    return date > weekFromNow;
  };

  const isPast = (dateString) => {
    const startOfToday = new Date(today);
    startOfToday.setHours(0, 0, 0, 0);
    return new Date(dateString) < startOfToday;
  };

  const todayEvents = schedule.filter((event) =>
    event.performances.some((p) => isToday(p.start)),
  );
  const tomorrowEvents = schedule.filter((event) =>
    event.performances.some((p) => isTomorrow(p.start)),
  );
  const thisWeekEvents = schedule.filter((event) =>
    event.performances.some((p) => isThisWeek(p.start)),
  );
  const upcomingEvents = schedule.filter((event) =>
    event.performances.some((p) => isUpcoming(p.start)),
  );
  const pastEvents = schedule.filter((event) =>
    event.performances.every((p) => isPast(p.start)),
  );

  const handleAccount = () => {
    setShowAccountDetails(!showAccountDetails);
  };

  const handleDeleteAccount = () => {
    setShowDeleteForm(true);
  };

  const confirmDelete = () => {
    setLoadingDelete(true);
    deleteAccount(user.username, deletePassword)
      .then(() => {
        logout();
        navigate("/");
      })
      .catch(() => {
        setError("Incorrect password. Please try again.");
        setLoadingDelete(false);
      });
  };

  const handleChangePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mt-5 px-6 mx-auto">
      <div className="flex flex-col gap-3 mt-15">
        <div className="text-center">
          <Heading text="My Schedule" />
          <h1 className="mt-2 mb-2 text-gray-600">
            Hi {name}!
            {schedule.length === 0
              ? " You haven't added anything to your schedule yet!"
              : " Here's what you have saved!"}
          </h1>
          <Button
            text="Browse events!"
            className="bg-yellow-300 hover:bg-yellow-400"
            onClick={(e) => {
              navigate("/browse");
            }}
          />
        </div>

        <hr className="text-gray-400" />
        <Heading text="Today" />

        {/* <hr className="text-gray-400" /> */}
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            {todayEvents.length === 0 ? (
              <p className="text-sm text-neutral-500">
                Nothing scheduled for today
              </p>
            ) : (
              <DailySchedule
                events={todayEvents}
                onDelete={fetchSchedule}
                currentLocation={currentLocation}
              />
            )}
          </div>
        )}

        <hr className="text-gray-400" />
        <Heading text="Tomorrow" />
        {/* <hr className="text-gray-400" /> */}
        {isLoading ? (
          <Loading />
        ) : (
          <div className="">
            {tomorrowEvents.length === 0 ? (
              <p className="text-sm text-neutral-500">
                Nothing scheduled for tomorrow
              </p>
            ) : (
              <DailySchedule events={tomorrowEvents} onDelete={fetchSchedule} />
            )}
          </div>
        )}

        <hr className="text-gray-400" />
        <Heading text="This week" />
        {/* <hr className="text-gray-400" /> */}
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {thisWeekEvents.length === 0 ? (
              <p className="text-sm text-neutral-500">
                Nothing scheduled this week
              </p>
            ) : (
              thisWeekEvents.map((event, index) => (
                <ScheduleCard
                  key={index}
                  event={event}
                  onDelete={fetchSchedule}
                />
              ))
            )}
          </div>
        )}

        <hr className="text-gray-400" />
        <Heading text="Upcoming" />
        {/* <hr className="text-gray-400" /> */}
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
            {upcomingEvents.length === 0 ? (
              <p className="text-sm text-neutral-500">Nothing upcoming</p>
            ) : (
              upcomingEvents.map((event, index) => (
                <ScheduleCard
                  key={index}
                  event={event}
                  onDelete={fetchSchedule}
                />
              ))
            )}
          </div>
        )}
        <hr className="text-gray-400" />
        <Heading text="Past" />
        {/* <hr className="text-gray-400" /> */}
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {pastEvents.length === 0 ? (
              <p className="text-sm text-neutral-500">No past shows</p>
            ) : (
              pastEvents.map((event, index) => (
                <PastScheduleCard
                  key={index}
                  event={event}
                  onDelete={fetchSchedule}
                />
              ))
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-5 mt-10">
        <Button text="Account details" onClick={handleAccount} />
        {showAccountDetails && (
          <div className="grid gap-3 mt-3 p-4 border border-gray-200 rounded-xl bg-gray-50 grid-cols-2 items-center">
            <p>Username:</p>
            <p>{user.username}</p>
            <p>Email:</p>
            <p>{user.email}</p>

            <Button
              text={"Change password"}
              type="submit"
              className="bg-yellow-300 hover:bg-yellow-400 col-span-2"
              onClick={handleChangePassword}
            />
            <Button
              text={"Delete account"}
              className="bg-red-300 hover:bg-red-400 col-span-2"
              onClick={handleDeleteAccount}
            />
            {showDeleteForm && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  confirmDelete();
                }}
                className="mt-3 p-4 border border-red-200 rounded-xl bg-red-50 flex flex-col gap-3 col-span-2"
              >
                <p className="text-sm font-bold text-red-600">
                  Enter your password to confirm deletion:
                </p>
                <input
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 text-sm"
                  placeholder="Password"
                  required
                />
                {error && <p className="text-red-600 text-xs">{error}</p>}
                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={loadingDelete}
                    className="bg-red-400 hover:bg-red-500 text-white text-sm px-4 py-2 rounded-lg disabled:opacity-50"
                  >
                    {loadingDelete ? "Deleting..." : "Confirm Delete"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDeleteForm(false)}
                    className="bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Schedule;
