import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';

import './user-view.scss';
import axios from 'axios';

export function UserView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');


  const handleSubmit = () => {
    e.preventDefault();
    console.log(username, password, email, birthday);
  };

  axios.put('https://a-movies-api.herokuapp.com/users/:', {
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
    });

  return (
    <div className="container">
      <Row className="registration-view">
        <Col md={6}>
          <h5>Sign Up</h5>
          <p>Fill out the form below to create your account.</p>
          <Form>
            <Form.Group>
              <Form.Label>
                Username:
                <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required />
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Password:
                <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
              </Form.Label>
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Email:
              </Form.Label>
              <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>
                Birthday:
              </Form.Label>
              <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
            </Form.Group>
            <Form.Group>
              <Button type="submit" onClick={handleSubmit}>Submit
              </Button>
              <Link to="/"><Button>Back</Button></Link>
            </Form.Group>
          </Form>
        </Col>
        <Col id="img" md={6}>
          <img className="main-logo" src="https://cdn4.iconfinder.com/data/icons/online-marketing-hand-drawn-vol-1/52/cinema__movie__reel__video__videoreel__film__media-1024.png" />
        </Col>
      </Row>
    </div>
  );
}
