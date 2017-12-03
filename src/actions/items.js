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

export function itemsHasErroredform(bool) {
    console.log("itemsIsLoading",bool)
    return {
        type: 'ITEMS_HAS_ERRORED_FORM',
        hasErrored: bool
    };
}

export function itemsIsLoadingform(bool) {
    console.log("itemsIsLoading",bool)
    return {
        type: 'ITEMS_IS_LOADING_FORM',
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

export function itemsFetchDataSuccessform(data) {
    console.log("itemsFetchDataSuccessform",data)
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS_FORM',
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

export function itemcolumnfilter(column,text) {
    return {
        type: 'ITEMS_FILTERTEXT',
        column: column,
        text: text,
    };
}

export function itemspagenumber(pagenumber) {
    return {
        type: 'ITEMS_PAGENUMBER',
        pagenumber: pagenumber,
    };
}

export function itemsperpage(perpage) {
    return {
        type: 'ITEMS_PERPAGE',
        perpage: perpage,
    };
}

export function itemcount(itemcount) {
    return {
        type: 'ITEMS_ITEMCOUNT',
        itemcount: itemcount,
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
                dispatch(itemcount(response.data.count))
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

export function itemsFetchDataform(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));
        dispatch(showLoading())
        axios.get(url)
            .then(response => {
                console.log("inside axiostesting :: response.data :: " + response)
                console.log(response.data)
                dispatch(itemsIsLoadingform(false));
                dispatch(itemsFetchDataSuccessform(response.data))
                dispatch(hideLoading())
            },
            error => {
                console.log("inside axiostesting :: error :: " + error)
                dispatch(itemsHasErroredform(true))
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
