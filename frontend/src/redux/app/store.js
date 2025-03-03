import { configureStore } from "@reduxjs/toolkit";

import userReducer from "../features/user/userSlice"
import authMiddleware from "../middleware/auth.middleware";
import { ticketApi } from "../features/ticket/ticketService";
import { userApi } from "../features/user/userService";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [userApi.reducerPath]: userApi.reducer,
    [ticketApi.reducerPath]: ticketApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authMiddleware,
      userApi.middleware,
      ticketApi.middleware,
    ),
});
