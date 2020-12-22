import React, { Fragment } from "react";

// import fabric from "fabric";

//Redux imports
import { connect } from "react-redux";

//actions
import { setBox } from "../../redux/actions/userAction";

export class Canvas extends React.Component {
  constructor(props) {
    super();
    this.state = {
      canvasBoxes: [],
    };
  }

  calculateFaceLocation = (data) => {
    //this.refs.image is pointing at the img for canvas reference
    const image = this.refs.canvas;
    const width = Number(image.width);
    const height = Number(image.height);

    return data.outputs[0].data.regions.map((face) => {
      const clarifaiFace = face.region_info.bounding_box;

      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });
  };

  //sets local state for 'canvasBoxes'
  displayFaceBox = (box) => {
    this.setState({ canvasBoxes: box });
    this.props.setBox(box);
    console.log("CanvasBox", box);
  };

  //componentDIdMount
  componentDidMount() {
    //function to set local State 'canvasBoxes'
    this.displayFaceBox(
      this.calculateFaceLocation(this.props.user.clarifaiData)
    );
  }

  //waits for state to be updated so we can access it
  componentDidUpdate(prevState) {
    if (this.state.canvasBoxes !== prevState.canvasBoxes) {
      const { canvasBoxes } = this.state;

      //'box' props passed down from FaceDetection.js inside a map()
      const { box } = this.props;

      console.log(canvasBoxes);

      const canvas = this.refs.canvas;
      const ctx = canvas.getContext("2d");
      const img = this.refs.image;

      canvas.width = canvas.scrollWidth;
      canvas.height = canvas.scrollHeight;

      console.log(canvas.width);

      const squareWidth = canvas.width - (box.leftCol + box.rightCol);
      const squareHeight = canvas.height - (box.topRow + box.bottomRow);

      // canvas.width = squareWidth;
      // canvas.height = squareHeight;

      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(box.leftCol, box.topRow, squareWidth, squareHeight);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(
          img,
          0,
          0,
          img.naturalWidth,
          img.naturalHeight,
          0,
          0,
          canvas.width,
          canvas.height
        );
      };
    } else {
      console.log("no update in canvasboxes");
    }
  }

  //
  handleThumbClick = () => {
    console.log(this.props.clarifai.id);
  };
  //--------------------------------------------------------------------------

  render() {
    const { imageUrl, cboxes } = this.props.user;
    const { canvasBoxes } = this.state;

    // console.log(canvasBoxes);

    console.log(this.props.clarifai);

    return (
      <Fragment>
        <canvas
          // key={this.props.clarifai.outputs[0].data.regions}
          onClick={this.handleThumbClick}
          ref="canvas"
          width="100"
          height="100"
          style={{ border: "solid 1px" }}
        />
        <div className="center ma">
          <div className="absolute mt2">
            <img
              ref="image"
              src={imageUrl.input}
              className=""
              style={{ display: "none", width: "500px", height: "300px" }}
            />
            {canvasBoxes.map((box) => {
              return (
                <div
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
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionToProps = {
  setBox,
};
export default connect(mapStateToProps, mapActionToProps)(Canvas);
