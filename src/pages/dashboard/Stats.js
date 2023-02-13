import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChartsContainer, StatsContainer, Loading } from "../../components";
import { showStats } from "../../features/allJobs/allJobslice";

const Stats = () => {
  const dispatch = useDispatch();
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.alljobs
  );
  useEffect(() => {
    dispatch(showStats());
  }, []);
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
