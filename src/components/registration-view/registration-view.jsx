import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [validated, setValidated] = useState(false);


  const handleSubmit = e => {
    e.preventDefault();

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
    }
    setValidated(true)

    // Post request to create a new user
    axios.post('https://a-movies-api.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      .then(response => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('error registering the user')
      })
  }

  return (
    <div className="container">
      <Row className="registration-view">
        <Col md={6}>
          <h5>Sign Up</h5>
          <p>Fill out the form below to create your account.</p>
          <Form noValidate validated={validated}>

            <Form.Group>
              <Form.Label>
                Username:
                <Form.Control
                  type="text"
                  placeholder="Username"
                  value={username}
                  minLength="5"
                  onChange={e => setUsername(e.target.value)}
                  required />
                <Form.Text className="text-muted">
                  Username must contain a minimum of 5 characters. No special characters.
                </Form.Text>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please create a username at least 5 characters in length. Alphanumeric characters only.
                </Form.Control.Feedback>
              </Form.Label>
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Password:
                <Form.Control
                  type="password"
                  placeholder="Password"
                  minLength="5"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required />
                <Form.Text className="text-muted">
                  Password must contain a minimum of 5 characters.
                </Form.Text>
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  Please create a password at least 5 characters in length.
                </Form.Control.Feedback>
              </Form.Label>
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Email:
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              <Form.Control.Feedback type="invalid">
                Please input a valid email address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Label>
                Birthday:
              </Form.Label>
              <Form.Control
                type="date" value={birthday}
                onChange={e => setBirthday(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Button
                type="submit"
                onClick={handleSubmit}>Submit
              </Button>
              <Link to="/">
                <Button variant="secondary">Back</Button>
              </Link>
            </Form.Group>
          </Form>
        </Col>

        <Col id="img" className="logo" md={6}>
          <img className="main-logo" alt="FaveFlix movie logo" src="https://cdn4.iconfinder.com/data/icons/online-marketing-hand-drawn-vol-1/52/cinema__movie__reel__video__videoreel__film__media-1024.png" />
        </Col>
      </Row>
    </div>
  );
}
