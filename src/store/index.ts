import createSagaMiddleware from 'redux-saga';
import { configureStore, getDefaultMiddleware, combineReducers, EnhancedStore, CombinedState } from '@reduxjs/toolkit';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import sagas from './sagas';
import reducers, { CharactersState } from './ducks';

const client = axios.create({
  baseURL: '',
  responseType: 'json'
});

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware, axiosMiddleware(client)];

const { character } = reducers;

const rootReducer = combineReducers({
  character
});

type Store = EnhancedStore<
  CombinedState<{
    character: CharactersState;
  }>
>;

const store = configureStore({
  reducer: rootReducer,
  middleware
});

const makeStore: MakeStore<Store> = () => store;

sagaMiddleware.run(sagas);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const storeWrapper = createWrapper(makeStore, { debug: true });

export default store;
