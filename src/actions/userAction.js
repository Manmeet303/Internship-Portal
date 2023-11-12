import axios from "axios";
import store from "../store";
const url = "http://localhost:8501";
// Login user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });

    const data = { email, password };
    const res = await axios.post(url + "/Auth/User/Login", data, {
      withCredentials: true,
    });
    if (res.data.success) {
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: "LOGIN_FAIL",
        payload: res.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: "LOGIN_FAIL",
      payload: error.response.data.message,
    });
  }
};

// Register user
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_USER_REQUEST" });

    const res = await axios.post(url + "/Auth/User/Register", userData, {
      withCredentials: true,
    });
    if (res.data.success) {
      dispatch({
        type: "REGISTER_USER_SUCCESS",
        payload: res.data.data,
      });
    } else {
      dispatch({
        type: "REGISTER_USER_FAIL",
        payload: res.data.msg,
      });
    }
  } catch (error) {
    dispatch({
      type: "REGISTER_USER_FAIL",
      payload: error.response.data.message,
    });
  }
};

//Logout user
export const logout = () => async (dispatch) => {
  try {
    await axios.get(url + "/Auth/Logout", {
      withCredentials: true,
    });
    // console.log("LogOut");
    dispatch({
      type: "LOGOUT_SUCCESS",
    });
  } catch (error) {
    dispatch({
      type: "LOGOUT_FAIL",
      payload: error.response.data.message,
    });
  }
};
//Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_USER_REQUEST",
    });
    const res = await axios.get(url + "/User/Profile", {
      withCredentials: true,
    });
    if (res.data.success) {
      dispatch({
        type: "LOAD_USER_SUCCESS",
        payload: { user: res.data.data.user, type: res.data.data.type },
      });
    } else {
      //if can not fetch form user then try for company
      try {
        const companyRes = await axios.get(url + "/Company/Profile", {
          withCredentials: true,
        });
        if (companyRes.data.success) {
          dispatch({
            type: "LOAD_USER_SUCCESS",
            payload: {
              user: companyRes.data.data.user,
              type: companyRes.data.data.type,
            },
          });
        } else {
          dispatch({
            type: "LOAD_USER_FAIL",
            payload: res.data.msg,
          });
        }
      } catch (error) {
        dispatch({
          type: "LOAD_USER_FAIL",
          payload: error.message,
        });
      }
    }
  } catch (error) {
    dispatch({
      type: "LOAD_USER_FAIL",
      payload: error.message,
    });
  }
};
//Update profile
export const updateProfile = (data) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PROFILE_REQUEST" });

    const res = await axios.put(url + "/User/UpdateProfile", data, {
      withCredentials: true,
    });

    console.log("Profile Update", res.data);

    dispatch({
      type: "UPDATE_PROFILE_SUCCESS",
      payload: res.data.success,
    });
  } catch (error) {
    console.log("Profile Update", error);
    dispatch({
      type: "UPDATE_PROFILE_FAIL",
      payload: error.message,
    });
  }
};
//Update password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    // dispatch({ type: "UPDATE_PASSWORD_REQUEST" })
    // console.log(store.getState());

    const res = await axios.put(url + "/User/UpdatePassword", passwords, {
      withCredentials: true,
    });
    console.log(store.getState());
    console.log(res.data);

    // dispatch({ type: "UPDATE_PASSWORD_SUCCESS"})
  } catch (error) {
    dispatch({ type: "UPDATE_PASSWORD_FAIL" });
  }
};

//Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: "CLEAR_ERRORS",
  });
};
// Get Company List
export const companyList = () => async (dispatch) => {
  const res = await axios.get(url + "/Company/", {
    withCredentials: true,
  });
  if (res.data.success)
    return dispatch({
      type: "COMPANY_LIST_FETCH_SUCCESS",
      payload: res.data,
    });
  else return dispatch({ type: "COMPANY_LIST_FETCH_FAIL" });
};
