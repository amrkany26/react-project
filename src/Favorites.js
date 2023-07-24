import React from 'react';
import { useFavorites } from './FavoritesContext';
import MovieCard from './MovieCard';

const Favorites = () => {
  const { favorites, updateFavorites,addFavorite, removeFavorite, isFavorite  } = useFavorites();

  const addToFavorites = (movie) => {
    if (!isFavorite(movie.imdbID)) {
      addFavorite(movie);
    }
  };

  const removeFromFavorites = (movie) => {
    removeFavorite(movie.imdbID);
  };

  return (
    <div>
      <h2>Favorites</h2>
      <div className="favorites-container">
        {favorites.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavorite={true}
            onRemove={() => removeFromFavorites(movie)}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
