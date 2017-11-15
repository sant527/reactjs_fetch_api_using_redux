import React from 'react'
import { render } from 'react-dom'
//import ReactDOM from 'react-dom' then use ReactDOM
import configureStore from './configureStore';
import Root from './components/Root'



const store = configureStore();

render(
 <Root store={store} />,
  document.getElementById('root')
)
