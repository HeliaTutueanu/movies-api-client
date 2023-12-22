import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

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
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://movies-api-sqg3.onrender.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const mvDB = data.docs.map((doc) => {
          return {
            id: doc.key,
            title: doc.title,
            image: "",
            director: doc.director_name?.[0],
            genre: doc.genre
          };
        });
        setMovies(mvDB);
       });
  }, []);

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
