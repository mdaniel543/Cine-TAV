import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiCliente = createApi({
  reducerPath: "apiCliente",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  endpoints: (builder) => ({
    getCarteleras: builder.query({
      query: () => "/cartelera",
    }),
    getFunciones: builder.query({
      query: (idCartelera) => `/funciones/${idCartelera}`,
    }),
    getAsientosbyFuncion: builder.query({
      query: (idFuncion) => `/asientos/${idFuncion}`,
      providesTags: ["Asientos"],
    }),
    realizarVenta: builder.mutation({
      query: (body) => ({
        url: "/venta",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Asientos"],
    }),
  }),
});

export const {
  useGetCartelerasQuery,
  useGetFuncionesQuery,
  useGetAsientosbyFuncionQuery,
  useRealizarVentaMutation,
} = apiCliente;
