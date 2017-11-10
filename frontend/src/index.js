import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import promise from "redux-promise";

import reducers from "./reducers";
import PostList from './components/PostLists';
import {PostEdition, CommentEdition} from './components/Form';
import PostDetail from './components/PostDetails';
import NotFound from './components/NoPosts';
import Header from './components/Header';

const createStoreWithMiddlewares = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddlewares(reducers)}>
    <Router>
      <div className="Container">
        <Route component={Header} />

        <Switch className="Content">
          <Route path='/' exact component={PostList} />
          <Route path='/category/:category' component={PostList} />
          <Route path='/:category/:post/comment/:comment/edit' component={CommentEdition} />
          <Route path='/:category/:post/comment/new' component={CommentEdition} />
          <Route path='/:category/:post/edit' component={PostEdition} />
          <Route path='/:category/new' exact component={PostEdition} />
          <Route path='/:category/:post' component={PostDetail} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
