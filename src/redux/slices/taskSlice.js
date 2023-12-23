import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";

const initialState = {
  links: [],
  images: [],
  tasks: [],
  deletedImages: [],
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    editTask: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task._id === action.payload._id ? action.payload : task
      );
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTasks: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    removeTasks: (state, action) => {
      state.tasks = state.tasks.filter((task) => task._id !== action.payload);
    },
  },
});

export const { setTasks, addTasks, removeTasks, editTask } = taskSlice.actions;

export default taskSlice.reducer;
