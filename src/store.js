import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from 'redux-promise-middleware'; //lets you use async
import reducer from './ducks/reducer';



export default createStore(reducer, applyMiddleware(promiseMiddleware));