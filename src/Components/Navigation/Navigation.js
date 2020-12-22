import React from "react";
import { Link } from "react-router-dom";

//Redux imports
import { connect } from "react-redux";

//actions
import { signOut } from "../../redux/actions/userAction";

const Navigation = ({ user, signOut }) => {
  // console.log(props);
  const handleSignOut = () => {
    signOut();
  };

  if (user.isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={handleSignOut}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p onClick className="f3 link dim black underline pa3 pointer">
          Sign In
        </p>
        <p onClick className="f3 link dim black underline pa3 pointer">
          Register
        </p>
      </nav>
    );
  }
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapActionToProps = {
  signOut,
};

export default connect(mapStateToProps, mapActionToProps)(Navigation);
