import React from "react";
import { useState } from "react";
import { Formrow } from "../../components/index";
import Wrapper from "../../assets/wrappers/DashboardFormPage";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { updateuser } from "../../features/user/userSlice";

const Profile = () => {
  const { isloading, user } = useSelector((store) => store.user);

  const dispatch = useDispatch();
  const [userdata, setuserdata] = useState({
    name: user?.name || "",
    location: user?.location || "",
    email: user?.email || "",
    lastName: user?.lastName || "",
  });
  const { name, location, email, lastName } = userdata;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !location || !email || !lastName) {
      toast.error("please fill all fields");
      return;
    }
    dispatch(updateuser(userdata));
  };
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setuserdata({ ...userdata, [name]: value });
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className="form-center">
          <Formrow
            type="text"
            name="name"
            value={name}
            handlechange={handleChange}
          />
          <Formrow
            type="text"
            labelText="last name"
            name="lastName"
            value={lastName}
            handlechange={handleChange}
          />
          <Formrow
            type="email"
            name="email"
            value={email}
            handlechange={handleChange}
          />
          <Formrow
            type="text"
            name="location"
            value={location}
            handlechange={handleChange}
          />
          <button type="submit" className="btn btn-block" disabled={isloading}>
            {isloading ? "Please wait..." : "save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
