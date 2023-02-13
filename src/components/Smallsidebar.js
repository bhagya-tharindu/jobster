import React from "react";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";

import Logo from "./Logo";
import { useSelector, useDispatch } from "react-redux";
import { togglesidebar } from "../features/user/userSlice";
import Navlinks from "./Navlinks";

const Smallsidebar = () => {
  const { issidebaropen } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(togglesidebar());
  };
  return (
    <Wrapper>
      <div
        className={
          issidebaropen ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <button className="close-btn" onClick={toggle}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <Navlinks togglesidebar={toggle} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Smallsidebar;
