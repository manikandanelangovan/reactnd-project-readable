import React from 'react';
import {connect} from 'react-redux';
import {sortPosts} from '../../actions/posts';
import {SORT_POSTS_BY} from '../../actions/types';

import './sort.css';

export const LABEL = {
  voteScore: 'Ascending',
  comments: 'Popular',
  timestamp: 'Descending'
}

const SortPostsOptions = ({activeSort, sortPosts}) => {
  const buttons = Object.values(SORT_POSTS_BY).map((sortKey) => {
    return (
      <li key={sortKey}>
        <button
          className={activeSort === sortKey ? 'Button is-active' : 'Button'}
          onClick={(e) => {
              sortPosts(sortKey)
            }
          }
        >{LABEL[sortKey]}</button>
      </li>
    );
  })

  return (
    <ul className="Sort">
      {buttons}
    </ul>
  );
}

const mapStateToProps = state => {
  return {
    activeSort: state.posts.sort
  }
}

export default connect(mapStateToProps, {sortPosts})(SortPostsOptions);
