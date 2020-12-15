import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  CLARIFAI_DATA,
  UPDATE_ENTRIES,
  LOADING,
  STOPPED_LOADING,
  CLARIFAI_LOADED,
  SIGN_OUT,
} from "../types";

//-----------------------------------------

const initialState = {
  clarifaiData: {},

  input: "",

  imageUrl: "",

  cboxes: [],

  route: "signin",

  isSignedIn: false,

  loading: false,

  userProfile: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

//---------------------------------------------

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        isSignedIn: true,
        userProfile: {
          ...action.payload,
        },
      };
    case CLARIFAI_DATA:
      return {
        ...state,
        clarifaiData: action.payload,
        loading: false,
      };
    case UPDATE_ENTRIES:
      return {
        ...state,
        userProfile: {
          ...state.userProfile,
          entries: action.payload,
        },
        loading: false,
      };
    case LOADING:
      return {
        ...state,
        loading: true,
      };
    case SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
      };
    case "setImageUrl":
      return {
        ...state,
        imageUrl: action.payload,
      };
    case "setBox":
      return {
        ...state,
        cboxes: action.payload,
      };
    default:
      return state;
  }
}
