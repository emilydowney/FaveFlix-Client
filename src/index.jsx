import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';

class MoviesApplication extends React.Component {
  render() {
    return (
      <div className='my-flix'>
        <div>Good morning</div>
      </div>
    );
  }
}

const container = document.getElementsByClassName('app-container')[0];

ReactDOM.render(React.createElement(MoviesApplication), container);