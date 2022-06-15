import { configureStore } from "@reduxjs/toolkit";
import listFavorite from './reducers';

const store = configureStore({
    reducer: {
        listFavorite,
    }
})


export default store;