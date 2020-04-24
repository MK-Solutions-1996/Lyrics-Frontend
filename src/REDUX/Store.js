import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';
import RootReducer from './Root_reducer';

//const Store = createStore(RootReducer, applyMiddleware(ReduxThunk, ReduxLogger));
const Store = createStore(RootReducer, applyMiddleware(ReduxThunk));

export default Store;