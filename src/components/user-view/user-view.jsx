import React from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import './user-view.scss';
import axios from 'axios';

export class UserView extends React.Component {

  render() {
    const { user, userData } = this.props;

    // Function to delete user profile
    function deleteUser() {
      let token = localStorage.getItem('token');

      axios.delete('https://a-movies-api.herokuapp.com/users/${user}', { headers: { Authorization: `Bearer ${token}` } })

        .then(response => {
          alert('Account was deleted.')
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    return (
      <div className="container">
        <Row className="user-view">
          <Col md={11}>
            <h5>My Profile</h5>
            <p>Username: {user}<br />
              Email: {`${userData.Email}`}
            </p>

            <Button variant="danger" onClick={() => { deleteUser() }}> Delete Account</Button>
          </Col>
        </Row>
      </div>
    )
  }
}

