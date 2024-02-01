import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view.jsx";
import { SignupView } from "../signup-view/signup-view.jsx";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";
import { ProfileView } from "../profile-view/profile-view.jsx";
import "./main-view.scss";
import { Row } from "react-bootstrap";
import { Col, Form } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser: null);
  const [token, setToken] = useState(storedToken? storedToken: null);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://movies-api-sqg3.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            ImagePath: movie.ImagePath,
            Description: movie.Description,
            Genre: {
              Name: movie.Genre.Name},
              Director: {
                Name: movie.Director.Name}
          };
        });
        setMovies(moviesFromApi);});
  }, [token]);

    const addFav = (id) => {
      fetch(`https://movies-api-sqg3.onrender.com/users/${user.Username}/favorites/${id}`, {
        method: "POST",
        headers: {
           Authorization: `Bearer ${token}`
        }
      }).then((response) => {
          console.log("Add Response:", response);  // line for debugging
          if (response.ok) {
            return response.json();
          } else {
            alert("Failed to add");
          }
      }).then((user) => {
          console.log("User after add:", user);  //  line for debugging
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
          }
      }).catch(error => {
          console.error('Error: ', error);
      });
  };
  
  const removeFav = (id) => {
      fetch(`https://movies-api-sqg3.onrender.com/users/${user.Username}/favorites/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
      }).then((response) => {
          console.log("Remove Response:", response);  // line for debugging
          if (response.ok) {
              return response.json();
          } else {
            alert("Failed to remove");
          }
      }).then((user) => {
          console.log("User after remove:", user);  // line for debugging
          if (user) {
            localStorage.setItem('user', JSON.stringify(user));
            setUser(user);
          }
      }).catch(error => {
          console.error('Error: ', error);
      });
  };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }}
      />
      <Row className="justify-content-center my-5">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                  ) : (
                    <Col md={5}>
                      <LoginView 
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                    </Col>
                )}
              </>
            }
          />
          <Route 
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>There is no movie</Col>
                  ) : (
                    <Col md={12}>
                      <MovieView 
                        movies={movies}
                        removeFav={removeFav}
                        addFav={addFav}
                      />
                    </Col>
                    )}
              </>
            }
          />
          <Route 
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty</Col>
                  ) : (
                    <>
                      <Form className="form-inline mt-5 d-flex justify-content-center">
                        <Form.Control
                          className="ms-5 mx-md-0"
                          type="search"
                          id="searchForm"
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Search for ..." 
                          aria-label="Search" 
                        />
                        <Form.Select className="ms-1 ms-md-3 w-25"
                          aria-label="Default select genre"
                          onChange={(e) => {
                            console.log("Selected Genre:", e.target.value);
                            setSelectedGenre(e.target.value);}}
                        >
                          <option value="" selected>Search by genre</option>
                          <option value="Drama">Drama</option>
                          <option value="Romance">Romance</option>
                          <option value="Action">Action</option>
                          <option value="Crime">Crime</option>
                          <option value="Science Fiction">Science Fiction</option>
                          <option value="Thriller">Thriller</option>
                          <option value="Adventure">Adventure</option>
                        </Form.Select>
                      </Form>

                      {movies.filter((movie) => {
                        return selectedGenre === ""
                        ? movie
                        : movie.Genre.Name === selectedGenre;
                        })
                        .filter((movie) => {
                          return search === ""
                          ? movie
                          : movie.Title.toLowerCase().includes(search.toLowerCase());
                        })
                        .map((movie, movieId) => (
                          <Col md={6} lg={4} xl={3} className="mb-5 col-8" key={movieId}>
                            <MovieCard
                              movie={movie} 
                              removeFav={removeFav} 
                              addFav={addFav}
                              isFavorite={user.FavoriteMovies.includes(movie._id)} 
                            />
                          </Col>
                      ))}
                    </>
                )}
            </>
           }
          />
          <Route
            path="/profile"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                  ) : (
                    <Col>
                      <ProfileView 
                        user={user}
                        movies={movies}
                        removeFav={removeFav}
                        addFav={addFav}
                        setUser={setUser}
                      />
                    </Col>
                  )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};