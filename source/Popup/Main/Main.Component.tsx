import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar.Component";
import AnimeDetails from "../AnimeDetails/AnimeDetails.Component";
import { CloseOutlined } from "@mui/icons-material";
import ReactModal from "react-modal";

function Main() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAnimeId, setSelectedAnimeId] = useState<number | null>(null);

  const openModal = (animeId: number) => {
    setSelectedAnimeId(animeId);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedAnimeId(null);
    setIsOpen(false);
  };

  return (
    <div className="max-w-screen-lg mx-auto">
      {/* Wide Div */}
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg w-[560px]">
        <SearchBar openModal={openModal} />
        <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Anime Details"
      >
        {selectedAnimeId && <AnimeDetails animeId={selectedAnimeId} />}
        <button
        onClick={closeModal}
        className="fixed top-0 right-0 z-10 m-12 border rounded-md bg-red-300"
        >
          <CloseOutlined/>
        </button>
      </ReactModal>
      </div>
    </div>
  );
}

export default Main;
