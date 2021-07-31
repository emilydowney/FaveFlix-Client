import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route, Redirect, Link } from 'react-router-dom';
import { Nav, Navbar, Row, Col, Button, Form, FormControl } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { UserView } from '../user-view/user-view';

import './main-view.scss'

export class MainView extends React.Component {
  constructor() {
    super();
    // Sets initial states to null
    this.state = {
      movies: [],
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
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
        this.setState({
          movies: response.data
        });
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
    console.log(authData);
    this.setState({
      user: authData.user.Username,
      token: authData.token
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  // Resets user upon loggin out
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        <Row>
          <Navbar bg="light" expand="lg" variant="light">
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
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link id="link-dark" className="nav-link" to="/">Home</Link>
                <Link id="link-dark" className="nav-link" to="/">Movies</Link>
                <Link id="link-dark" className="nav-link" to="/users/${user}">Profile</Link>
                <Link to="/">
                  <Button
                    variant="link"
                    id="link-dark"
                    className="nav-link"
                    onClick={() => this.onLoggedOut()}>Logout
                  </Button>
                </Link>
              </Nav>
              <Form inline>
                <FormControl
                  type="text"
                  placeholder="Search"
                  className="mr-sm-2" />
                <Button variant="outline-primary">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>
        </Row>

        <Row className="main-view justify-content-md-center">

          <Route exact path="/" render={() => {
            if (!user) return <Col>
              <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>
            if (movies.length === 0) return <div className="main-view" />;

            return movies.map(m => (
              <Col md={4} key={m._id}>
                <MovieCard movie={m} />
              </Col>
            ))
          }} />

          <Route path="/register" render={() => {
            if (user) return <Redirect to="/" />

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
