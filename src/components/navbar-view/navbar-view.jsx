import React from 'react';
import { Navbar } from 'react-bootstrap';

export class Nav extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img src="../imgs/logo.jpg" width="30" height="30" className="d-inline-block align-top" alt="" />
          Movies
        </Navbar.Brand>
      </Navbar>
    )
  }
};