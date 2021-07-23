import React from 'react';
import Moment from 'moment';
import { Form, Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './user-view.scss';
import axios from 'axios';

export class UserView extends React.Component {

  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    this.getUser(accessToken);
  }

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

  render() {

    return (
      <div className="container">
        <Row className="user-view">
          <Col md={11}>
            <h5>My Profile</h5>
            <p>Username: {this.state.username}<br />
              Email: {this.state.email}<br />
              Birthday: {this.state.birthday}<br />
              Favorites: <br />
              {this.state.favoriteMovies}
            </p>

            <Button variant="danger" onClick={() => { this.deleteUser() }}> Delete Account</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

