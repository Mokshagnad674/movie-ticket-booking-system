import React, { lazy, Suspense } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import Loading from './components/Loading';
import { ProtectedRoute, WithLayoutRoute } from './routers';

import { TheatreOwnerLayout, PublicLayout } from './layouts';

// TheatreOwner
const DashboardPage = lazy(() => import('./pages/TheatreOwner/Dashboard'));
const MovieList = lazy(() => import('./pages/TheatreOwner/MovieList'));
const CinemaList = lazy(() => import('./pages/TheatreOwner/CinemaList'));
const ShowtimeList = lazy(() => import('./pages/TheatreOwner/ShowtimeList'));
const ReservationList = lazy(() => import('./pages/TheatreOwner/ReservationList'));
const User = lazy(() => import('./pages/TheatreOwner/User'));
const Account = lazy(() => import('./pages/TheatreOwner/Account'));
const CreateMovie = lazy(() => import('./pages/TheatreOwner/CreateMovie'));
const CreateCinema = lazy(() => import('./pages/TheatreOwner/CreateCinema'));

// Register - Login
const Register = lazy(() => import('./pages/Public/Register'));
const Login = lazy(() => import('./pages/Public/Login'));

// Public
const HomePage = lazy(() => import('./pages/Public/HomePage'));
const MoviePage = lazy(() => import('./pages/Public/MoviePage'));
const MyDashboard = lazy(() => import('./pages/Public/MyDashboard'));
const MovieCategoryPage = lazy(() =>
  import('./pages/Public/MovieCategoryPage')
);
const CinemasPage = lazy(() => import('./pages/Public/CinemasPage'));
const BookingPage = lazy(() => import('./pages/Public/BookingPage'));

const Checkin = lazy(() => import('./pages/Public/Checkin'));

const Routes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />

          <WithLayoutRoute
            exact
            path="/checkin/:reservationId"
            component={Checkin}
            layout={PublicLayout}
          />

          <WithLayoutRoute
            exact
            path="/"
            layout={PublicLayout}
            component={HomePage}
          />
          <WithLayoutRoute
            exact
            path="/mydashboard"
            layout={PublicLayout}
            component={MyDashboard}
          />
          <WithLayoutRoute
            exact
            path="/cinemas"
            layout={PublicLayout}
            component={CinemasPage}
          />
          <WithLayoutRoute
            exact
            path="/movie/category/:category"
            layout={PublicLayout}
            component={MovieCategoryPage}
          />
          <WithLayoutRoute
            exact
            path="/movie/:id"
            layout={PublicLayout}
            layoutProps={{ withFooter: false }}
            component={MoviePage}
          />
          <WithLayoutRoute
            exact
            path="/movie/booking/:id"
            layout={PublicLayout}
            layoutProps={{ withFooter: false }}
            component={BookingPage}
          />
          <ProtectedRoute
            exact
            path="/admin/dashboard"
            layout={TheatreOwnerLayout}
            component={DashboardPage}
          />
          <ProtectedRoute
            exact
            path="/admin/users"
            layout={TheatreOwnerLayout}
            component={User}
          />
          <ProtectedRoute
            exact
            path="/admin/showtimes"
            layout={TheatreOwnerLayout}
            component={ShowtimeList}
          />
          <ProtectedRoute
            exact
            path="/admin/reservations"
            layout={TheatreOwnerLayout}
            component={ReservationList}
          />
          <ProtectedRoute
            exact
            path="/admin/cinemas"
            layout={TheatreOwnerLayout}
            component={CinemaList}
          />
          <ProtectedRoute
            exact
            path="/admin/movies"
            layout={TheatreOwnerLayout}
            component={MovieList}
          />
          <ProtectedRoute
            exact
            path="/admin/account"
            layout={TheatreOwnerLayout}
            component={Account}
          />
          <ProtectedRoute
            exact
            path="/admin/create-movie"
            layout={TheatreOwnerLayout}
            component={CreateMovie}
          />
          <ProtectedRoute
            exact
            path="/admin/create-cinema"
            layout={TheatreOwnerLayout}
            component={CreateCinema}
          />
          <Route path="*" component={() => '404 NOT FOUND'} />
        </Switch>
      </Router>
    </Suspense>
  );
};

export default Routes;
