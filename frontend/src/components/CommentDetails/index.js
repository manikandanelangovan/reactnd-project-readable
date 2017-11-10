import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import format from 'date-fns/format';

import './comment.css';

import {voteComment, deleteComment} from '../../actions/comments';
import {VOTE} from '../../actions/types';

import Score from '../Score';

class Comment extends Component {
  delete = () => {
    const {id, post, deleteComment} = this.props;
    deleteComment(post, id)
  }

  vote = (option) => {
    const {id, post, voteComment} = this.props;
    voteComment(post, id, option);
  }

  voteUp = () => {
    this.vote(VOTE.UP);
  }

  voteDown = () => {
    this.vote(VOTE.DOWN);
  }

  render () {
    const {id, author, body, timestamp, voteScore, post, category} = this.props;

    return (
      <li className='Comment'>
        <p className='Comment-body'>{body}</p>
        <h6 className='Comment-meta'>Submitted by {author}, {format(timestamp, 'D MMM YYYY, HH:ss')}</h6>

        <div className='Comment-links'>
          <Link className='Link' to={`/${category}/${post}/comment/${id}/edit`}>
            Edit comment
          </Link>

          <button className='Link' onClick={this.delete}>
            Delete comment
          </button>
        </div>

        <Score score={voteScore} voteUp={this.voteUp} voteDown={this.voteDown} />
      </li>
    );
  }
}

export default connect(null, {voteComment, deleteComment})(Comment);
