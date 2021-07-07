import React from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './director-view.scss';

export class DirectorView extends React.Component {

  render() {
    const { director, onBackClick } = this.props;

    return (
      <Row className="director-view">
        <Col md={11}>
          <h5 className="director-name">
            <span className="value">{director.Name}</span>
          </h5>

          <div className="director-bio">
            <span className="label">Bio: </span>
            <span className="value">{director.Bio}</span>
          </div>

          <div className="director-year">
            <span className="label">Born: </span>
            <span className="value">{director.Birth}</span>
          </div>
          <Button onClick={() => { onBackClick(); }}>Back</Button>
        </Col>
      </Row>
    );
  }
}