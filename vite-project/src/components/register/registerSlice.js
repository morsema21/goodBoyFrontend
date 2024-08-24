import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

const registerApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
        responseHandler: (response) => response.text(),
      }),
      invalidateTags: ["User"],
    }),
  }),
});

const registerSlice = createSlice({
  name: "register",
  initialState: {
    user: {},
    token: null,
  },
  reducers: {
    setUser: (state, action) => {
      console.log("Setting user in login:", action.payload);
      state.user = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addMatcher(
      registerApi.endpoints.register.matchFulfilled,
      (state, { payload }) => {
        console.log(payload);
        const temp = JSON.parse(payload);
        console.log(temp);
        state.token = temp.token;
        state.user = temp;
        console.log(state.user);
        state.id = temp.id;
        window.sessionStorage.setItem("Token", temp.token);
        window.sessionStorage.setItem("User", temp.id);
      }
    );
  },
});

export default registerSlice.reducer;

export const { useRegisterMutation } = registerApi;

export const { setUser } = registerSlice.actions;
