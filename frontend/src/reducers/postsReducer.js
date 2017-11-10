  import * as ActionTypes from '../actions/types';

const initialState = {
  fetched: false,
  sort: ActionTypes.SORT_POSTS_BY.VOTES
}

export default function (state = initialState, action) {
  let data;

  switch (action.type) {
  case ActionTypes.FETCH_POSTS:
    return {
      ...state,
      fetched: true,
      data: action.payload
    }

  case ActionTypes.SORT_POSTS:
    return {
      ...state,
      sort: action.payload
    }

  case ActionTypes.UP_VOTE_POST:
    data = {
      ...state.data
    }
    data[action.payload].voteScore += 1;

    return {
      ...state,
      data
    }

  case ActionTypes.DOWN_VOTE_POST:
    data = {
      ...state.data
    }
    data[action.payload].voteScore -= 1;

    return {
      ...state,
      data
    }

  case ActionTypes.DELETE_POST:
    data = {
      ...state.data
    }
    delete data[action.payload];

    return {
      ...state,
      data
    }

  case ActionTypes.DELETE_COMMENT:
    data = {
      ...state.data
    }
    data[action.meta.post].comments -= 1;

    return {
      ...state,
      data
    }

  case ActionTypes.NEW_POST:
    data = {
      ...state.data
    }

    const newData = {
      comments: 0,
      voteScore: 0
    }

    data[action.payload.id] = {
      ...action.payload,
      ...newData
    }

    return {
      ...state,
      data
    }

  case ActionTypes.UPDATE_POST:
    data = {
      ...state.data
    }

    data[action.payload.id] = {
      ...state.data[action.payload.id],
      ...action.payload
    }

    return {
      ...state,
      data
    }

  case ActionTypes.NEW_COMMENT:
    data = {
      ...state.data
    }

    data[action.payload.parentId].comments += 1;

    return {
      ...state,
      data
    }

  default:
    return state;
  }
}
