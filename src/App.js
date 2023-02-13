import React from "react";
import { Landing, Error, Register, Dashboard } from "./pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Alljob,
  Addjob,
  Stats,
  Profile,
  Sharedlayout,
} from "./pages/dashboard";
import Protectedroute from "./components/Protectedroute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Protectedroute>
                <Sharedlayout />
              </Protectedroute>
            }
          >
            <Route index element={<Stats />} />
            <Route path="all-jobs" element={<Alljob />} />
            <Route path="add-job" element={<Addjob />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="register" element={<Register />} />
          <Route path="landing" element={<Landing />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </div>
  );
}
export default App;
