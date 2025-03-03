// src/services/todoApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = process.env.API_URL || "http://localhost:5000";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    createAccount: builder.mutation({
      query: (payload) => ({
        url: "auth/register",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "auth/login",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: payload,
      }),
    }),
    getAccount: builder.mutation({
      query: (payload) => ({
        url: "auth/me",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${payload.token}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateAccountMutation,
  useGetAccountMutation,
  useLoginMutation,
} = userApi;
