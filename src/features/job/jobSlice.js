import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { createjobthunk, editjobthunk, deletejobthunk } from "./jobThunk";
import { getuserfromlocalstorage } from "../../utils/localstorage";

const initialState = {
  isLoading: false,
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "remote", "internship"],
  jobType: "full-time",
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  isEditing: false,
  editJobId: "",
};

export const createJob = createAsyncThunk("job/createjob", createjobthunk);

export const editjob = createAsyncThunk("job/editjob", editjobthunk);

export const deletejob = createAsyncThunk("job/deletejob", deletejobthunk);

const jobSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    handleChange: (state, { payload: { name, value } }) => {
      state[name] = value;
    },
    clearvalues: () => {
      return {
        ...initialState,
        jobLocation: getuserfromlocalstorage()?.location || "",
      };
    },
    seteditjob: (state, { payload }) => {
      return { ...state, isEditing: true, ...payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createJob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Created");
      })
      .addCase(createJob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      })
      .addCase(deletejob.fulfilled, (state, { payload }) => {
        toast.success(payload);
      })
      .addCase(deletejob.rejected, (state, { payload }) => {
        toast.error(payload);
      })
      .addCase(editjob.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editjob.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Job Modified...");
      })
      .addCase(editjob.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      });
  },
});

export const { handleChange, clearvalues, seteditjob } = jobSlice.actions;

export default jobSlice.reducer;
