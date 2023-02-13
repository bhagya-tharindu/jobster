import React from "react";
import { useEffect } from "react";
import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./Loading";
import { getAlljobs } from "../features/allJobs/allJobslice";
import PagebtnContainer from "./PagebtnContainer";
import { store } from "../store";

const JobsContainer = () => {
  const {
    sort,
    isLoading,
    jobs,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
  } = useSelector((store) => store.alljobs);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAlljobs());
  }, [page, search, searchStatus, searchType, sort]);
  if (isLoading) {
    return <Loading center />;
  }
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PagebtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
