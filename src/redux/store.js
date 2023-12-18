import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slices/taskSlice";

export const store = configureStore({
  reducer: {
    task: taskReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: {
        // Ignore state paths, e.g. state for 'items':
        ignoredPaths: ["items.data"],
      },
      serializableCheck: { ignoredPaths: ["some.nested.path"] },
    }),
});
