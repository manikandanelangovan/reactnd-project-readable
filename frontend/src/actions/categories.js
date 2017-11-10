import axios from 'axios';

import {URL, API_KEY} from '../config';
import * as ActionTypes from './types';

export function fetchCategories () {
  const url = `${URL}/categories`;
  const config = {
    headers: {'Authorization': API_KEY}
  }

  const request = axios.get(url, config);

  return {
    type: ActionTypes.FETCH_CATEGORIES,
    payload: request
  }
}
