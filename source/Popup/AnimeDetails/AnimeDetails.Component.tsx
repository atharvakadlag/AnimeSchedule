import React, { useEffect, useState } from "react";
import { AnimeStatus, IAnimeDetails } from "../../Models/AnimeDetails";
import {convertToCurrentTime, createAlarm, fetchAndSetAnimeDetails} from "./AnimeDetails.Services";
import {
  DateRangeOutlined,
  NotificationsOutlined,
  ScheduleOutlined,
  VideocamOutlined,
} from "@mui/icons-material";

interface AnimeDetailsProps {
  animeId: number;
}

const AnimeDetails: React.FC<AnimeDetailsProps> = ({ animeId }) => {
  const [animeDetails, setAnimeDetails] = useState<IAnimeDetails | null>(null);

  useEffect(() => {
    fetchAndSetAnimeDetails(animeId, setAnimeDetails);
  }, [animeId]);

  if (!animeDetails) {
    return <div>Loading...</div>;
  }

  console.log(animeDetails);

  const formattedStartDate = new Date(
    animeDetails?.start_date,
  ).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  const formattedEndDate = new Date(animeDetails?.end_date).toLocaleDateString(
    "en-US",
    { month: "short", year: "numeric" },
  );

  const targetDate = convertToCurrentTime(animeDetails?.broadcast?.day_of_the_week, animeDetails?.broadcast?.start_time);
  const broadcastTime = targetDate.toLocaleString('en-US', { weekday: 'long', hour: 'numeric', minute: 'numeric' });

  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="flex items-center mb-8">
        <img
          src={animeDetails?.main_picture?.medium}
          alt={animeDetails?.title}
          className="w-24 h-24 mr-4 rounded-md"
        />
        <div>
          <h1 className="text-xl font-bold ">{animeDetails?.title}</h1>
          <p className="text-sm text-gray-500 mb-2">
            {animeDetails?.alternative_titles?.en}
          </p>
          <p className="text-sm text-gray-500">
            {animeDetails?.alternative_titles?.ja}
          </p>
        </div>
      </div>
      <button 
      className={"rounded border border-gray-400 bg-white px-2 py-1 font-semibold text-gray-800 shadow hover:bg-gray-100 " + (animeDetails.status == AnimeStatus.Finished ? "opacity-50 cursor-not-allowed" : "")}
      onClick={(_) => createAlarm(targetDate, animeId)}
      disabled={animeDetails.status == AnimeStatus.Finished}
      title={animeDetails.status == AnimeStatus.Finished ? "All episodes released. Cannot enable notification" : "Enable notification for weekly episode release"}
      >
        <div className="flex items-center">
          <span><NotificationsOutlined/></span>
          <span>Enable Notification</span>
        </div>
      </button>
      <div className="flex ">
        <div>
          <h2 className="text-lg font-bold mb-2">Synopsis</h2>
          <p className="text-sm text-gray-700 h-36 overflow-hidden">{animeDetails?.synopsis}</p>
        </div>
        <div className="mb-2 min-w-44 pt-10 ml-2">
          <p className="flex items-center text-sm text-gray-500 mb-2">
            <DateRangeOutlined />
            <span className="ml-2">
              {formattedStartDate} - {formattedEndDate}
            </span>
          </p>
          <p className="flex items-center text-sm text-gray-500 mb-2">
            <ScheduleOutlined />
            <span className="ml-2">
              {broadcastTime}
            </span>
          </p>
          <p className="flex items-center text-sm text-gray-500 mb-2">
            <VideocamOutlined />
            <span className="ml-2">{animeDetails?.num_episodes}</span>
          </p>
          <a 
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold rounded w-20"
          href={`https://myanimelist.net/anime/${animeId}/`}
          >
            <img src="/assets/MAL_icon.png" alt="Image" className="w-20 h-6 rounded" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
