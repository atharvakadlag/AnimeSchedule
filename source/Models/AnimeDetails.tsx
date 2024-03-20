interface IAnimeDetails {
  id: number;
  title: string;
  main_picture: {
    medium: string;
    large: string;
  };
  alternative_titles: {
    synonyms: string[];
    en: string;
    ja: string;
  };
  start_date: string;
  end_date: string;
  synopsis: string;
  mean: number;
  media_type: string;
  status: string;
  num_episodes: number;
  start_season: {
    year: number;
    season: string;
  };
  broadcast: {
    day_of_the_week: string;
    start_time: string;
  };
  rating: string;
}

enum AnimeStatus {
  Finished = "finished_airing",
  Ongoing = "currently_airing",
}

export { AnimeStatus };
export type { IAnimeDetails };

