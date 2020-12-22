import React from "react";

function useBox(id, clarifaiData) {
  //calculateFace

  if (id && Object.keys(clarifaiData).length) {
    const width = Number(id.width);
    const height = Number(id.height);
    console.log(height, width);

    return clarifaiData.results[0].outputs[2].data.regions.map((face) => {
      const clarifaiFace = face.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });
  } else {
    return <div>'hello'</div>;
  }
}

export { useBox };
