import { Row, Container, Card, Col } from "react-bootstrap";
import UserInfo  from "./user-info"; 
import UserUpdate  from "./update-user";  
import ProfileFavoritesView from "./favorite-movies-view";
import "./profile-view.scss";

export const ProfileView = ({ user, setUser, favoriteMovieList }) => {

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <UserInfo name={user.Username} email={user.Email}/>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <UserUpdate user={user} setUser={setUser}/>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ProfileFavoritesView favoriteMovieList={favoriteMovieList}/>
    </Container>
  );
};