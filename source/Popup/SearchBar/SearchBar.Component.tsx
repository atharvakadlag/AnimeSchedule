import React, { useState } from "react";
import "./SearchBar.Style.css";
import fetchAnimeData from "./SearchBar.Services";
import AnimeData from "../../Models/AnimeData";
import AnimeTile from "../AnimeTile/AnimeTile.Component";


interface SearchBarProps {
  openModal: (animeId: number)=>void;
}

const SearchBar: React.FC<SearchBarProps> = ({ openModal }) => {
  const [query, setQuery] = useState<string>("");
  const [animeData, setAnimeData] = useState<AnimeData[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSearch = (searchQuery: string) => {
    const queryCleaned = searchQuery.trim();
    if (queryCleaned.length >= 3) {
      fetchAnimeData(queryCleaned, setAnimeData);
    } else {
      setAnimeData([]);
    }
  };

  return (
    <section id="searchbar">
      {/* Logo Section */}
      <div className="flex justify-center mb-2">
        <img src="your-logo.png" alt="Logo" className="w-16 h-16" />
        {/* Adjust width and height based on your logo size */}
      </div>

      {/* Text Input and Search Button Section */}
      <div className="flex items-center">
        {/* Text Input */}
        <input
          id="search"
          type="text"
          placeholder="Search..."
          className="px-4 py-2 mr-4 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          value={query}
          onChange={handleInputChange}
        />
      </div>
      <div 
      className="grid grid-cols-2 gap-4 mt-8">
        {animeData.map((anime) => (
          <div onClick={() => openModal(anime.id)}>
            <AnimeTile
              key={anime.id}
              imageUrl={anime.main_picture.medium}
              animeName={anime.title}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default SearchBar;
