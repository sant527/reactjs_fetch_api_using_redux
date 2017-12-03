import { combineReducers } from 'redux';
import { ingredients } from './items';
import { routerReducer } from 'react-router-redux'
import { loadingBarReducer } from 'react-redux-loading-bar'
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    ingredients,
    reducer: routerReducer,
    loadingBar: loadingBarReducer,
    form: formReducer.plugin({
    IngredientForm: (state, action) => { // <------ 'account' is name of form given to reduxForm()
      switch(action.type) {
        case 'ACCOUNT_SAVE_SUCCESS':
          console.log('ACCOUNT_SAVE_SUCCESS',state)
          return undefined;       // <--- blow away form data
        default:
          return state;
      }
    }
  })
});
