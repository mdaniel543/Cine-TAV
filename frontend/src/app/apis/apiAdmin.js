import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiAdmin = createApi({
  reducerPath: "apiAdmin",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    getPeliculas: builder.query({
      query: () => "/peliculas",
    }),
    getSalas: builder.query({
      query: () => "/salas",
    }),
    getTipoFunciones: builder.query({
      query: () => "/tipos",
    }),
    createFuncion: builder.mutation({
      query: (body) => ({
        url: "/funcion",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetPeliculasQuery,
  useGetSalasQuery,
  useGetTipoFuncionesQuery,
  useCreateFuncionMutation,
} = apiAdmin;
