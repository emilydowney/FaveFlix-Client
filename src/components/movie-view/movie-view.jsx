import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './movie-view.scss';

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row className="movie-view">
        <Col md={6}>
          <img className="movie-poster" src={movie.ImageURL} />
        </Col>
        <Col md={6}>
          <h5 className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </h5>
          <div className="movie-year">
            <span className="label">Release: </span>
            <span className="value">{movie.Release}</span>
          </div>
          <div className="movie-director">
            <span className="label">Director: </span>
            <span className="value">{movie.Director.Name}</span>
          </div>
          <div className="movie-genre">
            <span className="label">Genre: </span>
            <span className="value">{movie.Genre.Name}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>
          <Button onClick={() => { onBackClick(null); }}>Back</Button>
        </Col>
      </Row>
    );
  }
}