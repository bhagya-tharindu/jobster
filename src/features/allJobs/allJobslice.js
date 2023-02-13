import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import customFetch from "../../utils/axios";
import {
  clearstorethunk,
  getalljobsthunk,
  showstatsthunk,
} from "./alljobsthunk";

const initialFiltersState = {
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
};

const initialState = {
  isLoading: true,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
};

export const showStats = createAsyncThunk("alljobs/stats", showstatsthunk);

export const getAlljobs = createAsyncThunk("alljobs/getJobs", getalljobsthunk);

export const clearstore = createAsyncThunk(
  "alljobs/clearstore",
  clearstorethunk
);
const allJobslice = createSlice({
  name: "alljobs",
  initialState,
  reducers: {
    changepage: (state, { payload }) => {
      state.page = payload;
    },
    showloading: (state) => {
      state.isLoading = true;
    },
    hideloading: (state) => {
      state.isLoading = false;
    },
    handleChanger: (state, { payload: { name, value } }) => {
      state.page = 1;
      state[name] = value;
    },
    clearfilters: (state) => {
      return { ...state, ...initialFiltersState };
    },
    clearalljobsstate: (state) => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getAlljobs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAlljobs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.jobs = payload.jobs;
        state.numOfPages = payload.numOfPages;
        state.totalJobs = payload.totalJobs;
      })
      .addCase(getAlljobs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(showStats.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.stats = payload.defaultStats;
        state.monthlyApplications = payload.monthlyApplications;
      })
      .addCase(showStats.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(clearstore.rejected, (state) => {
        toast.error("There was an error...");
      });
  },
});

export const {
  showloading,
  hideloading,
  handleChanger,
  clearfilters,
  changepage,
  clearalljobsstate,
} = allJobslice.actions;

export default allJobslice.reducer;
