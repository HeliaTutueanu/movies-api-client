import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';

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
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("https://movies-api-sqg3.onrender.com/movies")
    .then((response) => response.json())
    .then((data) => {
      const moviesFromApi = data.docs.map((doc) => {
        return {
          id: doc.key,
          title: doc.title,
          image: ``,
          director: doc.director_name?.[0]
        };
      });
      setMovies(moviesFromApi);
    });
}, []);

return (
  <Row className="justify-content-md-center">
    {!user ? (
       <Col md={5}>
       <LoginView onLoggedIn={(user) => setUser(user)} />
       or
       <SignupView />
     </Col>
    ) : selectedMovie ? (
      <MovieView 
        movie={selectedMovie} 
        onBackClick={() => setSelectedMovie(null)} 
      />
    ) : movies.length === 0 ? (
      <div>The list is empty!</div>
    ) : (
      <>
        {movies.map((movie) => (
          <Col key={movie.id} className="mb-5" md={3}>
          <MovieCard
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        </Col>
        ))}
        <SimilarMovies selectedMovie={selectedMovie} movies={movies} onMovieClick={setSelectedMovie} />
      </>
    )}
  </Row>
);
};