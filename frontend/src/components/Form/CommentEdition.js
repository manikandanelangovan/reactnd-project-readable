import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import CommentForm from './CommentForm';
import {fetchPosts} from '../../actions/posts';
import {fetchComments, saveComment, updateComment} from '../../actions/comments';

class CommentEdition extends Component {
  componentDidMount () {
    const {posts, comments, fetchPosts, fetchComments} = this.props;
    const postID = this.getPostID();

    if (!posts || !posts.fetched) {
      fetchPosts();
    }

    if (!comments || !comments.fetched) {
      fetchComments(postID);
    }
  }

  getPostID () {
    const {match} = this.props;
    return match.params.post;
  }

  getCommentID () {
    const {match} = this.props;
    return match.params.comment;
  }

  getCategoryID () {
    const {match} = this.props;
    return match.params.category;
  }

  submit = (values) => {
    const post = this.getPostID();
    const comment = this.getCommentID();

    const {saveComment, updateComment, history} = this.props;
    if (comment) {
      updateComment(comment, values, () => {
        history.push(`/post/${post}`);
      });
    } else {
      saveComment(post, values, () => {
        history.push(`/post/${post}`);
      });
    }
  }

  getInitialValues () {
    const {comments} = this.props;
    const postID = this.getPostID();
    const commentID = this.getCommentID();
    const postComments = comments.data[postID];
    const comment = postComments[commentID];

    return comment || {};
  }

  render () {
    const {comments, posts} = this.props;
    const post = this.getPostID();
    const category = this.getCategoryID();

    if (!comments.fetched || !posts.fetched) {
      return (
        <div>Loading categories...</div>
      );
    }

    return (
      <div className='Content'>
        <div className='Main Form'>
          <Link className='Form-back' to={post ? `/${category}/${post}` : '/'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M505.943 6.058c-8.077-8.077-21.172-8.077-29.25 0L6.06 476.693c-8.077 8.077-8.077 21.172 0 29.25 4.038 4.04 9.332 6.057 14.625 6.057 5.293 0 10.586-2.02 14.625-6.06L505.943 35.307c8.076-8.076 8.076-21.17 0-29.248z"/>
              <path d="M505.942 476.694L35.306 6.06C27.23-2.02 14.134-2.02 6.058 6.06c-8.077 8.075-8.077 21.17 0 29.247l470.636 470.636c4.038 4.04 9.332 6.058 14.625 6.058 5.292 0 10.586-2.018 14.623-6.056 8.075-8.078 8.075-21.173 0-29.25z"/>
            </svg>
          </Link>

          <CommentForm initialValues={this.getInitialValues()} onSubmit={this.submit} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({comments, posts}) => {
  return { comments, posts };
}

export default connect(
  mapStateToProps,
  {
    fetchComments,
    fetchPosts,
    saveComment,
    updateComment
  }
)(CommentEdition);
