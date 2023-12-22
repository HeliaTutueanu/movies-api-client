import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

const SimilarMovies = ({ selectedMovie, movies, onMovieClick }) => {
    if (!selectedMovie) {
      return null;
    }
    let similarMovies = movies.filter((movie) => {
      if (movie.id === selectedMovie.id) {
        return false;
      }
      return movie.genre.some((genre) => selectedMovie.genre.includes(genre));
    });
  
    return (
      <>
        <hr />
        <h2>Similar Movies</h2>
        {similarMovies.map((similarMovie) => (
          <MovieCard
            key={similarMovie.id}
            movie={similarMovie}
            onMovieClick={() => {
              onMovieClick(similarMovie);
            }}
          />
        ))}
      </>
    );
  };

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    if (!token) return;
 
    fetch("http://localhost:1234/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((movies) => {
        setMovies(movies);
 
      });
  }, [token]);
  
  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
  }

  if (selectedMovie) {
    return (
      <>
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      <div>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onMovieClick={() => {
                setSelectedMovie(movie);
              }}
            />
          ))}
        </div>
        <SimilarMovies selectedMovie={selectedMovie} movies={movies} onMovieClick={setSelectedMovie} />
      </>
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={() => {
            setSelectedMovie(movie);
          }}
        />
      ))}
      <SimilarMovies selectedMovie={selectedMovie} movies={movies} onMovieClick={setSelectedMovie} />
    </div>
  );
};
