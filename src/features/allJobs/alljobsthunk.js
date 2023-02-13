import customFetch from "../../utils/axios";
import { clearvalues } from "../job/jobSlice";
import { logoutuser } from "../user/userSlice";
import { clearalljobsstate } from "./allJobslice";

export const getalljobsthunk = async (_, thunkAPI) => {
  const { page, search, searchStatus, sort, searchType } =
    thunkAPI.getState().alljobs;
  let url = `/jobs?page=${page}&status=${searchStatus}&sort=${sort}&jobType=${searchType}`;
  if (search) {
    url = url + `&search=${search}`;
  }
  try {
    const resp = await customFetch.get(url, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("There was an error");
  }
};

export const showstatsthunk = async (_, thunkAPI) => {
  try {
    const resp = await customFetch.get("/jobs/stats", {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    });

    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg);
  }
};

export const clearstorethunk = async (message, thunkAPI) => {
  try {
    thunkAPI.dispatch(logoutuser(message));
    thunkAPI.dispatch(clearalljobsstate());
    thunkAPI.dispatch(clearvalues());
    return Promise.resolve();
  } catch (error) {
    return Promise.reject();
  }
};
