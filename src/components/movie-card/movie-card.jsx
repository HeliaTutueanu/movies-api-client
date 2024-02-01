import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BookmarkHeart, BookmarkHeartFill } from "react-bootstrap-icons";
import './movie-card.scss';

export const MovieCard = ({ movie, addFav, removeFav, isFavorite }) => {
    return (
        <Card className="h-100 mt-5">
            <div className="position-relative .d-inline-block">
              <Card.Img variant="top" src={movie.ImagePath} className="card-images mx-auto w-100"/>
                <div>
                    {isFavorite ? (
                        <BookmarkHeartFill size={40} color="blue" className="mt-2 me-2 top-0 end-0"
                        onClick={() => removeFav(movie._id)}/>
                    ) : (
                        <BookmarkHeart size={40} color="blue" className="mt-2 me-2 top-0 end-0"
                        onClick={() => addFav(movie._id)}/>
                    )}
                </div>
            </div>
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button> View </Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

// define all the props constraints for the MovieCard
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,        
    }).isRequired
};