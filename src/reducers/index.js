import { combineReducers } from 'redux';
import { data, itemsHasErrored, itemsIsLoading } from './items';
import { routerReducer } from 'react-router-redux'

export default combineReducers({
    data,
    itemsHasErrored,
    itemsIsLoading,
    reducer: routerReducer
});
