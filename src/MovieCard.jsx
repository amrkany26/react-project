import React, { useState, useContext } from 'react';
import './App.css';
import { FavoritesContext } from './FavoritesContext';
import DeleteCard from "./DeleteCard";


const MovieCard = ({ movie, onDelete}) => {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const [isFavorite, setIsFavorite] = useState(favorites.some((fav) => fav.imdbID === movie.imdbID));
  const [showDelete, setShowDelete] = useState(false);

  const toggleDelete = () => {
    setShowDelete((prevShowDelete) => !prevShowDelete);
  };

  const handleDelete = () => {
    setShowDelete(true);
    onDelete(movie.imdbID);

  };

  const confirmDelete = () => {
    setShowDelete(true);
  };

  const cancelDelete = () => {
    setShowDelete(false);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie.imdbID);
    } else {
      addFavorite(movie);
    }
    setIsFavorite((prevFavorite) => !prevFavorite);
  };

  const { imdbID, Year, Poster, Title, Type } = movie;

  return (
    <div className={`movie ${isFavorite ? 'favorite' : ''}`} key={imdbID}>
      <div>
        <p>{Year}</p>
      </div>

      <div>
        <img src={Poster !== 'N/A' ? Poster : 'https://via.placeholder.com/400'} alt={Title} />
      </div>

      <div>
        <span>{Type}</span>
        <h3>{Title}</h3>
      </div>

      <div className="favorite-icon" onClick={toggleFavorite}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill={isFavorite ? 'red' : 'gray'}
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.32 2 12.18 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.68-3.4 6.82-8.55 11.53L12 21.35z"
          />
        </svg>
      </div>
      <div className="delete-icon">
        <button onClick={handleDelete}>Delete</button>
      </div>

      {showDelete && (
        <div className="confirm-delete">
          <p>Are you sure you want to delete this movie?</p>
          <button onClick={confirmDelete}>Confirm</button>
          <button onClick={cancelDelete}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
