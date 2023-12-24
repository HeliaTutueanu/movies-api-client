import React from "react";
import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
    fetch("https://movies-api-sqg3.onrender.com/users/login", {
        method: "POST",
        body: JSON.stringify(data)
      }).then((response) => {
        if (response.ok) {
          onLoggedIn(username);
        } else {
          alert("Login failed");
        }
      });

  const [username, setUsername] = useState("");
    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />

  const [password, setPassword] = useState("");
    <input
      type="text"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

  const handleSubmit = (event) => {
    event.preventDefault();   // prevents the default behavior of the form which is to reload the entire page

  const data = {
    Username: username,
    Password: password
  };

  fetch("https://openlibrary.org/account/login.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Login response: ", data);
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        onLoggedIn(data.user, data.token);
      } else {
        alert("No such user");
      }
    })
    .catch((e) => {
      alert("Something went wrong");
    });

  return (
    <form onSubmit={handleSubmit}>
    <label>
      Username:
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </label>
    <label>
      Password:
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </label>
    <button type="submit">Submit</button>
  </form>
  );
}};