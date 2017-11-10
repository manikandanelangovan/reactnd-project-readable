import axios from 'axios';

import {URL, API_KEY} from '../config';
import * as ActionTypes from './types';
var uuid = require('uuid-v4');

export function fetchComments (postID) {
  const url = `${URL}/posts/${postID}/comments`;
  const config = {
    headers: {'Authorization': API_KEY}
  }

  const request = axios.get(url, config)
    .then(comments => {
      let result = {};
      result[postID] = comments.data.reduce((result, comment) => {
        result[comment.id] = comment;
        return result;
      }, {});
      return result;
    })

  return {
    type: ActionTypes.FETCH_COMMENTS,
    payload: request
  }
}

export function sortComments (byKey) {
  return {
    type: ActionTypes.SORT_COMMENTS,
    payload: byKey
  }
}

export function voteComment (postID, commentID, option) {
  const url = `${URL}/comments/${commentID}`;
  const config = {
    headers: {'Authorization': API_KEY}
  }

  const data = {
    option
  }

  axios.post(url, data, config);

  return {
    type: option === ActionTypes.VOTE.UP ? ActionTypes.UP_VOTE_COMMENT : ActionTypes.DOWN_VOTE_COMMENT,
    payload: commentID,
    meta: {
      post: postID
    }
  }
}

export function deleteComment (postID, commentID) {
  const url = `${URL}/comments/${commentID}`;
  const config = {
    headers: {'Authorization': API_KEY}
  }

  axios.delete(url, config);

  return {
    type: ActionTypes.DELETE_COMMENT,
    payload: commentID,
    meta: {
      post: postID
    }
  }
}

export function saveComment (postID, values, callback) {
  const url = `${URL}/comments`;
  const config = {
    headers: {'Authorization': API_KEY}
  }
  const metadata = {
    id: uuid(),
    timestamp: Date.now(),
    parentId: postID,
    voteScore: 1
  }
  const data = {
    ...values,
    ...metadata
  }

  axios.post(url, data, config)
    .then(() => callback());

  return {
    type: ActionTypes.NEW_COMMENT,
    payload: data
 }
}

export function updateComment (commentID, values, callback) {
  const url = `${URL}/comments/${commentID}`;
  const config = {
    headers: {'Authorization': API_KEY}
  }
  const metadata = {
    timestamp: Date.now()
  }
  const data = {
    ...values,
    ...metadata
  }

  axios.put(url, data, config)
    .then(() => callback());

  return {
    type: ActionTypes.UPDATE_COMMENT,
    payload: data
  }
}
