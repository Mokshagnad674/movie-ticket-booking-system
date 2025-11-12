import React from "react";

const User = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h2>User Management</h2>
      <p>This page allows the theatre owner to view or manage users who booked tickets.</p>

      <ul>
        <li>View all registered users</li>
        <li>Check user booking history</li>
        <li>Block or unblock users (future feature)</li>
      </ul>
    </div>
  );
};

export default User;
