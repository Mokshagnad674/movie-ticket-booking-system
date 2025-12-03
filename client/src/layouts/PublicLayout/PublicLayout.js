import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Navbar, Footer } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    color: theme.palette.common.white,
    height: '100%'
  }
}));

function PublicLayout(props) {
  const classes = useStyles(props);
  const { children, withFooter = true } = props;
  return (
    <div className={classes.root}>
      <div style={{position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 99999, background: 'rgba(0,0,0,0.9)', padding: '10px 20px'}}>
        <Navbar />
      </div>
      <div style={{paddingTop: '80px'}}>
        {children}
      </div>
      {withFooter && <Footer />}
    </div>
  );
}

export default PublicLayout;
