import { combineReducers } from 'redux';

export function itemsHasErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function data(state = {}, action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            console.log(action.items)
            return action.data
        default:
            return state;
    }
}


export function column(state = null, action) {
    switch (action.type) {
        case 'ITEMS_COLUMN':
            console.log(action.items)
            return action.column
        default:
            return state;
    }
}


export function ascordesc(state = null, action) {
    switch (action.type) {
        case 'ITEMS_ASCORDESC':
            console.log(action.items)
            return action.ascordesc
        default:
            return state;
    }
}

export const sortBy = combineReducers({
    column,
    ascordesc,
})

export const ingredients = combineReducers({
    data,
    sortBy,
})