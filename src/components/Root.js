import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'


import ItemList from './ItemList'

export const history = createHistory();


const Root = ({ store }) => (
	<Provider store={store}>
	    <ConnectedRouter history={history}>
		    <div>
	        	<Route path="/" component={ ItemList }/>
	        </div>
    	</ConnectedRouter>
	</Provider>
);

export default Root;