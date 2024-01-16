import { useParams } from "react-router";
import { Link } from "react-router-dom";
import './movie-view.scss';
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";

export const MovieView = ({ movies, onFavoriteToggle  }) => {
  const { movieId } = useParams();
  const decodedMovieId = decodeURIComponent(movieId);
  const movie = movies.find((b) => b._id === decodedMovieId);

  return (
    <div>
      {/* <div>
        <img className="w-100" src={movie.image} alt={movie.Title} />
      </div> */}
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movie.Genre}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movie.Director}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
      <Button
        variant="outline-primary"
        style={{ cursor: "pointer" }}
        onClick={() => onFavoriteToggle(movie._id)}
      >
        {movie.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </Button>
    </div>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,              // Array of movie objects
  onFavoriteToggle: PropTypes.func.isRequired,     // Function to toggle favorite status
};