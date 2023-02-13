import React from "react";
import { Outlet } from "react-router-dom";
import { Smallsidebar, Bigsidebar, Navbar } from "../../components";
import Wrapper from "../../assets/wrappers/SharedLayout";

const Sharedlayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <Smallsidebar />
        <Bigsidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default Sharedlayout;
