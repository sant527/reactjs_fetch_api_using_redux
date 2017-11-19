import { combineReducers } from 'redux';
import { ingredients, itemsHasErrored, itemsIsLoading } from './items';
import { routerReducer } from 'react-router-redux'
import { loadingBarReducer } from 'react-redux-loading-bar'


export default combineReducers({
    ingredients,
    itemsHasErrored,
    itemsIsLoading,
    reducer: routerReducer,
    loadingBar: loadingBarReducer,
});
