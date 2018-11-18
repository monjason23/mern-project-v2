import { combineReducers } from "redux";
import { userAction, postAction } from "../constants";

function userAuth(state = { isLoading: false }, action) {
  switch (action.type) {
    case userAction.LOGIN_PENDING:
      return {
        isLoading: true
      };

    case userAction.LOGIN_SUCCESS:
    case userAction.LOGOUT_FAILURE:
      return {
        isLoading: false,
        user: action.payload
      };

    case userAction.LOGOUT_SUCCESS:
    case userAction.LOGIN_FAILURE:
      return {
        isLoading: false
      };

    default:
      return state;
  }
}

function userInfo(state = { isLoading: false }, action) {
  switch (action.type) {
    case userAction.GET_POST_PENDING:
      return {
        isLoading: true
      };

    case userAction.GET_INFO_SUCCESS:
      return {
        isLoading: false,
        info: action.payload
      };

    default:
      return state;
  }
}

function userPosts(state = { isLoading: false }, action) {
  switch (action.type) {
    case postAction.GET_POST_PENDING:
      return {
        isLoading: true
      };

    case postAction.GET_POST_SUCCESS:
      return {
        isLoading: false,
        posts: action.payload
      };

    case postAction.GET_POST_FAILURE:
      return {
        isLoading: false
      };

    default:
      return state;
  }
}

function userLoggedIn(state = false, action) {
  switch (action.type) {
    case userAction.USER_LOGGED_IN:
      return true;

    case userAction.USER_LOGGED_OUT:
      return false;

    default:
      return state;
  }
}

export default combineReducers({
  userAuth,
  userPosts,
  userLoggedIn,
  userInfo
});
