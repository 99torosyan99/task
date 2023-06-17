import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getTasks = createAsyncThunk("TASKS/GET", async () => {
  const response = await fetch(
    "https://guarded-plains-35621.herokuapp.com/tasks"
  );
  return response.json();
});

export const giveTask = createAsyncThunk("TASKS/GIVE", async (id) => {
  const response = await fetch(
    `https://guarded-plains-35621.herokuapp.com/tasks?employeeId=${id}`
  );

  return response.json();
});

export const postTasks = createAsyncThunk("TASKS/POST", async (task) => {
  const response = await fetch(
    "https://guarded-plains-35621.herokuapp.com/tasks",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    }
  );
  return response.json();
});

export const deleteTask = createAsyncThunk("TASK/DELETE", async function (id) {
  await fetch(`https://guarded-plains-35621.herokuapp.com/tasks/${id}`, {
    method: "DELETE",
  });
  return id;
});

export const searchTask = createAsyncThunk("TASKS/SEARCH", async (obj) => {
  const response = await fetch(
    `https://guarded-plains-35621.herokuapp.com/tasks?${
      obj.name ? `&name_like=${obj.name}` : ""
    }${obj.description ? `&description_like=${obj.description}` : ""}${
      obj.startDate ? `$startDate=${obj.startDate}` : ""
    }${obj.endDate ? `&endDate=${obj.endDate}` : ""}`
  );

  return response.json();
});

export const editTask = createAsyncThunk("TASKS/EDIT", async (obj) => {
  await fetch(`https://guarded-plains-35621.herokuapp.com/tasks/${obj.id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(obj.editObj),
  });
  return obj;
});

const tasksSLice = createSlice({
  name: "TASKS",
  initialState: [],
  reducers: {},
  extraReducers: (event) => {
    event
      .addCase(getTasks.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(postTasks.fulfilled, (state, action) => {
        return [...state, action.payload];
      })
      .addCase(searchTask.fulfilled, (_, action) => {
        console.log(action);
        return action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const data = state.filter((elem) => elem.id !== action.payload);
        return data;
      })
      .addCase(giveTask.fulfilled, (state, action) => {
        console.log(action.payload);
        return action.payload;
      })
      .addCase(editTask.fulfilled, (state, action) => {
        const ind = state.findIndex((elem) => elem.id == action.payload.id);
        state[ind] = action.payload.editObj;
        return state;
      });
  },
});

export default tasksSLice.reducer;
