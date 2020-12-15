import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import axios from "axios";
import "./App.css";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";

//components
import Home from "./Components/Home/Home";
import Particles from "react-particles-js"; //Praticles.js npm//
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Signin from "./Components/Signin/Signin";
import Register from "./Components/Register/Register";
import jwtDecode from "jwt-decode";

//actions
import { getUser } from "./redux/actions/userAction";

//defaults
axios.defaults.baseURL = "http://localhost:3000";

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

//--------------variables-----------------

const particleOption = {
  particles: {
    number: {
      value: 200,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

//---------------state-------------------------------

// const initialState = {
//   input: "",

//   imageUrl: "",

//   boxes: [],

//   route: "signin",

//   isSignedIn: false,

//   user: {
//     id: "",
//     name: "",
//     email: "",
//     entries: 0,
//     joined: "",
//   },
// };

class App extends Component {
  // constructor() {
  //   super();
  //   this.state = initialState;
  // }

  //--------functions--------------------------------------------------------------

  //recieves data from 'register.js', when new users submits details this function fires and updates the newly
  //created 'user' state above.
  // loadUser = (data) => {
  //   this.setState({
  //     user: {
  //       id: data.id,
  //       name: data.name,
  //       email: data.email,
  //       entries: data.entries,
  //       joined: data.joined,
  //     },
  //   });
  // };

  //function used to set 'route' state and 'isSignedin' state ,it takes parameters from Signin,navigation,Registerjs//
  // onRouteChange = (route) => {
  //   if (route === "signout") {
  //     this.setState(initialState);
  //   } else if (route === "home") {
  //     this.setState({ isSignedIn: true });
  //   }
  //   this.setState({ route: route });
  //   console.log(initialState);
  //   console.log(this.state);
  // };

  //---------------------------------

  render() {
    // const { isSignedIn, imageUrl, route, boxes } = this.state;

    return (
      <Provider store={store}>
        <div className="App">
          <Particles className="particles" params={particleOption} />
          <Navigation />
          <Logo />
          <Home />
        </div>
      </Provider>
    );
  }
}

export default App;

//--newfeature--
