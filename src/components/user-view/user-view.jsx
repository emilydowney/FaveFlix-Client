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
      Username: '',
      Password: '',
      Email: '',
      Birthday: '',
      favoriteMovies: [],
      validated: ''
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
      headers: {
        Authorization: `Bearer ${token}`
      },
    })
      .then((response) => {
        console.log(response.data)
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: Moment(response.data.Birthday).utc().format('MM-DD-YYYY'),
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
      headers: {
        Authorization: `Bearer ${token}`
      }
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
  updateUser(e, newUsername, newPassword, newEmail, newBirthday) {
    e.preventDefault();

    const token = localStorage.getItem('token');
    let url = 'https://a-movies-api.herokuapp.com/users/' + localStorage.getItem('user');

    axios.put(url,
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        data: {
          Username: newUsername ? newUsername : this.state.Username,
          Password: newPassword ? newPassword : this.state.Password,
          Email: newEmail ? newEmail : this.state.Email,
          Birthday: newBirthday ? newBirthday : this.state.Birthday
        }
      })
      .then((response) => {
        alert('Profile has been updated!');
        this.setState(
          {
            Username: response.data.Username,
            Password: response.data.Password,
            Email: response.data.Email,
            Birthday: response.data.Birthday
          }
        );
        console.log(response.data);
        localStorage.setItem('user', this.state.Username);
        window.open('/users/${username}', '_self');
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
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
            <p>Current user information.<br />
              Username: {this.state.Username}<br />
              Email: {this.state.Email}<br />
              Birthday: {this.state.Birthday}</p>

            <Form onSubmit={(e) => this.updateUser(e, this.Username, this.Password, this.Email, this.Birthday)}>

              <Form.Group controlId="username">
                <Form.Label>Username: </Form.Label>
                <FormControl
                  type="text"
                  name="username"
                  placeholder="Change username"
                  onChange={(e) => this.setUsername(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="password">
                <Form.Label>Password: </Form.Label>
                <FormControl
                  type="text"
                  name="password"
                  placeholder="Enter your current or new password."
                  onChange={(e) => this.setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="email">
                <Form.Label>Email: </Form.Label>
                <FormControl
                  type="text"
                  name="email"
                  placeholder="Change email"
                  onChange={(e) => this.setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="birthday">
                <Form.Label>Birthday: </Form.Label>
                <FormControl
                  type="text"
                  name="birthday"
                  placeholder="Change birthday"
                  value={this.Birthday}
                  onChange={(e) => this.setBirthday(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Button type="submit">Save Changes
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
                    <Card key={movie} className="movie-info favorites">
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

