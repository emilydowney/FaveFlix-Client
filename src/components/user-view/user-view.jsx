import React, { useState } from 'react';
import axios from 'axios';
import Moment from 'moment';
import { Form, Button, Row, Col, Card, FormControl } from 'react-bootstrap';
import { BrowserRouter as Link } from 'react-router-dom';
import { Link } from 'react-router-dom';

import './user-view.scss';

export class UserView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      birthday: '',
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
      }); aq
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
    const token = localStorage.getItem('token');
    let url = 'https://a-movies-api.herokuapp.com/users/' + localStorage.getItem('user');

    axios.put(url, {
      username: this.state.username,
      password: this.state.password.required,
      email: this.state.email,
      birthday: this.state.birthday
    },
      {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        localStorage.setItem('user', response.data.username)
        alert(user + ' has been updated!')

      })
      .catch(function (error) {
        console.log(error);
      });
  }
  // Handles the change of user data
  handleChange(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value
    })
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
            <Form>
              <h5>My Profile</h5>

              <Form.Group controlId="username">
                <Form.Label>Username: </Form.Label><FormControl
                  type="text"
                  name="username"
                  placeholder={this.state.username}
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password: </Form.Label><FormControl
                  type="text"
                  name="password"
                  placeholder="Enter your current or new password."
                  onChange={(e) => this.handleChange(e)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email: </Form.Label><FormControl
                  type="text"
                  name="email"
                  placeholder={this.state.email}
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>

              <Form.Group controlId="birthday">
                <Form.Label>Birthday: </Form.Label><FormControl
                  type="text"
                  name="birthday"
                  placeholder={this.state.birthday}
                  onChange={(e) => this.handleChange(e)}
                />
              </Form.Group>

              <Form.Group>
                <Button
                  type="submit"
                  onClick={this.updateUser()}>Save Changes
                </Button>
                <Link to="/">
                  <Button>Back</Button>
                </Link>
              </Form.Group>
            </Form>

            Favorites: <br />
          </Col>
        </Row>

        <Row className="user-view favorites">
          {
            movieList.length === 0
              ? <Col md={8}>You have no favorite movies!</Col>
              : movieList.map((movie) => {
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
              }
              )}

        </Row>

        <Row className="user-view">
          <Col md={11}>
            <Button variant="danger" onClick={() => { this.deleteUser(); }}> Delete Account</Button>
            <p>WARNING! This action cannot be undone.</p>
          </Col>
        </Row>
      </div>
    )
  }
}

