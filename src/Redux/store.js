import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice/dataSlice";
import tasksSlice from "./tasksSlice/tasksSlice";


export default configureStore({
    reducer: {
        data:dataSlice,
        tasks:tasksSlice
    }
})