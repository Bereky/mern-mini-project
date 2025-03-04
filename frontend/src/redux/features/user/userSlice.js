import { createSlice } from "@reduxjs/toolkit";

/* Get token from local storage and populate state */
let token;

const tokenExist = localStorage.getItem("token");

if (tokenExist && tokenExist !== "undefined") {
  token = JSON.parse(tokenExist);
}

const initialState = {
  token: token ? token : null,
  account: {
    userId: null,
    name: null,
    role: null,
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.account.userId = action.payload.userId;
      state.account.name = action.payload.name;
      state.account.role = action.payload.role;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem("token", JSON.stringify(action.payload.token));
    },
    logout: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { resetStatus, setData, setToken, logout } = userSlice.actions;

export default userSlice.reducer;
