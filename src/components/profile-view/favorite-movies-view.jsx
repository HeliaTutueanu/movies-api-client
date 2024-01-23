import { Card, Button, Col, Row, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./profile-view.scss";

const ProfileFavoritesView = ({ favoriteMovieList }) => {
  const removeFav = (id) => {
    let token = localStorage.getItem('token');
    let url = `https://movies-api-sqg3.onrender.com/users/update/${localStorage.getItem('user')}/movies/${id}`;
    axios.delete(url, {
      headers: {Authorization: `Bearer ${token}`},
    })
  }
 
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={12}>
          <h4>Favorite Movies</h4>
          </Col>
          </Row>
          <Row>
          {favoriteMovieList && favoriteMovieList.map(({ ImagePath, Title, _id }) => {
            return (
              <Col xs={12} md={6} lg={3} key={_id} className="fav-movie">
                <Figure>
                  <Link to={`/movies/${_id}`}>
                    <Figure.Image src={ImagePath} alt={Title}/>
                    <Figure.Caption> {Title} </Figure.Caption>
                  </Link>
                </Figure>
                <Button variant="secondary" onClick={() => removeFav(_id)}>Remove</Button>
              </Col>
            )
        })}
          </Row>
        </Card.Body>
      </Card>
  );
};

export default ProfileFavoritesView;