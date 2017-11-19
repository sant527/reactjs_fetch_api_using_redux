import axios from 'axios';
import { showLoading, hideLoading } from 'react-redux-loading-bar'

export function itemsHasErrored(bool) {
    console.log("itemsIsLoading",bool)
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    console.log("itemsIsLoading",bool)
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(data) {
    console.log("itemsFetchDataSuccess",data)
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        data
    };
}

export function itemscolumn(column) {
    return {
        type: 'ITEMS_COLUMN',
        column: column
    };
}


export function itemsascordesc(ascordesc) {
    return {
        type: 'ITEMS_ASCORDESC',
        ascordesc: ascordesc
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        dispatch(showLoading())
        axios.get(url)
            .then(response => {
                console.log("inside axiostesting :: response.data :: " + response)
                console.log(response.data)
                dispatch(itemsIsLoading(false));
                dispatch(itemsFetchDataSuccess(response.data))
                dispatch(hideLoading())
            },
            error => {
                console.log("inside axiostesting :: error :: " + error)
                dispatch(itemsHasErrored(true))
                dispatch(hideLoading())
                throw(error);
            });
    };
}


export function itemsFetchDataSortBy(column,ascordesc,url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        dispatch(showLoading())
        axios.get(url)
            .then(response => {
                console.log("inside axiostesting :: response.data :: " + response)
                console.log(response.data)
                dispatch(itemsIsLoading(false));
                dispatch(itemsFetchDataSuccess(response.data))
                dispatch(itemscolumn(column));
                dispatch(itemsascordesc(ascordesc));
                dispatch(hideLoading())
            },
            error => {
                console.log("inside axiostesting :: error :: " + error)
                dispatch(itemsHasErrored(true))
                dispatch(hideLoading())
                throw(error);
            })
    };
}
