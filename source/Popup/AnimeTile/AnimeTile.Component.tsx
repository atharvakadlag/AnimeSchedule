import React from "react";

interface AnimeTileProps {
  imageUrl: string;
  animeName: string;
}

const AnimeTile: React.FC<AnimeTileProps> = ({ imageUrl, animeName }) => {
  return (
    <div className="flex items-center p-2 border border-gray-300 rounded-lg shadow-md">
      {/* Anime Image */}
      <img
        src={imageUrl}
        alt={animeName}
        className="w-16 h-24 mr-4 rounded-md max-w-16 min-w-16"
      />

      {/* Anime Name */}
      <p className="font-bold overflow-ellipsis">{animeName}</p>
    </div>
  );
};

export default AnimeTile;
