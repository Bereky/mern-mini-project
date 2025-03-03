// src/services/todoApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API = process.env.API_URL || "http://localhost:5000";

export const ticketApi = createApi({
  reducerPath: "ticketApi",
  baseQuery: fetchBaseQuery({ baseUrl: API }),
  endpoints: (builder) => ({
    createTicket: builder.mutation({
      query: (payload) => ({
        url: "tickets",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${payload.token}`,
        },
        body: payload.data,
      }),
    }),
    updateTicket: builder.mutation({
      query: (payload) => ({
        url: "tickets/" + payload.ticketId,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${payload.token}`,
        },
        body: payload.data,
      }),
    }),
    getTickets: builder.query({
      query: (payload) => ({
        url: "tickets",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${payload.token}`,
        },
        params: { filters: JSON.stringify(payload.filters) },
      }),
    }),
    getTicket: builder.query({
      query: (payload) => ({
        url: "tickets/" + payload.ticketId,
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
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useGetTicketQuery,
  useGetTicketsQuery,
} = ticketApi;
