import React, { Component, Fragment } from "react";
import "./FaceRecognition.css";

//Redux imports
import { connect } from "react-redux";

//actions
import { handleAPI, handleImage, setBox } from "../../redux/actions/userAction";

//components
import ImageLinkForm from "../ImageLinkForm/ImageLinkForm";
import Canvas from "./Canvas";

//mui
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Container";
import { CardMedia } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

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
    };
  }
  //---------------------------------------

  //receives 'response' from 'onButtonSubmit(), then return an object used to set box state
  calculateFaceLocation = (data) => {
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(height, width);

    //map() is used on on the regions which contains the arrays and loops the region_info which
    //contains the boundingbox object. map() returns an object for each face detected, which is then
    //put into an array in the boxes initial state. This is then map() again in facerecognitionjs
    //to output the border boxes for each face.
    return data.outputs[0].data.regions.map((face) => {
      const clarifaiFace = face.region_info.bounding_box;
      console.log(clarifaiFace);
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

  ///setstate for each face
  onMouseEnter = (data) => {
    const gender = data.data.concepts[20].name;

    this.setState({
      faceData: [
        {
          [data.data.concepts[0].name]:
            Math.floor(data.data.concepts[0].value * 1000) / 10,
        },
        {
          [data.data.concepts[20].name]:
            Math.floor(data.data.concepts[20].value * 1000) / 10,
        },
        {
          [data.data.concepts[21].name]:
            Math.floor(data.data.concepts[21].value * 1000) / 10,
        },
        {
          [data.data.concepts[22].name]:
            Math.floor(data.data.concepts[22].value * 1000) / 10,
        },
        {
          [data.data.concepts[23].name]:
            Math.floor(data.data.concepts[23].value * 1000) / 10,
        },
        {
          [data.data.concepts[24].name]:
            Math.floor(data.data.concepts[24].value * 1000) / 10,
        },
        {
          [data.data.concepts[25].name]:
            Math.floor(data.data.concepts[25].value * 1000) / 10,
        },
        {
          [data.data.concepts[26].name]:
            Math.floor(data.data.concepts[26].value * 1000) / 10,
        },
        {
          [data.data.concepts[27].name]:
            Math.floor(data.data.concepts[27].value * 1000) / 10,
        },
        {
          [data.data.concepts[28].name]:
            Math.floor(data.data.concepts[28].value * 1000) / 10,
        },
      ],
    });
    console.log(data);
  };

  //--------------
  render() {
    //destructures
    const { isSignedIn, imageUrl, route, boxes, faceData } = this.state;
    const { cboxes, regions, clarifaiData } = this.props.user;
    const { classes } = this.props;
    //

    // console.log(Object.getOwnPropertyNames(faceData[1]));

    //profile markup
    let profileMarkup = faceData[0]
      ? faceData.map((x, idx) => {
          return (
            <ul>
              <li>
                <span className="label">
                  {Object.getOwnPropertyNames(faceData[idx])} {"  "}
                </span>
                <span className="info">{Object.values(faceData[idx])}</span>
              </li>
            </ul>
          );
        })
      : null;

    console.log(this.state);
    return (
      <Fragment>
        <Grid container>
          <Grid item xs={12}>
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
          </Grid>

          <Grid item sm={6}>
            {profileMarkup && (
              <div
                style={{
                  position: "relative",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                <span
                  className="label"
                  style={{
                    paddingLeft: "50px",
                    fontSize: "20px",
                    paddingTop: "30px",
                    color: "grey",
                  }}
                >
                  DEMOGRAPHIC
                </span>
                <span
                  className="info"
                  style={{
                    fontSize: "20px",
                    color: "grey",
                  }}
                >
                  PROBABILITY %
                </span>
                {profileMarkup}
              </div>
            )}
          </Grid>
          <Grid item sm={6} xs={12}>
            <div className="mainContainer">
              <div className="mainImageContainer">
                <div className="mainImageWrapBox">
                  <div className="mainImageWrap">
                    <img
                      className="mainImage"
                      id="inputimage"
                      alt=""
                      src={imageUrl}
                      width="600px"
                      height="400px"
                    />
                    {boxes.map((box, index) => {
                      return (
                        <div
                          onMouseEnter={() =>
                            this.onMouseEnter(
                              clarifaiData.outputs[0].data.regions[index]
                            )
                          }
                          key={box.topRow}
                          className="bounding-box  "
                          style={{
                            top: box.topRow,
                            right: box.rightCol,
                            bottom: box.bottomRow,
                            left: box.leftCol,
                          }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Fragment>
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
