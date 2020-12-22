import React from "react";

//Redux imports
import { connect } from "react-redux";

const Rank = ({ userProfile }) => {
  return (
    <div>
      <div className="white f2">
        {` ${userProfile.name}, you have made ${userProfile.entries} searches`}
      </div>
      {/* <div className="f1">{userProfile.entries}</div> */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  userProfile: state.user.userProfile,
});
//
export default connect(mapStateToProps, null)(Rank);
