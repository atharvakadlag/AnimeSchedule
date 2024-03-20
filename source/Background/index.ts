import { Notifications, browser } from "webextension-polyfill-ts";
import { fetchAnimeDetails } from "../Popup/AnimeDetails/AnimeDetails.Services";
import { AnimeStatus, IAnimeDetails } from "../Models/AnimeDetails";

browser.runtime.onInstalled.addListener((): void => {
  console.log("🦄", "extension installed");
});

browser.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name.startsWith("anime_release_alarm_")) {
    const animeId = alarm.name.replace("anime_release_alarm_", "");

    console.log(`recieved alarm for: "${animeId}"`)
    const data: IAnimeDetails = await fetchAnimeDetails(animeId);

    switch (data.status) {
      case AnimeStatus.Finished:
        console.log(`Clearing alarm for ${alarm.name}`);
        browser.alarms.clear(alarm.name);
        return;
      case AnimeStatus.Ongoing:
        break;
    }
    // Show the notification
    const notificationOptions: Notifications.CreateNotificationOptions = {
      type: 'basic',
      iconUrl: data.main_picture.medium,
      title: 'New Episode Alert!',
      message: `A new episode of ${data.title} is now available.`,
      priority: 2,
    }
    browser.notifications.create(`new_ep_alert_${animeId}_${Date.now()}`, notificationOptions);
  }
});
