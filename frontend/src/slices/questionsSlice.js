import { apiSlice } from "./apiSlice";
import { COURSE_URL } from "../constants";

export const courseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllQST: builder.query({
      query: () => ({
        url: `${COURSE_URL}`,
      }),
    }),
    addQuestion: builder.mutation({
      query: (data) => ({
        url: `${COURSE_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
    useGetAllQSTQuery,
    useAddQuestionMutation,
} = courseApiSlice;