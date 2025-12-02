import React from "react";
import { connect } from 'react-redux';
import { logout } from '../store/actions';
import { Button, Box } from '@material-ui/core';
import { ExitToApp as LogoutIcon } from '@material-ui/icons';

const TheatreOwnerLayout = ({ children, logout }) => {
  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <h2>Admin Dashboard</h2>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
      <div>{children}</div>
    </div>
  );
};

const mapDispatchToProps = { logout };

export default connect(null, mapDispatchToProps)(TheatreOwnerLayout);
