import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import "./App.css";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";

//components
import Home from "./Components/Home/Home";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";

import jwtDecode from "jwt-decode";

//actions
import { getUser } from "./redux/actions/userAction";

//defaults
axios.defaults.baseURL = "https://facerecognitionserver.herokuapp.com/";

const token = localStorage.token;

if (token) {
  axios.defaults.headers.common["Authorization"] = token;
  store.dispatch(getUser());
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    // store.dispatch(logoutUser());
    // window.location.href = "/login";
  } else {
    // store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    // store.dispatch(getUser());
    // store.dispatch(getFollowingHandles());
  }
}

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navigation />
        <Logo />
        <Home />
      </div>
    </Provider>
  );
}

export default App;
