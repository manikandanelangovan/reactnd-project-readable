import React from 'react';
import {matchPath} from 'react-router-dom';

import './header.css';

import Logo from '../Logo';
import Categories from '../Categories';

const Header = ({location}) => {
  const getCurrentCategory = () => {
    let category = [];
    ['/', '/category/:category'].reduce((memo, path) => {
      const match = matchPath(location.pathname, {
        path: path,
        exact: true
      });

      if (match) {
        memo.push(match.params.category || 'all');
      }

      return memo;
    }, category);

    return category.length > 0 ? category[0] : null;
  }

  return (
    <div className="Header">
      <div className='Left'>
        <Logo />
      </div>
      <div className='Main'>
        <Categories category={getCurrentCategory()}/>
      </div>
    </div>
  )
}

export default Header;
