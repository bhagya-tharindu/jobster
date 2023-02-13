import React from "react";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useSelector, useDispatch } from "react-redux";
import { changepage } from "../features/allJobs/allJobslice";

const PagebtnContainer = () => {
  const { numOfPages, page } = useSelector((store) => store.alljobs);
  const dispatch = useDispatch();
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const nextpage = () => {
    let newpage = page + 1;
    if (newpage > numOfPages) {
      newpage = 1;
    }
    dispatch(changepage(newpage));
  };
  const prevpage = () => {
    let newpage = page - 1;
    if (newpage <= 0) {
      newpage = numOfPages;
    }
    dispatch(changepage(newpage));
  };
  return (
    <Wrapper>
      <button className="prev-btn" type="button" onClick={prevpage}>
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">
        {pages.map((pagenumber) => {
          return (
            <button
              key={pagenumber}
              type="button"
              className={page === pagenumber ? "pageBtn active" : "pageBtn"}
              onClick={() => dispatch(changepage(pagenumber))}
            >
              {pagenumber}
            </button>
          );
        })}
      </div>
      <button className="prev-btn" type="button" onClick={nextpage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PagebtnContainer;
