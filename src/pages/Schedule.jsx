import { useUser } from "../context/UserContext";
import { getSchedule, getEventByCode } from "../api/api";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import Heading from "../components/Heading";
import ScheduleCard from "../components/ScheduleCard";
import PastScheduleCard from "../components/PastScheduleCard";

function Schedule() {
  const { user, token } = useUser();
  const { name, id } = user;
  const [schedule, setSchedule] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const today = new Date();

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
    return new Date(dateString) < today;
  };

  const todayEvents = schedule.filter((event) =>
    isToday(event.performances[0].start),
  );
  const tomorrowEvents = schedule.filter((event) =>
    isTomorrow(event.performances[0].start),
  );
  const thisWeekEvents = schedule.filter((event) =>
    isThisWeek(event.performances[0].start),
  );
  const upcomingEvents = schedule.filter((event) =>
    isUpcoming(event.performances[0].start),
  );
  const pastEvents = schedule.filter((event) =>
    isPast(event.performances[0].start),
  );

  return (
    <div className="mt-5 px-6 mx-auto">
      <div className="flex flex-col gap-5 mt-15">
        <div className="text-center">
          <Heading text="My Schedule" />
          <h1 className="mt-2">Hi {name}! Here's what you have saved!</h1>
        </div>
        <Heading text="Today" />
        <hr className="text-gray-400" />
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {todayEvents.length === 0 ? (
              <p className="text-sm text-neutral-500">
                Nothing scheduled for today
              </p>
            ) : (
              todayEvents.map((event, index) => (
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
        <Heading text="Tomorrow" />
        <hr className="text-gray-400" />
        {isLoading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {tomorrowEvents.length === 0 ? (
              <p className="text-sm text-neutral-500">
                Nothing scheduled for tomorrow
              </p>
            ) : (
              tomorrowEvents.map((event, index) => (
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
        <Heading text="This week" />
        <hr className="text-gray-400" />
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
        <hr className="text-gray-400" />
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
        <hr className="text-gray-400" />
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
    </div>
  );
}

export default Schedule;
