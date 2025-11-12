import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ProtectedRoute = ({
  layout: Layout,
  component: Component,
  isAuthenticated,
  user,
  ...rest
}) => (
  <Route
    {...rest}
    render={props => {
      if (!isAuthenticated) {
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
      }
      
      // Check if user has admin role for admin routes
      if (props.location.pathname.startsWith('/admin') && user?.role !== 'admin') {
        return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
      }
      
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object
};
ProtectedRoute.defaultProps = {
  isAuthenticated: false,
  user: null
};
const mapStateToProps = state => ({
  isAuthenticated: state.authState.isAuthenticated,
  user: state.authState.user
});
export default connect(mapStateToProps)(ProtectedRoute);
