import React, { Component, Fragment } from "react";
import "./home.css";

//Redux imports
import { connect } from "react-redux";

//components
import ImageLinkForm from "../ImageLinkForm/ImageLinkForm";
import Rank from "../Rank/Rank";
import FaceRecognition from "../FaceRecognition/FaceRecognition";
import Signin from "../Signin/Signin";
import Register from "../Register/Register";

export class Home extends Component {
  render() {
    //destructure
    const { isSignedIn } = this.props.user;

    const markup = isSignedIn ? (
      <Fragment>
        <Rank /> <FaceRecognition />
      </Fragment>
    ) : (
      <Fragment>
        <Signin /> <Register />{" "}
      </Fragment>
    );

    return <div>{markup}</div>;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Home);
