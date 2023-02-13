import React, { useEffect } from "react";
import { Formrow, FormRowSelect } from "../../components";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  handleChange,
  clearvalues,
  createJob,
  editjob,
} from "../../features/job/jobSlice";

const Addjob = () => {
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);

  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!position || !company || !jobLocation) {
      toast.error("Please fill out all fields");
      return;
    }
    if (isEditing) {
      dispatch(
        editjob({
          jobId: editJobId,
          job: { position, status, jobLocation, jobType, company },
        })
      );
      return;
    }
    dispatch(createJob({ position, company, jobLocation, status, jobType }));
  };
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({ name, value }));
  };
  useEffect(() => {
    if (!isEditing) {
      dispatch(
        handleChange({
          name: "jobLocation",
          value: user.location,
        })
      );
    }
  }, []);
  return (
    <Wrapper>
      <form className="form">
        <h3>{isEditing ? "edit job" : "add job"}</h3>
        <div className="form-center">
          <Formrow
            type="text"
            name="position"
            value={position}
            handlechange={handleJobInput}
          />
          <Formrow
            type="text"
            name="company"
            value={company}
            handlechange={handleJobInput}
          />
          <Formrow
            type="text"
            name="jobLocation"
            labelText="job Location"
            value={jobLocation}
            handlechange={handleJobInput}
          />
          <FormRowSelect
            name="status"
            value={status}
            handlechange={handleJobInput}
            list={statusOptions}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            value={jobType}
            handlechange={handleJobInput}
            list={jobTypeOptions}
          />
          <div className="btn-container">
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={() => dispatch(clearvalues())}
            >
              clear
            </button>
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  );
};

export default Addjob;
