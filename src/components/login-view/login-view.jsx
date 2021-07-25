import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';

import './login-view.scss'

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true)

    // Post request to login user
    axios.post('https://a-movies-api.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        alert('Incorrect username or password.')
      });
  };

  return (
    <div className="container">
      <div className="welcome">
        <h1 className="title">Welcome to FaveFlix!</h1>
        <p>Looking for your next favorite movie? You've come to the right place! FaveFlix is here to show you Hollywood's greatest films. Make an account or login to start your movie journey.</p>
      </div>

      <Row className="login">
        <Col md={6}>
          <Form noValidate validated={validated}>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please input your username.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please input your password.
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>Login
            </Button>
            <Link to={`/register`}>
              <Button variant="secondary">Create Account</Button>
            </Link>
          </Form>
        </Col>

        <Col id="img" md={6}>
          <img className="main-logo" src="https://cdn4.iconfinder.com/data/icons/online-marketing-hand-drawn-vol-1/52/cinema__movie__reel__video__videoreel__film__media-1024.png" />
        </Col>
      </Row>
    </div>
  );
}
