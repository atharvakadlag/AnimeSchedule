import AnimeData from "../../Models/AnimeData";

const SEARCH_LIMIT = 6;

const fetchAnimeData = (
  searchQuery: string,
  setAnimeData: React.Dispatch<React.SetStateAction<AnimeData[]>>,
) => {
  console.log(`search fetch: ${searchQuery}`);
  fetch(
    `https://api.myanimelist.net/v2/anime?q=${encodeURIComponent(searchQuery)}&limit=${SEARCH_LIMIT}`,
    {
      headers: {
        "X-MAL-CLIENT-ID": "0d0914d55fc27f6c6cf3c306b4a69af1",
      },
    },
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.data) {
        setAnimeData(data.data.map((item: any) => item.node));
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
};

export default fetchAnimeData;
