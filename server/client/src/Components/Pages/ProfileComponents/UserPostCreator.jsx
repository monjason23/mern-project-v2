import React, { PureComponent, Fragment } from "react";
import { connect } from "react-redux";
import { authCreateUserPost } from "../../../Redux/Actions";

import UserPostList from "./UserPostList";

class UserPostCreator extends PureComponent {
  state = {
    content: ""
  };

  handleTextAreaChange = () => e => {
    this.setState({
      content: e.target.value
    });
  };

  handleSubmit = () => e => {
    e.preventDefault();

    let { content } = this.state;
    let { authCreateUserPost } = this.props;

    authCreateUserPost(content);
  };

  render() {
    return (
      <Fragment>
        <div className="post-creator">
          <form className="post-creator__form" onSubmit={this.handleSubmit()}>
            <textarea
              className="post-creator__textarea"
              name="user-post"
              cols="30"
              rows="10"
              onChange={this.handleTextAreaChange()}
            />
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>

        <UserPostList />
      </Fragment>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authCreateUserPost: content => dispatch(authCreateUserPost(content))
  };
}

export default connect(
  null,
  mapDispatchToProps
)(UserPostCreator);
