import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {SortPosts} from '../Sort';
import PostListItem from './PostListItem';
import Loading from '../Loading';

import {fetchPosts} from '../../actions/posts';

import './postlist.css';

class PostList extends Component {
  componentDidMount () {
    const {posts, fetchPosts} = this.props;
    const fetched = posts && posts.fetched;

    !fetched && fetchPosts();
  }

  filterAndSort () {
    const {posts, match} = this.props;
    const category = match.params.category || 'all';
    const sortKey = posts.sort;

    let filtered = Object.values(posts.data);

    if (category !== 'all') {
      filtered = filtered.filter(post => {
        return post.category === category;
      })
    }

    return filtered.sort((a, b) => {
      return b[sortKey] - a[sortKey]
    });
  }

  renderPosts () {
    const {match} = this.props;
    const posts = this.filterAndSort();
    const category = match.params.category || 'all';

    if (posts.length === 0) {
      return (
        <div className='No-posts'>There is no post in <span>{category}</span> category.</div>
      );
    }

    return (
      <div>
        <SortPosts />
        {
          posts.map(post => <PostListItem key={post.id} {...post} />)
        }
      </div>
    );
  }

  render () {
    const {posts, match} = this.props;
    const category = match.params.category || 'all';

    if (!posts.fetched) {
      return (
        <Loading />
      );
    }

    return (
      <div className='Content'>
        <div className='Main'>

          <Link title='Add new post' className='Rounded Add-post' to={`/${category}/new`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 0c-11.422 0-20.682 9.26-20.682 20.682v470.636c0 11.423 9.26 20.682 20.682 20.682 11.423 0 20.682-9.26 20.682-20.682V20.682C276.682 9.26 267.422 0 256 0z"/>
              <path d="M491.318 235.318H20.682C9.26 235.318 0 244.578 0 256c0 11.423 9.26 20.682 20.682 20.682h470.636c11.423 0 20.682-9.26 20.682-20.682 0-11.422-9.26-20.682-20.682-20.682z"/>
            </svg>
          </Link>

          <ul>
            {this.renderPosts()}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToPros = ({posts}) => {
  return { posts };
}

export default connect(mapStateToPros, {fetchPosts})(PostList);
