import React, { useState } from 'react';
import { RegistrationView } from '../registration-view/registration-view';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../../imgs/movieicon.svg';

import './login-view.scss'

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  const mainLogo = <img src={logo} />;

  return (
    <div className="container">
      <div className="welcome">
        <h1 className="title">Welcome to FaveFlix!</h1>
        <p>Looking for your next favorite movie? You've come to the right place! FaveFlix is here to show you Hollywood's greatest films. Make an account or login to start your movie journey.</p>
      </div>
      <Row className="login">
        <Col md={6}>
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={handleSubmit}>Login
            </Button>
            <Button variant="secondary">Create Account</Button>
          </Form>
        </Col>
        <Col id="img" md={6}>
          <img className="main-logo" src="https://cdn4.iconfinder.com/data/icons/online-marketing-hand-drawn-vol-1/52/cinema__movie__reel__video__videoreel__film__media-1024.png" />
        </Col>
      </Row>
    </div>
  );
}
