import { showloading, hideloading, getAlljobs } from "../allJobs/allJobslice";
import customFetch from "../../utils/axios";
import { clearvalues } from "./jobSlice";
import { logoutuser } from "../user/userSlice";
import authHeader from "../../utils/authHeader";

export const createjobthunk = async (job, thunkAPI) => {
  try {
    const resp = await customFetch.post("/jobs", job, authHeader(thunkAPI));
    thunkAPI.dispatch(clearvalues());
    return resp.data;
  } catch (error) {
    if (error.response.status === 401) {
      thunkAPI.dispatch(logoutuser());
      return thunkAPI.rejectWithValue("Unauthorized! Logging Out...");
    }
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const deletejobthunk = async (jobId, thunkAPI) => {
  thunkAPI.dispatch(showloading());
  try {
    const resp = await customFetch.delete(`/jobs/${jobId}`, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    thunkAPI.dispatch(getAlljobs());
    return resp.data.msg;
  } catch (error) {
    thunkAPI.dispatch(hideloading());
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
export const editjobthunk = async ({ jobId, job }, thunkAPI) => {
  try {
    const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    thunkAPI.dispatch(clearvalues());
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};
