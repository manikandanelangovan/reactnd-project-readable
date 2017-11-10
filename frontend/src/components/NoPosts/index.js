import React from 'react';
import {Link} from 'react-router-dom';

import './noPosts.css';

export default () => {
  return (
    <div className='Content'>
      <div className='Main'>
        <h1 className='Not-found'>No Posts Found!, Please go to <Link to='/'>Home</Link>.</h1>
      </div>
    </div>
  );
}
