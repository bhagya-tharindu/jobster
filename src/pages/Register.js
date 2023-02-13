import { useState, useEffect } from "react";
import { Logo, Formrow } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { loginuser, registeruser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const initialstate = {
  name: "",
  email: "",
  password: "",
  ismember: true,
};

const Register = () => {
  const [values, setvalues] = useState(initialstate);
  const { isloading, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handlechange = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setvalues({ ...values, [name]: val });
  };
  const togglemember = () => {
    return setvalues({ ...values, ismember: !values.ismember });
  };
  const onsubmit = (e) => {
    e.preventDefault();
    const { name, email, password, ismember } = values;
    if (!email || !password || (!ismember && !name)) {
      toast.error("Please fill all of the fields");
      return;
    }
    if (ismember) {
      dispatch(loginuser({ email: email, password: password }));
      return;
    }
    dispatch(registeruser({ email, password, name }));
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user]);
  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onsubmit}>
        <Logo />
        <h3>{values.ismember ? "Login" : "Register"}</h3>
        {!values.ismember && (
          <Formrow
            type="text"
            name="name"
            value={values.name}
            handlechange={handlechange}
          />
        )}
        <Formrow
          type="email"
          name="email"
          value={values.email}
          handlechange={handlechange}
        />
        <Formrow
          type="password"
          name="password"
          value={values.password}
          handlechange={handlechange}
        />

        <button type="submit" className="btn btn-block" disabled={isloading}>
          {isloading ? "loading..." : "submit"}
        </button>
        <button
          type="button"
          onClick={() =>
            dispatch(
              loginuser({ email: "testUser@test.com", password: "secret" })
            )
          }
          className="btn btn-block btn-hipster"
          disabled={isloading}
        >
          {isloading ? "loading..." : "demo"}
        </button>
        <p>
          {values.ismember ? "Not a member yet?" : "Already a member"}
          <button
            type="button"
            className="member-btn"
            onClick={() => togglemember()}
          >
            {values.ismember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
