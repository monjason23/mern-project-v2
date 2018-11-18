import React, { PureComponent, Fragment } from "react";

import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";

import withAuth from "../Authentication/withAuth";
import { authLogin } from "../../Redux/Actions";

import AuthService from "../Authentication/AuthService";

const Auth = new AuthService();

class SignUp extends PureComponent {
  state = {
    username: "",
    password: "",
    email: "",
    success: false
  };

  handleInputChange = prop => e => {
    this.setState({
      [prop]: e.target.value
    });
  };

  handleSubmit = () => e => {
    e.preventDefault();
    let { username, password, email } = this.state;

    Auth.signUp(username, password, email).then(data => {
      if (data)
        this.setState({
          success: true
        });
    });
  };

  render() {
    if (this.state.success) {
      return (
        <Fragment>
          <h2>Sign Up Success!</h2>
          <Link to="/">Login</Link>
        </Fragment>
      );
    }

    return (
      <div className="login-form-container">
        <h2>Sign Up</h2>
        <form onSubmit={this.handleSubmit()} className="login-form">
          <label htmlFor="su_username">Username:</label>
          <input
            type="text"
            id="su_username"
            className="login-form__input"
            onChange={this.handleInputChange("username")}
          />
          <br />
          <br />
          <label htmlFor="su_password">Password:</label>
          <input
            type="password"
            id="su_password"
            className="login-form__input"
            onChange={this.handleInputChange("password")}
          />
          <br />
          <br />
          <label htmlFor="su_email">Email:</label>
          <input
            type="email"
            id="su_email"
            className="login-form__input"
            onChange={this.handleInputChange("email")}
          />
          <br />
          <br />
          <button type="submit" className="login-form__button">
            Sign up
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ userAuth }) {
  return {
    userAuth
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authLogin: (username, password) => dispatch(authLogin(username, password))
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withAuth(SignUp))
);
