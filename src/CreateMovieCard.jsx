import React, { useState } from "react";
import "./sign.css";

const CreateMovieCard = ({ onMovieCreate }) => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!title) {
      newErrors.title = "Please enter a movie title";
    }

    if (!year) {
      newErrors.year = "Please enter a valid year";
    } else if (!/^\d{4}$/.test(year)) {
      newErrors.year = "Please enter a valid 4-digit year";
    }

    if (!genre) {
      newErrors.genre = "Please select a genre";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const handleCreate = () => {
    if (validateForm()) {
      const movie = {
        title,
        year,
        genre,
        image,
      };

      onMovieCreate(movie);
      setTitle("");
      setYear("");
      setGenre("");
      setImage("");
    }
  };

  return (
    <div className="create-movie-card">
      <div>
        <label htmlFor="title">Movie Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>

      <div>
        <label htmlFor="year">Year</label>
        <input
          type="text"
          id="year"
          name="year"
          value={year}
          onChange={handleYearChange}
        />
        {errors.year && <span className="error">{errors.year}</span>}
      </div>

      <div>
        <label htmlFor="genre">Genre</label>
        <select id="genre" name="genre" value={genre} onChange={handleGenreChange}>
          <option value="">Select Genre</option>
          <option value="action">Action</option>
          <option value="horror">Horror</option>
          <option value="comedy">Comedy</option>
          <option value="fantasy">Fantasy</option>
          <option value="family">Family</option>
          <option value="thriller">Thriller</option>
          <option value="romantic">Romantic</option>
          <option value="drama">Drama</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="musical">Musical</option>
          <option value="adventure">Adventure</option>
        </select>
        {errors.genre && <span className="error">{errors.genre}</span>}
      </div>

      <button onClick={handleCreate}>Create</button>

      {title && (
        <div className="movie-card">
          <h2>{title}</h2>
          <p>Year: {year}</p>
          <p>Genre: {genre}</p>
          <div className="card-image">
            {image && <img src={image} alt={title} />}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateMovieCard;











