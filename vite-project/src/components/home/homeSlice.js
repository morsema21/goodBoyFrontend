import { createSlice } from "@reduxjs/toolkit";
import { api } from "../../app/api";

const homeApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
    }),
    getPostById: builder.query({
      query: (id) => `/post/${id}`,
    }),
    //delete post
    deletePost: builder.mutation({
      query: ({ id }) => ({
        url: `/delete/post/${id}`,
        method: "DELETE",
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["User"],
    }),
    //update post
    updatePost: builder.mutation({
      query: ({ id, form }) => ({
        url: `/update/post/${id}`,
        method: "PUT",
        body: form,
      }),
      invalidatesTags: ["User"],
    }),
    // create post
    createPost: builder.mutation({
      query: ({
        usersId,
        title,
        content,
        createdAt,
        updatedAt,
        published,
      }) => ({
        url: `/createPost/user/${usersId}`,
        method: "POST",
        body: {
          userId: usersId,
          title,
          content,
          createdAt,
          updatedAt,
          published,
        },
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["User"],
    }),
  }),
  overrideExisting: false,
});

const homeSlice = createSlice({
  name: "post",
  initialState: {},
  reducers: {},
});

export default homeSlice.reducer;

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = homeApi;
