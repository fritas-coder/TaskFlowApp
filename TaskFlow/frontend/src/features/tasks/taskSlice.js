import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskService from "./taskService";

let storedTasks = [];

try {
  const tasksFromStorage = localStorage.getItem("tasks");
  if (tasksFromStorage) {
    storedTasks = JSON.parse(tasksFromStorage);
  }
} catch (error) {
  console.error("Invalid JSON in localStorage for tasks:", error);
}

//get task
const getTasks = createAsyncThunk("tasks/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await taskService.getTasks(token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

//create task
const createTask = createAsyncThunk(
  "tasks/create",
  async (taskData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await taskService.createTask(taskData, token);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

//delete task
const deleteTask = createAsyncThunk("tasks/delete", async (_id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await taskService.deleteTask(_id, token);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.message);
  }
});

const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: storedTasks,
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: "",
  },
  reducers: {
    resetTask: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.message = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = action.payload;
        localStorage.setItem("tasks", JSON.stringify(action.payload));
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.tasks = action.payload;
      })
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks.push(action.payload);
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tasks = state.tasks.filter(
          (task) => task._id !== action.payload.id
        );
        localStorage.setItem("tasks", JSON.stringify(state.tasks));
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});
export { getTasks, createTask, deleteTask };
export const { resetTask } = taskSlice.actions;
export default taskSlice.reducer;
