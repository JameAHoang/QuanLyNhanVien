import axiosMiddleware from "redux-axios-middleware";
import thunk from "redux-thunk";
import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import RootReducer from "./reducers/RootReducer";
import HttpService from "app/services/HttpService";
import RootSaga from "./sagas/RootSaga";
const initialState = {};

const sagaMiddleware = createSagaMiddleware();
const middlewares = [
  thunk,
  sagaMiddleware,
  axiosMiddleware(HttpService.getAxiosClient()),
];
export const Store = createStore(
  RootReducer,
  initialState,
  compose(applyMiddleware(...middlewares))
);

sagaMiddleware.run(RootSaga);
