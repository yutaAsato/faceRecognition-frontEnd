import React, { Component } from "react";
import "./FaceRecognition.css";

//Redux imports
import { connect } from "react-redux";

//actions
import { handleAPI, handleImage, setBox } from "../../redux/actions/userAction";

//components
import ImageLinkForm from "../ImageLinkForm/ImageLinkForm";

//mui

import { withStyles } from "@material-ui/core/styles";

//Component
import { CardData } from "../Card";

//--------------
const styles = {
  card: {
    position: "relative",
    backgroundColor: "black",
    width: 700,
    height: 800,
  },
};

//=================================================

export class FaceRecognition extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",

      imageUrl: "",

      boxes: [],

      route: "signin",

      isSignedIn: false,

      faceData: {},

      toggle: false,
    };
  }
  //---------------------------------------

  //receives 'response' from 'onButtonSubmit(), then return an object used to set box state
  calculateFaceLocation = (data) => {
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);

    //map() is used on on the regions which contains the arrays and loops the region_info which
    //contains the boundingbox object. map() returns an object for each face detected, which is then
    //put into an array in the boxes initial state. This is then map() again in facerecognitionjs
    //to output the border boxes for each face.
    return data.results[0].outputs[2].data.regions.map((face) => {
      const clarifaiFace = face.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });
  };

  //receives the return of 'calculateFaceLocation(), wrapped as parameter in 'onButtonSubmit()'
  displayFaceBox = (box) => {
    this.setState({ boxes: box });

    this.props.setBox(box);

    console.log("facerecognitionbox", box);
  };

  //recieves URL from imagelinkfrom input, then sets state//
  onInputChange = (e) => {
    this.setState({ input: e.target.value });
  };

  //changes the state of 'imageUrl' to 'input' which recieves data from 'onInputChange' from ImageLinkform.js,
  // and handles main API call. Sends the inputed url to CLARIFAI which return object with face box detection numbers.
  //This is then passed to the 'displayFaceBox()' with the recalculated box dimensions from 'calculateFaceLocation()'
  //as an argument, which takes ITS argument from the the current json 'response'.
  //The fetch() to '/image' is call to the 'image' server to update the number of entries (submission) the user has made.
  //'Object.assign' is used to update only the state for 'user entries' otherwise the name reutrn user name returns
  //'undefined' as the whole user object in state is being updated. This way only 'entries' will get updated in the
  //user object.
  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    this.props.handleAPI({ input: this.state.input });

    this.props.handleImage({ id: this.props.user.userProfile.id });
  };

  //waits for data from api to load in state
  componentDidUpdate(prevProps) {
    if (this.props.user.clarifaiData !== prevProps.user.clarifaiData) {
      this.displayFaceBox(
        this.calculateFaceLocation(this.props.user.clarifaiData)
      );
    } else {
      console.log("no luck");
    }
  }

  //--------------
  render() {
    //--------------------------------------------
    const clarifaiAPIReturn = this.props.user;

    //--------------------------------------------------
    //destructures
    const { isSignedIn, imageUrl, route, boxes, faceData, input } = this.state;
    const { cboxes, regions, clarifaiData } = this.props.user;
    const { classes } = this.props;
    //

    return (
      <>
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />

        <CardData
          clarifaiData={clarifaiData}
          imageUrl={imageUrl}
          boxes={boxes}
          input={input}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionsToProps = {
  handleAPI,
  handleImage,
  setBox,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(FaceRecognition));
