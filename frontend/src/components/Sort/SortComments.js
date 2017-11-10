import React from 'react';
import {connect} from 'react-redux';
import {sortComments} from '../../actions/comments';
import {SORT_COMMENTS_BY} from '../../actions/types';

export const LABEL = {
  voteScore: 'Ascending',
  timestamp: 'Descending'
}

const SortCommentsOptions = ({activeSort, sortComments}) => {
  const buttons = Object.values(SORT_COMMENTS_BY).map((sortKey) => {
    return (
      <li key={sortKey}>
        <button
          className={activeSort === sortKey ? 'Button Button--small is-active' : 'Button  Button--small'}
          onClick={(e) => {
              sortComments(sortKey)
            }
          }
        >{LABEL[sortKey]}</button>
      </li>
    );
  })

  return (
    <ul className='Sort'>
      <li key='plain' className='Sort-comments'>
        Sort comments
      </li>

      {buttons}
    </ul>
  );
}

const mapStateToProps = state => {
  return {
    activeSort: state.comments.sort
  }
}

export default connect(mapStateToProps, {sortComments})(SortCommentsOptions);
