import React from 'react';
import axios from 'axios';
import { Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {

  // Adds a movie to a user's favorites list
  addFavorite(movie) {
    const token = localStorage.getItem('token');
    const url = 'https://a-movies-api.herokuapp.com/users/' + localStorage.getItem('user') + '/favorites/' + movie._id;

    axios.post(url, '', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((response) => {
        alert(movie.Title + ' was added to your favorites!')
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Row className="movie-view">
        <Col md={6}>
          <img className="movie-poster" src={movie.ImageURL} />
        </Col>
        <Col md={6}>
          <h5 className="movie-title">
            <span className="value">{movie.Title}</span>
          </h5>
          <div className="movie-year">
            <span className="label">Release: </span>
            <span className="value">{movie.Release}</span>
          </div>
          <div className="movie-director">
            <span className="label">Director: </span>
            <Link to={`/directors/${movie.Director.Name}`}>
              {movie.Director.Name}
            </Link>
          </div>
          <div className="movie-genre">
            <span className="label">Genre: </span>
            <Link to={`/genres/${movie.Genre.Name}`}>
              {movie.Genre.Name}
            </Link>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>
          <Button onClick={() => { this.addFavorite(movie); }}>Add Favorite</Button>
          <Button className="btn-secondary" onClick={() => { onBackClick(); }}>Back</Button>
        </Col>
      </Row>
    );
  }
}