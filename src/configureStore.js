import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware } from 'react-router-redux'


import reducers from './reducers';

// Create a history of your choosing (we're using a browser history in this case)
export const history = createHistory();

const configureStore = () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
    // Note: you can supply options to `createLogger()`
  }

  // Build the middleware for intercepting and dispatching navigation actions
  middlewares.push(routerMiddleware(history))

/*  return createStore(
    combineReducers({
    rootReducer,
    router: routerReducer
    }),
    composeWithDevTools(
    	applyMiddleware(...middlewares)
    	)
  );*/

  return createStore(reducers,
    composeWithDevTools(
        applyMiddleware(...middlewares)
    )
  )

/*  return createStore(reducers,
        applyMiddleware(...middlewares)
  )*/

};

export default configureStore;