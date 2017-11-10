import React, { Component} from 'react';
import {connect} from 'react-redux';
import format from 'date-fns/format';
import {Link, Redirect} from 'react-router-dom';
import './postdetails.css';

import {fetchPosts, votePost, deletePost} from '../../actions/posts';
import {fetchComments} from '../../actions/comments';
import {VOTE} from '../../actions/types';
import {SortComments} from '../Sort';
import Comment from '../CommentDetails';
import Score from '../Score';
import Loading from '../Loading';

class PostDetail extends Component {
  componentDidMount () {
    const {fetchPosts, fetchComments, posts, comments} = this.props;
    const postID = this.getPostID();

    if (!posts || !posts.fetched) {
      fetchPosts();
    }

    if (!comments || !comments.fetched || !comments.data[postID]) {
      fetchComments(postID);
    }
  }

  getPostID () {
    const {match} = this.props;
    return match.params.post;
  }

  getCategoryID () {
    const {match} = this.props;
    return match.params.category;
  }

  deletePostHandler = () => {
    const postID = this.getPostID();
    const {deletePost, history} = this.props;
    deletePost(postID, () => {
      history.push("/");
    })
  }

  vote = (option) => {
    const post = this.getPostID();
    const {votePost} = this.props;
    votePost(post, option);
  }

  voteUp = () => {
    this.vote(VOTE.UP);
  }

  voteDown = () => {
    this.vote(VOTE.DOWN);
  }

  renderPost () {
    const {posts} = this.props;
    const postID = this.getPostID();
    const category = this.getCategoryID();
    const post = posts.data[postID];
    const {author, title, body, timestamp, voteScore} = post;

    return (
      <div>
        <h1 className='Post-title'>{title}</h1>
        <h6 className='Post-meta'>Submitted by <span>{author}</span>, {format(timestamp, 'D MMM YYYY')}</h6>

        <div className='Post-links'>
          <Link className='Link' to={`/${category}/${postID}/edit`}>
            Edit post
          </Link>
          <button className='Link' onClick={this.deletePostHandler}>
            Delete post
          </button>
        </div>

        <p className='Post-body'>{body}</p>

        <Score score={voteScore} voteUp={this.voteUp} voteDown={this.voteDown} />
      </div>
    );
  }

  sortComments () {
    const {comments} = this.props;
    const sortKey = comments.sort;
    const postID = this.getPostID();
    const postComments = comments.data[postID];

    if (!postComments || Object.keys(postComments).length === 0) {
      return [];
    }

    return Object.values(postComments).sort((a, b) => {
      return b[sortKey] - a[sortKey]
    });
  }

  renderComments () {
    const postComments = this.sortComments();
    const postID = this.getPostID();
    const categoryID = this.getCategoryID();

    if (postComments.length > 0) {
      return (
        <div>
          <SortComments />
          <ul>
          {
            postComments.map((comment) => {
              const {id} = comment;
              return (
                <Comment key={id} category={categoryID} post={postID} {...comment} />
              );
            })
          }
          </ul>
        </div>
      );
    } else {
      return (
        <div className='Post-comments'>No comments yet. Be the first!</div>
      );
    }
  }

  render () {
    const {posts, comments} = this.props;
    const postID = this.getPostID();
    const category = this.getCategoryID();

    if (!posts.fetched || !comments.fetched) {
      return (
        <Loading />
      );
    } else {

      const post = posts.data[postID];

      if (!post) {
        return (
          <Redirect to='/404' />
        );
      }

      return (
        <div className='Content'>
          <div className='Main'>
            {this.renderPost()}
            {this.renderComments()}

            <Link title='Add new comment' className='Rounded Add-comment' to={`/${category}/${postID}/comment/new`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M439.025 0H72.975C32.737 0 0 32.737 0 72.975v418.342c0 8.366 5.04 15.907 12.77 19.108 2.557 1.06 5.245 1.576 7.91 1.576 5.38 0 10.67-2.1 14.627-6.057l98.528-98.527h305.19c40.238 0 72.974-32.738 72.974-72.976V72.975C512 32.737 479.263 0 439.024 0zm31.61 334.438c0 17.43-14.18 31.612-31.61 31.612H125.267c-5.486 0-10.746 2.18-14.625 6.058l-69.28 69.28V72.974c0-17.43 14.182-31.61 31.612-31.61h366.05c17.43 0 31.61 14.18 31.61 31.61v261.463z"/>
              </svg>
            </Link>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = ({comments, posts}) => {
  return { comments, posts };
}

export default connect(mapStateToProps, {fetchComments, fetchPosts, votePost, deletePost})(PostDetail);
