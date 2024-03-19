import { Notifications, browser } from "webextension-polyfill-ts";
import IAnimeDetails from "../../Models/AnimeDetails";

const fetchAndSetAnimeDetails = async (
  animeId: number | string,
  setAnimeDetails: React.Dispatch<React.SetStateAction<IAnimeDetails | null>>,
) => {
  try{
    const data = await fetchAnimeDetails(animeId);
    setAnimeDetails(data);
  } catch (error) {
    console.error("Error fetching anime details:", error);
  }
};

const fetchAnimeDetails = async (
  animeId: number | string,
) => {
  const response = await fetch(
    `https://api.myanimelist.net/v2/anime/${animeId}?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,media_type,status,num_episodes,start_season,broadcast,rating`,
    {
      headers: {
        "X-MAL-CLIENT-ID": "0d0914d55fc27f6c6cf3c306b4a69af1",
      },
    },
  );
  return await response.json();
};



const convertToCurrentTime = (dayOfWeek: string, time: string) => {
  // Get the current date in the user's local time zone
  const currentDate = new Date();

  // Get the day index of the current date
  const currentDayIndex = currentDate.getDay();

  // Map the day of the week from the input to the current day index
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const targetDayIndex = days.indexOf(dayOfWeek);

  // Calculate the difference in days between the target day and the current day
  const daysDifference = targetDayIndex - currentDayIndex;
  // Adjust for negative difference (e.g., if target day is earlier in the week than current day)
  const adjustedDifference = daysDifference >= 0 ? daysDifference : daysDifference + 7;

  // Calculate the target date by adding the adjusted difference in days to the current date
  const targetDate = new Date(currentDate);
  targetDate.setDate(currentDate.getDate() + adjustedDifference);

  // Parse the time string
  const [hours, minutes] = time.split(':').map(Number);

  // Set the hours and minutes of the target date
  const TempDate = new Date(`01/01/2001 ${hours - 9}: ${minutes}: 00.000 GMT+0000`)
  targetDate.setHours(TempDate.getHours(), TempDate.getMinutes(), TempDate.getSeconds());

  return targetDate;
}

const createAlarm = (targetDate: Date, animeId: number) => {
  // Get the day and time components from the target date
  const targetDay = targetDate.getDay(); // Day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const targetHours = targetDate.getHours(); // Hours (0-23)
  const targetMinutes = targetDate.getMinutes(); // Minutes (0-59)

  // Calculate the time until the next occurrence of the target day and time
  const now = new Date();
  now.setSeconds(0);
  const daysUntilNextOccurrence = (targetDay + 7 - now.getDay()) % 7; // Number of days until the next occurrence of the target day
  const hoursUntilNextOccurrence = targetHours - now.getHours();
  const minutesUntilNextOccurrence = targetMinutes - now.getMinutes();
  const millisecondsUntilNextOccurrence =
    daysUntilNextOccurrence * 24 * 60 * 60 * 1000 +
    hoursUntilNextOccurrence * 60 * 60 * 1000 +
    minutesUntilNextOccurrence * 60 * 1000;

  const when = (Date.now() + millisecondsUntilNextOccurrence);
  // Set the alarm to trigger every week at the specified day and time
  browser.alarms.create("anime_release_alarm_" + animeId.toString(), {
    when: when, // Schedule the alarm to run after the calculated time
    periodInMinutes: 7 * 24 * 60 // Set the period to 7 days (1 week)
  });

  const notificationOptions: Notifications.CreateNotificationOptions = {
    type: 'basic',
    title: 'Alert Created!',
    iconUrl: '../../assets/icons/favicon-48.png',
    message: `You'll be notified when new episode is released.`,
    priority: 2,
  }

  browser.notifications.create(`alert_created_${animeId}_${Date.now()}`, notificationOptions);
};


export {
  fetchAndSetAnimeDetails,
  fetchAnimeDetails,
  convertToCurrentTime,
  createAlarm
}
