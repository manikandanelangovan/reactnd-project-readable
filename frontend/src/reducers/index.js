import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import PostsReducer from './postsReducer';
import CommentsReducer from './commentsReducer';
import CategoriesReducer from './categoriesReducer';

export default combineReducers({
  posts: PostsReducer,
  comments: CommentsReducer,
  categories: CategoriesReducer,
  form: formReducer
});
