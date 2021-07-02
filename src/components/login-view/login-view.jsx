import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './login-view.scss'

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  return (
    <div className="container">
      <div className="welcome">
        <h1 className="title">Welcome to FaveFlix!</h1>
        <p>Looking for your next favorite movie? You've come to the right place! FaveFlix is here to show you Hollywood's greatest films. Make an account or login to start your movie journey.</p>
      </div>
      <div>
        <div className="login">
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
            <Button variant="secondary" type="">Create Account</Button>
          </Form>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
}
