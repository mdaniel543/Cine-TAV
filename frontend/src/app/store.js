import { configureStore } from "@reduxjs/toolkit";
import { apiCliente } from "./apis/apiCliente";
import { apiAdmin } from "./apis/apiAdmin";

export const store = configureStore({
  reducer: {
    [apiCliente.reducerPath]: apiCliente.reducer,
    [apiAdmin.reducerPath]: apiAdmin.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiCliente.middleware, apiAdmin.middleware),
});
