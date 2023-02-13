import React from "react";

import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/BigSidebar";
import { useSelector } from "react-redux";
import Navlinks from "./Navlinks";

const Bigsidebar = () => {
  const { issidebaropen } = useSelector((store) => store.user);

  return (
    <Wrapper>
      <div
        className={
          issidebaropen ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <Navlinks />
        </div>
      </div>
    </Wrapper>
  );
};
export default Bigsidebar;
