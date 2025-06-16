import type { Turtle } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api`,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type == HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => {
    return {
      getTurtles: builder.query<Turtle[], void>({
        query: () => "turtles",
      }),
      getTurtle: builder.query<Turtle, Pick<Turtle, "id">>({
        query: ({ id }: Pick<Turtle, "id">) => `turtles/${id}`,
      }),
      createTurtle: builder.mutation<string, Pick<Turtle, "name">>({
        query: (turtle) => ({
          url: "turtles",
          method: "POST",
          body: turtle,
        }),
        transformErrorResponse: () => {
          return "Kaplumbağa oluşturulurken bir hata oluştu.";
        },
        transformResponse: (response: { message: string }) => {
          return response.message;
        },
      }),
    };
  },
});

export const { useGetTurtlesQuery, useCreateTurtleMutation } = api;
export const { getTurtles, createTurtle, getTurtle } = api.endpoints;
