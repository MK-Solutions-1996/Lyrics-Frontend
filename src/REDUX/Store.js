import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';
import RootReducer from './Root_reducer';

const Store = createStore(RootReducer, applyMiddleware(ReduxThunk, ReduxLogger));

export default Store;