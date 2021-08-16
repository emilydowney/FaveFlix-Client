import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { Nav, Navbar, Row, Col } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { UserView } from '../user-view/user-view';

import './main-view.scss'

class MainView extends React.Component {

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser(localStorage.getItem('user'));
      this.getMovies(accessToken);
      this.getUser(accessToken);
    }
  }
  // Retrieves movies from DB
  getMovies(token) {
    axios.get('https://a-movies-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // Gets user based on username
  getUser(token) {
    axios.get('https://a-movies-api.herokuapp.com/users/${user}', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        this.setState({
          userData: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // Updates 'user' property in state upon login
  onLoggedIn(authData) {
    this.props.setUser(authData.user.Username);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  // Resets user upon loggin out
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser('');
  }

  render() {
    let { movies, user } = this.props;

    return (
      <Router>
        <Row>
          <Navbar collapseOnSelect bg="light" expand="lg" variant="light">
            <Navbar.Brand>
              <img
                className="logo"
                src="https://cdn4.iconfinder.com/data/icons/online-marketing-hand-drawn-vol-1/52/cinema__movie__reel__video__videoreel__film__media-1024.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="FaveFlix movie logo" />
              FaveFlix
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse expland="md" id="basic-navbar-nav">
              <Nav className="ml-auto">
                <Link id="link-dark" className="nav-link" to="/">Home</Link>
                <Link id="link-dark" className="nav-link" to="/">Movies</Link>
                <Link id="link-dark" className="nav-link" to="/users/${user}">Profile</Link>
                <Link
                  to="/"
                  id="link-dark"
                  className="nav-link"
                  onClick={() => this.onLoggedOut()}>Logout
                </Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Row>

        <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {
            if (!user.length) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className="main-view" />;

            return <MoviesList movies={movies} />;
          }} />

          <Route path="/register" render={() => {
            return <Col>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;

            return <Col md={8}>
              <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/genres/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;

            return <Col md={8}>
              <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;

            return <Col md={8}>
              <DirectorView director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
            </Col>
          }} />

          <Route path="/users/${user}" render={({ match, history }) => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>

            if (movies.length === 0) return <div className="main-view" />;

            return <Col md={8}>
              <UserView onLoggedIn={user => this.onLoggedIn(user)}
                user={user} movies={movies} onBackClick={() => history.goBack()} />
            </Col>
          }} />
        </Row>
      </Router >
    );
  }
}

let mapStatetoProps = state => {
  return {
    movies: state.movies,
    user: state.user
  }
}

export default connect(mapStatetoProps, { setMovies, setUser })(MainView);
