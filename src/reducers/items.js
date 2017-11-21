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


export function filterstatus(state = false, action) {
    switch (action.type) {
        case 'ITEMS_FILTERSTATUS':
            console.log(action.items)
            return action.ascordesc
        default:
            return state;
    }
}


export function filtertext(state = [], action) {
    switch (action.type) {
        case 'ITEMS_FILTERTEXT':
            var index = state.findIndex(x => x.column === action.column);
            console.log("index: ",index);
            if (index === -1)
                return [
                    ...state,
                    {
                        column: action.column,
                        text: action.text,
                    }
                ]
            else {
                if(action.text.length !== 0) {
                    return state.map(filtertext => {
                        if(filtertext.column !== action.column){
                            return filtertext
                        }

                        return{
                            ...filtertext,
                            text: action.text
                        }
                    })
                }
                else{
                        var removeIndex = state.map(filtertext => { return filtertext.column; }).indexOf(action.column);
                        return [
                            ...state.slice(0,removeIndex),
                            ...state.slice(removeIndex+1)
                        ]
                    }
                }   
        default:
            return state;
    }
}

export const filter = combineReducers({
    filterstatus,
    filtertext,
})


export const sortBy = combineReducers({
    column,
    ascordesc,
})

export const ingredients = combineReducers({
    data,
    sortBy,
    filter
})