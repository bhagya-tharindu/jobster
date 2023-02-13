import { configureStore } from "@reduxjs/toolkit";
import jobSlice from "./features/job/jobSlice";
import userSlice from "./features/user/userSlice";
import allJobslice from "./features/allJobs/allJobslice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    job: jobSlice,
    alljobs: allJobslice,
  },
});
