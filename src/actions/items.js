import axios from 'axios';

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

export function itemsFetchDataSuccess(items) {
    console.log("itemsFetchDataSuccess",items)
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export function itemsFetchData(url) {
    return (dispatch) => {
        dispatch(itemsIsLoading(true));

        axios.get(url)
            .then(response => {
                console.log("inside axiostesting :: response.data :: " + response)
                console.log(response.data)
                dispatch(itemsIsLoading(false));
                dispatch(itemsFetchDataSuccess(response.data.results))
            },
            error => {
                console.log("inside axiostesting :: error :: " + error)
                dispatch(itemsHasErrored(true))
                throw(error);
            })
    };
}
