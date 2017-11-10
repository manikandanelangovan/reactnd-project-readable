import * as ActionTypes from '../actions/types';

const initialState = {
  fetched: false,
  sort:ActionTypes.SORT_POSTS_BY.VOTES
}

export default function (state = initialState, action) {
  let data;

  switch (action.type) {
  case ActionTypes.FETCH_COMMENTS:
    return {
      ...state,
      fetched: true,
      data: {...state.data, ...action.payload}
    }

  case ActionTypes.SORT_COMMENTS:
    return {
      ...state,
      sort: action.payload
    }

  case ActionTypes.UP_VOTE_COMMENT:
    data = {
      ...state.data
    }

    data[action.meta.post][action.payload].voteScore += 1;

    return {
      ...state,
      data
    }

  case ActionTypes.DOWN_VOTE_COMMENT:
    data = {
      ...state.data
    }

    data[action.meta.post][action.payload].voteScore -= 1;

    return {
      ...state,
      data
    }

  case ActionTypes.DELETE_COMMENT:
    data = {
      ...state.data
    }

    delete data[action.meta.post][action.payload];

    return {
      ...state,
      data
    }

  case ActionTypes.NEW_COMMENT:
    data = {
      ...state.data
    }

    data[action.payload.parentId][action.payload.id] = action.payload;

    return {
      ...state,
      data
    }

  case ActionTypes.UPDATE_COMMENT:
    data = {
      ...state.data
    }

    data[action.payload.parentId][action.payload.id] = action.payload;

    return {
      ...state,
      data
    }


  default:
    return state;
  }
}
