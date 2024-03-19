import React from "react";

function AnimeCard({ imageUrl, title }: { imageUrl: string; title: string }) {
  return (
    <div className="flex bg-white rounded-lg shadow-md p-2 mb-2 flex-shrink-0 me-2">
      <div className="flex-shrink-0">
        <img src={imageUrl} alt={title} className="w-36 h-48 rounded-md mb-2" />
        <div className="w-36">
          <p className="text-base text-center font-medium">{title}</p>
        </div>
      </div>
    </div>
  );
}

export default AnimeCard;
