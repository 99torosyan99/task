import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getEmployees = createAsyncThunk("DATA/GET", async () => {
  const response = await fetch(
    "https://rocky-temple-83495.herokuapp.com/employees"
  );
  return response.json();
});

export const newEmployee = createAsyncThunk("DATA/POST", async (employee) => {
  const response = await fetch(
    "https://rocky-temple-83495.herokuapp.com/employees",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }
  );
  return response.json();
});

export const deleteEmployee = createAsyncThunk("DATA/DELETE", async (id) => {
  await fetch(`https://rocky-temple-83495.herokuapp.com/employees/${id}`, {
    method: "DELETE",
  });
  return id;
});

export const changeEmployee = createAsyncThunk(
  "DATA/CHANGE",
  async function (obj) {
    await fetch(
      `https://rocky-temple-83495.herokuapp.com/employees/${obj.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8", 
        },
        body: JSON.stringify(obj.editObj), 
      }
    );

    return obj;
  }
);

export const giveEmployee = createAsyncThunk("DATA/EMPLOY", async (id) => {
  const response = await fetch(
    `https://rocky-temple-83495.herokuapp.com/employees/${id}`
  );
  return response.json();
});

const dataSlice = createSlice({
  name: "DATA",
  initialState: [],
  reducers: {},
  extraReducers: (invent) => {
    invent
      .addCase(getEmployees.fulfilled, (_, action) => {
        return action.payload;
      })
      .addCase(newEmployee.fulfilled, (state, action) => {
        return [...state, action.payload];
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        const data = state.filter((elem) => elem.id !== action.payload);
        return data;
      })
      .addCase(changeEmployee.fulfilled, (state, action) => {
        const ind = state.findIndex((elem) => elem.id == action.payload.id);
        state[ind] = {...action.payload.editObj,id:action.payload.id};
        return state;
      })
      .addCase(giveEmployee.fulfilled, (_, action) => {
        return action.payload;
      });
  },
});

export default dataSlice.reducer;
