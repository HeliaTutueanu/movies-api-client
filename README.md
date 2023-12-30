# Movie App

This is the client-side part of my movie database project, which stores information about movies and their titles, description and genres, genre names and descriptions, directors and actors. Users can also create/update/delete account, add/remove their favorite movies.

## Features

1. **User Authentication:**
   - Users can sign up, log in, and log out securely.

2. **User Profile:**
   - Users can view and update their profile information, including username, password, email and date of birth.

3. **Favorite Movies:**
   - Users can add and remove movies from their list of favorite movies.

4. **Movie Catalog:**
   - Users can explore a variety of movies.
   - View movie details.
   - Search for movies based on genre and director.

## Technologies Used

- **Frontend:**
  - React
  - React Router
  - Bootstrap

- **Backend:**
  - Node.js
  - Express
  - MongoDB

- **Authentication:**
  - JWT (JSON Web Tokens)

- **Database:**
  - MongoDB Atlas

## Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/heliatutueanu/movies-api-client.git
    cd movies-api-client
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

4. Open the app in your browser: [http://localhost:1234](http://localhost:1234)

## API Endpoints

### User Endpoints:

- `GET /users`: Get a list of all use
