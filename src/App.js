import React, { useState, useEffect,useContext } from "react";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route, NavLink,useNavigate } from "react-router-dom";
import SignIn from "./SignIn.js";
import { AuthProvider, AuthContext } from "./AuthContext";
import SignUp from "./SignUp.js";
import Favorites from "./Favorites";
import { FavoritesProvider,  } from './FavoritesContext';
import MovieCard from "./MovieCard";
import SearchIcon from "./search.svg";
import Home from "./Home";
import "./App.css";
import CreateMovieCard from "./CreateMovieCard";
import DeleteCard from "./DeleteCard";

const API_URL = "http://www.omdbapi.com?apikey=b6003d8a";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  //const {  signOut,  } = useContext(AuthContext);
   

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };
  

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  
  useEffect(() => {
    document.body.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleCreate = (newMovie) => {
  setMovies((prevMovies) => [...prevMovies,newMovie]);
  };

  const handleDelete = (deletedMovieId) => {
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.imdbID !== deletedMovieId)
    );
  };


  return (
    <AuthProvider>
      <Router>
      <div className={`app ${isDarkMode ? "dark" : ""}`}>
          <h1>MovieLand</h1>
          <span className="dark-mode" onClick={() => toggleDarkMode(!isDarkMode)}>
            {isDarkMode ? "☀️" : "🌙"}
          </span>
          <header>
            <nav className="navigation">
              <NavLink to="/favorites">Favorites</NavLink>
              <NavLink to="/CreateMovieCard">Create A Card</NavLink>
              <NavLink to="/signin">Sign In</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
              <NavLink to="/">Home</NavLink>
            </nav>
          </header>

          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route
                path="/CreateMovieCard"
                element={<CreateMovieCard onMovieCreate={handleCreate} />}
              />
            </Routes>

            <div className="search">
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for movies"
              />
              <img
                src={SearchIcon}
                alt="search"
                onClick={() => searchMovies(searchTerm)}
              />
            </div>

            <div className="container">
              {movies && movies.length > 0 ? (
                movies.map((movie) => (
                  <MovieCard movie={movie} key={movie.imdbID} onDelete={handleDelete} />
                  ))
              ) : (
                <div className="empty">
                  <h2>No movies found</h2>
                </div>
              )}
            </div>
          </div>

          <footer>
            <nav className="navigation">
              <NavLink to="/favorites">Favorites</NavLink> 
              <NavLink to="/CreateMovieCard">Create A Card</NavLink>
              <NavLink to="/signin">Sign In</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
              <NavLink to="/">Home</NavLink>
            </nav>
            <p className="allr">ALL RIGHTS RECEIVED MOVIELAND TM</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;

ReactDOM.render(
  <React.StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);



