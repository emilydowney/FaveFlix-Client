import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './genre-view.scss';

export class GenreView extends React.Component {

  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Row className="genre-view">
        <Col md={11}>
          <h5 className="genre-name">
            <span className="value">{genre.Name}</span>
          </h5>

          <div className="genre-description">
            <span className="label">Description: </span>
            <span className="value">{genre.Description}</span>
          </div>

          <Button onClick={() => { onBackClick(); }}>Back</Button>
        </Col>
      </Row>
    );
  }
}