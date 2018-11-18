import { userAction, postAction } from "../constants";
import AuthService from "../../Components/Authentication/AuthService";

const Auth = new AuthService();

//---START: AUTH LOGIN---//

function authLogin(username, password) {
  return dispatch => {
    dispatch(authLoginPending());

    Auth.login(username, password)
      .then(userData => {
        setTimeout(() => {
          dispatch(authLoginSuccessful(userData));
          dispatch(authGetUserInfo());
          dispatch(authLoggedIn());
        }, 1000);
      })
      .catch(err => {
        dispatch(authLoginFailed());
        dispatch(authLoggedOut());
      });
  };
}

function authLogout() {
  return dispatch => {
    Auth.logout()
      .then(token => {
        if (!token) {
          dispatch(authLoggedOut());
        }
      })
      .catch(err => dispatch(authLoggedIn()));
  };
}

function authUserLoggedIn() {
  return dispatch => {
    if (Auth.loggedIn()) {
      dispatch(authLoggedIn());
    } else dispatch(authLoggedOut());
  };
}

function authLoginPending() {
  return {
    type: userAction.LOGIN_PENDING
  };
}

function authLoginSuccessful(userData) {
  return {
    type: userAction.LOGIN_SUCCESS,
    payload: userData
  };
}

function authLoginFailed() {
  return {
    type: userAction.LOGIN_FAILURE
  };
}

function authLoggedIn() {
  return {
    type: userAction.USER_LOGGED_IN,
    payload: true
  };
}

function authLoggedOut() {
  return {
    type: userAction.USER_LOGGED_OUT,
    payload: false
  };
}

//---END: AUTH LOGIN---//

function authGetUserPosts() {
  return dispatch => {
    dispatch(authGetUserPostsPending());

    Auth.getUserPosts()
      .then(({ data }) => {
        dispatch(authGetUserPostsSuccessful(data));
      })
      .catch(err => dispatch(authGetUserPostsFailed()));
  };
}

function authGetUserPostsPending() {
  return {
    type: postAction.GET_POST_PENDING
  };
}

function authGetUserPostsSuccessful(userPosts) {
  return {
    type: postAction.GET_POST_SUCCESS,
    payload: userPosts
  };
}

function authGetUserPostsFailed() {
  return {
    type: postAction.GET_POST_FAILURE
  };
}

function authCreateUserPost(content) {
  return dispatch => {
    dispatch(authCreateUserPostPending());

    Auth.createUserPost(content)
      .then(post => {
        if (post) {
          dispatch(authCreateUserPostSuccess());
          dispatch(authGetUserPosts());
        }
      })
      .catch(err => dispatch(authCreateUserPostFailure(err)));
  };
}

function authCreateUserPostPending() {
  return {
    type: postAction.CREATE_POST_PENDING
  };
}

function authCreateUserPostSuccess() {
  return {
    type: postAction.CREATE_POST_SUCCESS,
    payload: true
  };
}

function authCreateUserPostFailure(err) {
  return {
    type: postAction.CREATE_POST_PENDING,
    payload: err
  };
}

function authGetUserInfo() {
  return dispatch => {
    dispatch(authGetUserInfoPending());

    Auth.getUserInfo()
      .then(({ data }) => {
        dispatch(authGetUserInfoSuccess(data));
      })
      .catch(err => authGetUserInfoFailed());
  };
}

function authGetUserInfoPending() {
  return {
    type: userAction.GET_INFO_PENDING
  };
}

function authGetUserInfoSuccess(userInfo) {
  return {
    type: userAction.GET_INFO_SUCCESS,
    payload: userInfo
  };
}

function authGetUserInfoFailed() {
  return {
    type: userAction.GET_POST_FAILURE
  };
}

export {
  authLogin,
  authLogout,
  authUserLoggedIn,
  authGetUserPosts,
  authCreateUserPost,
  authGetUserInfo
};
