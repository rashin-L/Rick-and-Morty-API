import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query'
import { charAPI } from "./services/charAPI";

const store = configureStore({
    reducer: {
        [charAPI.reducerPath]: charAPI.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(charAPI.middleware),
})
setupListeners(store.dispatch)

export default store;