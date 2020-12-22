import React, { useRef } from "react";

//hooks
import { useBox } from "../hooks/useBox";

//==================================

function CardData({ clarifaiData, boxes, imageUrl, input }) {
  const [age, setAge] = React.useState();
  const [gender, setGender] = React.useState();
  const [race, setRace] = React.useState();

  const [currentBox, setCurrentBox] = React.useState(0);

  //-----------------------------
  const test = React.useRef();

  //------------------------------

  const getBoxes = useBox(test.current, clarifaiData);

  console.log("clarifaiData CARD", clarifaiData);

  console.log("getBox return", getBoxes);

  console.log(currentBox);

  function setGenderState(data) {
    setGender([data.data.concepts[0]]);
  }
  function setAgeState(data) {
    setAge([data.data.concepts[0], data.data.concepts[1]]);
  }
  function setRaceState(data) {
    setRace([data.data.concepts[0], data.data.concepts[1]]);
  }

  function setMouseOverBoxIndex(idx) {
    setCurrentBox(idx);
  }

  //---------------------------

  //demographicMarkup
  let markup;
  if (age?.length && gender?.length && race?.length) {
    markup = (
      <div>
        <ul>
          <h2>Age</h2>
          {age.map((x, idx) => (
            <ul>
              <li>
                <span>{x.name}</span>
                <span style={{ paddingLeft: "50px" }}>
                  {" "}
                  {Math.floor(x.value * 1000) / 10}%
                </span>
              </li>
            </ul>
          ))}
        </ul>
        <ul>
          <h2>Gender</h2>
          {gender.map((x, idx) => (
            <ul>
              <li>
                <span>{x.name}</span>
                <span style={{ paddingLeft: "50px" }}>
                  {" "}
                  {Math.floor(x.value * 1000) / 10}%
                </span>
              </li>
            </ul>
          ))}
        </ul>
        <ul>
          <h2>Ethnicity</h2>
          {race.map((x, idx) => (
            <ul>
              <li>
                <span>{x.name}</span>
                <span style={{ paddingLeft: "50px" }}>
                  {" "}
                  {Math.floor(x.value * 1000) / 10}%
                </span>
              </li>
            </ul>
          ))}
        </ul>
      </div>
    );
  }

  //--------------------------------

  //thumbmarkup

  // let thumbnail = getBoxes.length ? (
  //   <div style={{ width: "100%", position: "relative" }}>
  //     {/* <div style={{ margin: "50px", position: "absolute", flex: "1 1 auto" }}> */}
  //     <div style={{ overflow: "hidden" }}>
  //       <img
  //         ref={test}
  //         //   className="mainImage"
  //         //   id={"test"}
  //         alt=""
  //         src={input}
  //         style={{}}
  //       />
  //     </div>
  //     {/* <div
  //         className="bounding-box "
  //         style={{
  //           top: getBoxes[currentBox].topRow,
  //           right: getBoxes[currentBox].rightCol,
  //           bottom: getBoxes[currentBox].bottomRow,
  //           left: getBoxes[currentBox].leftCol,
  //         }}
  //       ></div> */}
  //     {/* </div> */}
  //   </div>
  // ) : null;

  //-------------------------------------

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div style={{ width: "100%", position: "relative" }}>
        <div style={{ margin: "50px", position: "absolute", flex: "1 1 auto" }}>
          <img
            id="inputimage"
            alt=""
            src={imageUrl}
            style={{ width: "800px" }}
          />
          {Object.keys(clarifaiData)
            ? boxes.map((box, person) => {
                return (
                  <div
                    onMouseEnter={() => {
                      setGenderState(
                        clarifaiData.results[0].outputs[3].data.regions[person]
                      );
                      setAgeState(
                        clarifaiData.results[0].outputs[4].data.regions[person]
                      );
                      setRaceState(
                        clarifaiData.results[0].outputs[2].data.regions[person]
                      );
                      setMouseOverBoxIndex(person);
                    }}
                    key={person}
                    className="bounding-box  "
                    style={{
                      top: box.topRow,
                      right: box.rightCol,
                      bottom: box.bottomRow,
                      left: box.leftCol,
                    }}
                  ></div>
                );
              })
            : null}
        </div>
      </div>

      <div style={{ width: "100%", paddingTop: "40px" }}>{markup}</div>

      <div>
        <img
          ref={test}
          //   className="mainImage"
          //   id={"test"}
          alt=""
          src={input}
          style={{
            width: "400px",
            display: "none",
          }}
        />
      </div>
    </div>
  );
}

export { CardData };
