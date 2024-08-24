import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

const adminApi = api.injectEndpoints({
  endpoints: (builder) => ({
    //admin update user
    promoteUser: builder.mutation({
      query: ({ id, form }) => ({
        url: `/update/user/${id}`,
        method: "PUT",
        body: {
          email: form.email,
          username: form.username,
          password: form.password,
          name: form.name,
          isAdmin: form.isAdmin,
        },
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["User"],
    }),
    //send inquiry
    inquiry: builder.mutation({
      query: ({ form }) => ({
        url: `/sendEmail`,
        method: "POST",
        body: {
          name: form.name,
          email: form.email,
          message: form.message,
        },
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["User"],
    }),
    //get all users
    getAllUsers: builder.query({
      query: () => "/users",
    }),
  }),
});

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    users: [],
  },
  reducers: {},
});

export default adminSlice.reducer;

export const {
  useInquiryMutation,
  useGetAllUsersQuery,
  usePromoteUserMutation,
} = adminApi;
