import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://capstonebackend-0wah.onrender.com/",
    baseUrl: "http://18.220.26.22:3000/",
    tagTypes: ["User"],

    prepareHeaders: (headers, { getState }) => {
      const token = getState().register.token || getState().login.token;
      const sessionToken = window.sessionStorage.getItem("Token", token);
      if (token || sessionToken) {
        headers.set("authorization", `Bearer ${token || sessionToken}`);
      }
    },
  }),
  endpoints: () => ({}),
});
