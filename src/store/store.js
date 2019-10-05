import { createStore , compose , applyMiddleware } from 'redux';
import myReducer from './reducer/RootReducer';
import thunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(myReducer, compose(applyMiddleware(thunk), composeEnhancers()));