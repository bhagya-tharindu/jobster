import React, { useMemo, useState } from "react";
import { Formrow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/SearchContainer";
import { useSelector, useDispatch } from "react-redux";
import { handleChanger, clearfilters } from "../features/allJobs/allJobslice";

const SearchContainer = () => {
  const [localsearch, setlocalsearch] = useState("");
  const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.alljobs);
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(handleChanger({ name: e.target.name, value: e.target.value }));
  };
  const ClearFilter = (e) => {
    e.preventDefault();
    setlocalsearch("");
    dispatch(clearfilters());
  };

  const debounce = () => {
    let timeoutid;
    return (e) => {
      console.log(localsearch);
      setlocalsearch(e.target.value);
      clearTimeout(timeoutid);
      timeoutid = setTimeout(() => {
        dispatch(handleChanger({ name: e.target.name, value: e.target.value }));
      }, 1000);
    };
  };

  const optimizedbounce = useMemo(() => debounce(), []);

  return (
    <Wrapper>
      <form onSubmit={ClearFilter} className="form">
        <h4>search form</h4>
        <div className="form-center">
          <Formrow
            type="text"
            name="search"
            value={localsearch}
            handlechange={optimizedbounce}
          />
          <FormRowSelect
            type="text"
            labelText="status"
            name="searchStatus"
            value={searchStatus}
            handlechange={handleChange}
            list={[...statusOptions, "all"]}
          />
          <FormRowSelect
            type="text"
            labelText="type"
            name="searchType"
            value={searchType}
            handlechange={handleChange}
            list={[...jobTypeOptions, "all"]}
          />
          <FormRowSelect
            type="text"
            name="sort"
            value={sort}
            handlechange={handleChange}
            list={sortOptions}
          />
          <button
            className="btn btn-block btn-danger"
            type="submit"
            disabled={isLoading}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default SearchContainer;
