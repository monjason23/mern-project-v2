import React, { PureComponent } from "react";

import { connect } from "react-redux";
import { authUserLoggedIn } from "../../Redux/Actions";

const withAuth = WrappedComponent => {
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(
    class HOC extends PureComponent {
      componentDidMount() {
        this.props.authUserLoggedIn();
      }
      render() {
        return <WrappedComponent {...this.props} />;
      }
    }
  );
};

function mapStateToProps({ userLoggedIn }) {
  return {
    userLoggedIn
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authUserLoggedIn: () => dispatch(authUserLoggedIn())
  };
}

export default withAuth;
