import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auths/authSlice";
import taskReducer from "../features/tasks/taskSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
  },
});
