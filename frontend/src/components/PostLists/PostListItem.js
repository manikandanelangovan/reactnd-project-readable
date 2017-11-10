import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {votePost, deletePost} from '../../actions/posts';
import {VOTE} from '../../actions/types';
import format from 'date-fns/format';
import Score from '../Score';

import './postlistitem.css';

const PostListItem = (props) => {
  const {id, author, title, timestamp, comments, voteScore, votePost, deletePost, category} = props;

  const voteUp = (e) => {
    votePost(id, VOTE.UP);
  }

  const voteDown = (e) => {
    votePost(id, VOTE.DOWN);
  }

  return (
    <li className='PostItem'>
      <h2 className='PostItem-title'>
        <Link to={`/${category}/${id}`}>
          {title}
        </Link>
      </h2>

      <div className='PostItem-meta'>
        <div>
          Submitted by <span className='PostItem-author'>{author}</span>, {format(timestamp, 'D MMM YYYY')}
        </div>

        <div>{comments} comments</div>
      </div>

      <Score score={voteScore} voteUp={voteUp} voteDown={voteDown} />

      <button className='Link PostItem-delete' onClick={(e) => deletePost(id)}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M467.786 94.127H44.214c-11.422 0-20.682 9.26-20.682 20.682s9.26 20.68 20.682 20.68h423.572c11.423 0 20.682-9.26 20.682-20.68s-9.26-20.683-20.682-20.683z"/>
          <path d="M420.722 94.127c-11.423 0-20.682 9.26-20.682 20.682v329.444c0 14.547-11.835 26.38-26.38 26.38H138.34c-14.546 0-26.38-11.834-26.38-26.38V114.81c0-11.423-9.26-20.683-20.682-20.683-11.422 0-20.682 9.26-20.682 20.682v329.444c0 37.355 30.39 67.746 67.746 67.746H373.66c37.355 0 67.746-30.39 67.746-67.746V114.81c0-11.423-9.26-20.683-20.684-20.683z"/>
          <path d="M303.064 0h-94.127c-37.355 0-67.746 30.39-67.746 67.746v47.064c0 11.422 9.26 20.682 20.683 20.682 11.422 0 20.682-9.26 20.682-20.682V67.746c0-14.547 11.835-26.38 26.38-26.38h94.128c14.547 0 26.38 11.834 26.38 26.38v47.064c0 11.422 9.26 20.682 20.683 20.682s20.682-9.26 20.682-20.682V67.746C370.808 30.39 340.418 0 303.064 0zM208.936 211.786c-11.422 0-20.682 9.26-20.682 20.682v141.19c0 11.424 9.26 20.683 20.682 20.683s20.682-9.258 20.682-20.68V232.467c0-11.422-9.26-20.682-20.682-20.682zM303.064 211.786c-11.423 0-20.682 9.26-20.682 20.682v141.19c0 11.424 9.26 20.683 20.682 20.683 11.423 0 20.682-9.258 20.682-20.68V232.467c0-11.422-9.26-20.682-20.682-20.682z"/>
        </svg>
      </button>
    </li>
  );
}

export default connect(null, {votePost, deletePost})(PostListItem);
