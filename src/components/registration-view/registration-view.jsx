import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = () => {
    e.preventDefault();
    console.log(username, password, email, birthday);
  };

  return (
    <Row>
      <Col>
        <Form>
          <Form.Group>
            <label>
              Username:
              <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            </label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Password:
              <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            </Form.Label>
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Email:
            </Form.Label>
            <Form.Control type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Birthday:
            </Form.Label>
            <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
          </Form.Group>
          <Button type="submit" onClick={handleSubmit}>Submit
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
