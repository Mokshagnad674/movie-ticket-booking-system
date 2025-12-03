import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export default function UserPopover(props) {
  return (
    <Button component={Link} to="/login" variant="outlined" color="primary">
      Login
    </Button>
  );
}
