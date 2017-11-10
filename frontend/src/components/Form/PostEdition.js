import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import PostForm from './PostForm';
import {fetchCategories} from '../../actions/categories';
import {fetchPosts, savePost, updatePost} from '../../actions/posts';
import Loading from '../Loading';

class PostEdition extends Component {
  componentDidMount () {
    const {categories, posts, fetchCategories, fetchPosts} = this.props;
    const fetchedCategories = categories && categories.fetched;
    const fetchedPosts = posts && posts.fetched;
    !fetchedCategories && fetchCategories();
    !fetchedPosts && fetchPosts();
  }

  submit = (values) => {
    const post = this.getPostID();
    const {savePost, updatePost, history} = this.props;
    if (post) {
      updatePost(post, values, () => {
        history.push(`/post/${post}`);
     });
    } else {
      savePost(values, () => {
        history.push('/');
      });
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

  getInitialValues () {
    const {posts} = this.props;
    const post = this.getPostID();
    const category = this.getCategoryID();
    if (post) {
      return posts.data[post];
    } else {
      return {
        category
      }
    }
  }

  render () {
    const { categories, posts} = this.props;
    const fetchedCategories = categories && categories.fetched;
    const fetchedPosts = posts && posts.fetched;
    const fetched = fetchedCategories && fetchedPosts;
    const post = this.getPostID();
    const category = this.getCategoryID();

    if (!fetched) {
      return (
        <Loading />
      );
    }

    return (
      <div className='Content'>
        <div className='Main'>
          <Link className='Form-back' to={post ? `/${category}/${post}` : '/'}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M505.943 6.058c-8.077-8.077-21.172-8.077-29.25 0L6.06 476.693c-8.077 8.077-8.077 21.172 0 29.25 4.038 4.04 9.332 6.057 14.625 6.057 5.293 0 10.586-2.02 14.625-6.06L505.943 35.307c8.076-8.076 8.076-21.17 0-29.248z"/>
              <path d="M505.942 476.694L35.306 6.06C27.23-2.02 14.134-2.02 6.058 6.06c-8.077 8.075-8.077 21.17 0 29.247l470.636 470.636c4.038 4.04 9.332 6.058 14.625 6.058 5.292 0 10.586-2.018 14.623-6.056 8.075-8.078 8.075-21.173 0-29.25z"/>
            </svg>
          </Link>
          <PostForm initialValues={ this.getInitialValues()} categories={categories.data} onSubmit={this.submit} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({categories, posts}) => {
  return { categories, posts };
}

export default connect(mapStateToProps,
  {
    fetchCategories,
    fetchPosts,
    savePost,
    updatePost
 })(PostEdition);
