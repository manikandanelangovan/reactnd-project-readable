import React from 'react';
import {Link} from 'react-router-dom';

import './logo.css';

const Logo = () => {
  return (
    <h1 className='Logo'>
      <Link to='/'>Readable</Link>
    </h1>
  );
}

export default Logo;