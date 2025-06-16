import { configureStore, combineSlices } from "@reduxjs/toolkit";
import { api } from "@/services/api";
import { createWrapper } from "next-redux-wrapper";
import { turtlesSlice } from "@/lib/slices/turtles-slice";

const rootReducer = combineSlices(api, turtlesSlice);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(api.middleware),
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const wrapper = createWrapper<AppStore>(() => store, {
  debug: process.env.NODE_ENV !== "production",
});
