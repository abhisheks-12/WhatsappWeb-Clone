import React from "react";
import { auth, provider } from "../../firebase/config";
import { useStateValue } from "../StateProvider/StateProvider";
import "./Login.css";

const Login = () => {
  const [{}, dispatch] = useStateValue();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((res) => {
        dispatch({
          type: "SET_USER",
          user: res.user,
        });
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="login-container">
      <div className="login">
        <img
          src="https://images.indianexpress.com/2017/08/hike-messenger-main.jpg"
          alt="logo"
          width="100px"
        />
        <h2>Sign Up</h2>
        <button onClick={signIn}>Sign up with gmail</button>
      </div>
    </div>
  );
};

export default Login;
