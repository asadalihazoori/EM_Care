import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

import { customerReducer } from './customerReducer';

const allReducers = combineReducers({
    addCustomer: customerReducer,
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['addCustomer'],
    blacklist: [''],
};

const persistedReducer = persistReducer(persistConfig, allReducers);

export default store = createStore(
    persistedReducer,
    applyMiddleware(thunk));

export const persistedStore = persistStore(store);

