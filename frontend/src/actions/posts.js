import axios from 'axios';

import {URL, API_KEY} from '../config';
import * as ActionTypes from './types';
var uuid = require('uuid-v4');

export function fetchPosts () {
  const postUrl = `${URL}/posts`;
  const config = {
    headers: {'Authorization': API_KEY}
  }

  let postsWithComments;

  const request = axios.get(postUrl, config)
    .then((posts) => {
      // Working with an indexed object instead array for posts
      postsWithComments = posts.data.reduce((result, value) => {
        result[value.id] = value;
        return result;
      }, {});

      // for every post we need to get the number of comments in order to be
      // able to sort by popular (number of comments)
      return Promise.all(posts.data.map(post => {
        const postCommentsUrl = `${URL}/posts/${post.id}/comments`;
        return axios.get(postCommentsUrl, config)
          .then(comments => {
            return {
              id: post.id,
              comments: comments.data.length
            }
          });
      }))
        .then(values => {
          return values.reduce((result, value) => {
            result[value.id].comments = value.comments;
            return result;
          }, postsWithComments);
        })
      }
    );

  return {
    type: ActionTypes.FETCH_POSTS,
    payload: request
  }
}

export function sortPosts (byKey) {
  return {
    type: ActionTypes.SORT_POSTS,
    payload: byKey
  }
}

export function votePost (postID, option) {
  const url = `${URL}/posts/${postID}`;
  const config = {
    headers: {'Authorization': API_KEY}
  }

  const data = {
    option
  }

  axios.post(url, data, config);

  return {
    type: option === ActionTypes.VOTE.UP ? ActionTypes.UP_VOTE_POST : ActionTypes.DOWN_VOTE_POST,
    payload: postID
  }
}

export function deletePost (postID, callback) {
  const url = `${URL}/posts/${postID}`;
  const config = {
    headers: {'Authorization': API_KEY}
  }

  axios.delete(url, config)
  .then(() => callback && callback());

  return {
    type: ActionTypes.DELETE_POST,
    payload: postID
  }
}

export function savePost (values, callback) {
  const url = `${URL}/posts`;
  const config = {
    headers: {'Authorization': API_KEY}
  }
  const metadata = {
    id: uuid(),
    timestamp: Date.now()
  }
  const data = {
    ...values,
    ...metadata
  }

  axios.post(url, data, config)
    .then(() => callback());

  return {
    type: ActionTypes.NEW_POST,
    payload: data
  }
}

export function updatePost (postID, values, callback) {
  const url = `${URL}/posts/${postID}`;
  const config = {
    headers: {'Authorization': API_KEY}
  }
  const metadata = {
    id: postID
  }
  const data = {
    ...values,
    ...metadata
  }

  axios.put(url, values, config)
    .then(() => callback());

  return {
    type: ActionTypes.UPDATE_POST,
    payload: data
  }
}
