import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import './categories.css';

import {fetchCategories} from '../../actions/categories';

class Categories extends Component {
  componentDidMount () {
    const {categories, fetchCategories} = this.props;
    const fetched = categories && categories.fetched;
    !fetched && fetchCategories();
  }

  renderCategory (name, path) {
    const current = this.props.category;
    const category = `${name.substring(0, 1).toUpperCase()}${name.substring(1)}`;

    const css = current === name ? 'is-active' : '';
    return (
      <li key={name}>
        <Link className={css} to={path}>{category}</Link>
      </li>
    );
  }

  renderCategories (categories) {
    return categories.map((category) => {
      const path = `/category/${category.path}`;
      const {name} = category;
      return this.renderCategory(name, path);
    });
  }

  render () {
    const {categories} = this.props;
    const {fetched} = categories;

    if (!fetched) {
      return null;
    }

    return (
      <ul className='Categories'>
        {this.renderCategory('all', '')}
        {this.renderCategories(categories.data)}
      </ul>
    );
  }
}

const mapStateToPros = ({categories}) => {
  return { categories };
}

export default connect(mapStateToPros, {fetchCategories})(Categories);
