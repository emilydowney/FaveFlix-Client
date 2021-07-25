import React from 'react';
import axios from 'axios';
import Moment from 'moment';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { BrowserRouter as Link } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './user-view.scss';

export class UserView extends React.Component {

  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: []
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }
  // Retrieves and sets user data
  getUser(token) {
    let url = 'https://a-movies-api.herokuapp.com/users/' + localStorage.getItem('user');
    axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response.data)
        this.setState({
          username: response.data.Username,
          password: response.data.Password,
          email: response.data.Email,
          birthday: Moment(response.data.Birthday).utc().format('ll'),
          favoriteMovies: response.data.Favorites
        });
      });
  }
  // Function to delete user profile
  deleteUser() {
    let url = 'https://a-movies-api.herokuapp.com/users/' + localStorage.getItem('user');
    let token = localStorage.getItem('token');

    axios.delete(url, { headers: { Authorization: `Bearer ${token}` } })

      .then(response => {
        alert('Account was deleted.');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // Function to remove movie from user's favorite list
  removeFavorite(movie) {
    const token = localStorage.getItem('token');
    const url = 'https://a-movies-api.herokuapp.com/users/' + localStorage.getItem('user') + '/favorites/' + movie._id;

    axios.delete(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        this.componentDidMount();
        alert(movie.Title + ' was removed from your favorites!');
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // Function to update user's info
  updateUser() {
    let url = 'https://a-movies-api.herokuapp.com/users/' + localStorage.getItem('user');

    axios.put(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies } = this.props;
    const movieList = movies.filter((movie) => {
      return this.state.favoriteMovies.includes(movie._id);
    });

    return (
      <div className="container">

        <Row className="user-view">
          <Col md={11}>
            <h5>My Profile</h5>
            <p>Username: {this.state.username}<br />
              Email: {this.state.email}<br />
              Birthday: {this.state.birthday}<br />
              Favorites: <br />
            </p>
          </Col>
        </Row>

        <Row className="user-view favorites">
          {movieList.map((movie) => {
            return (
              <Col md={4}>
                <Card className="movie-info favorites">
                  <div className="image">
                    <Card.Img variant="top" src={movie.ImageURL} />
                  </div>
                  <Card.Body>
                    <Card.Title>{movie.Title}</Card.Title>
                    <Link to={`/movies/${movie._id}`}>
                      <Button variant="primary">Open</Button>
                    </Link>
                    <Button variant="secondary" onClick={() => { this.removeFavorite(movie); }}>Remove</Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>

        <Row className="user-view">
          <Col md={11}>
            <Button variant="danger" onClick={() => { this.deleteUser(); }}> Delete Account</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

