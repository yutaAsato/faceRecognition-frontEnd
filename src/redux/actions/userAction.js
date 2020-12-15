import {
  SET_USER,
  SIGN_OUT,
  UPDATE_ENTRIES,
  CLARIFAI_DATA,
  LOADING,
  STOPPED_LOADING,
  CLARIFAI_LOADED,
} from "../types";

import axios from "axios";
import { bindActionCreators } from "redux";

//---------------------------------------------------------------

//signin
export const onSubmitSignin = (data) => (dispatch) => {
  axios
    .post("signin", data)
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("token", "Bearer " + res.data);
      axios.defaults.headers.common["Authorization"] = "Bearer " + res.data;
      dispatch(getUser());
    })
    .catch((err) => {
      console.log(err);
    });
};

//signOut
export const signOut = () => (dispatch) => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SIGN_OUT });
};

//getuser
export const getUser = () => (dispatch) => {
  axios
    .get("getUser")
    .then((res) => {
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//CLARIFAI API CALL- handleAPI
export const handleAPI = (data) => (dispatch) => {
  dispatch({ type: LOADING });
  dispatch({ type: "setImageUrl", payload: data });
  axios.post("imageurl", data).then((res) => {
    dispatch({
      type: CLARIFAI_DATA,
      payload: res.data,
    });
  });
};

//inage count - handleImage
export const handleImage = (id) => (dispatch) => {
  dispatch({ type: LOADING });

  axios.put("image", id).then((res) => {
    // console.log(res.data);
    dispatch({
      type: UPDATE_ENTRIES,
      payload: res.data,
    });
  });
};

//can usehookds for this later
export const setBox = (data) => (dispatch) => {
  dispatch({ type: "setBox", payload: data });
};
