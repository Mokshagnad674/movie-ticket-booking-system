import React from "react";

const ShowtimeList = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>Showtime List</h2>
      <p>This page displays all showtimes scheduled for the theatre owner's cinemas.</p>

      <ul>
        <li>Movie Title</li>
        <li>Cinema Name</li>
        <li>Show Time</li>
        <li>Available Seats</li>
      </ul>
    </div>
  );
};

export default ShowtimeList;
