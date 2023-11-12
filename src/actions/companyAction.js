import axios from "axios";
const url = "http://localhost:8501";

export const loginCompany = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });

    const data = { email, password };
    const res = await axios.post(url + "/Auth/Company/Login", data, {
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
        payload: res.data.error,
      });
    }
  } catch (error) {
    console.log(error);
    dispatch({
      type: "LOGIN_FAIL",
      payload: error.response.data.message,
    });
  }
};

export const registerCompany = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "REGISTER_USER_REQUEST" });

    const res = await axios.post(url + "/Auth/Company/Register", userData, {
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
//Update profile
/**
 * all action same ONLY backend url changed
 */
export const updateCompanyProfile = (data) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PROFILE_REQUEST" });

    // console.log("Action Data: ", data);
    const res = await axios.put(url + "/Company/UpdateProfile", data, {
      withCredentials: true,
    });

    // console.log("Profile Update ", res.data);

    dispatch({
      type: "UPDATE_PROFILE_SUCCESS",
      payload: res.data.success,
    });
  } catch (error) {
    console.log("Profile Update Error", error);
    dispatch({
      type: "UPDATE_PROFILE_FAIL",
      payload: error.message,
    });
  }
};
//Load Company
export const loadCompany = () => async (dispatch) => {
  try {
    dispatch({
      type: "LOAD_USER_REQUEST",
    });
    const res = await axios.get(url + "/Company/Profile", {
      withCredentials: true,
    });
    if (res.data.success) {
      dispatch({
        type: "LOAD_USER_SUCCESS",
        payload: { user: res.data.data.user, type: res.data.data.type },
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
};

//Update password
export const updateCompanyPassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: "UPDATE_PASSWORD_REQUEST" });
    // console.log(store.getState());

    // console.log("passwords", passwords);
    const res = await axios.put(url + "/Company/UpdatePassword", passwords, {
      withCredentials: true,
    });
    // console.log(store.getState());
    // console.log(res.data);

    if (res.data.success) {
      dispatch({ type: "UPDATE_PASSWORD_SUCCESS", payload: res.data.success });
    } else {
      dispatch({ type: "UPDATE_PASSWORD_FAIL" });
    }
  } catch (error) {
    dispatch({ type: "UPDATE_PASSWORD_FAIL" });
  }
};

// show applicants
/**
 * id :- can be Job Id ,Intersnhip Id , placement Id
 * type :- can be "Internship" ,"Job","Placement"
 */
export const showApplicants =
  ({ id, type }) =>
  async (dispatch) => {
    try {
      // console.log("id,type", {internshipId:id}, type);
      var res;
      if (type.toLowerCase() === "job") {
        res = await axios.post(
          url + `/Company/${type}/Show`,
          { jobId: id },
          {
            withCredentials: true,
          }
        );
      } else if (type.toLowerCase() === "internship") {
        res = await axios.post(
          url + `/Company/${type}/Show`,
          { internshipId: id },
          {
            withCredentials: true,
          }
        );
      } else if (type.toLowerCase() === "placement") {
        res = await axios.post(
          url + `/Company/${type}/Show`,
          { placementId: id },
          {
            withCredentials: true,
          }
        );
      }
      // console.log(`After getting( ${type} ) applicants data:>> `, res.data);

      if (res.data.success) {
        dispatch({
          type: `SHOW_${type.toUpperCase()}_APPLICANTS_SUCCESS`,
          data: res.data.data,
        });
      } else {
        dispatch({ type: `SHOW_${type.toUpperCase()}_APPLICANTS_FAIL` });
      }
    } catch (error) {
      dispatch({ type: `SHOW_${type.toUpperCase()}_APPLICANTS_FAIL` });
    }
  };
// approved applicants
/**
 * id :- can be Job Id ,Intersnhip Id , placement Id
 * type :- can be "Internship" ,"Job","Placement"
 * aplicantId :- applicantId for other use
 * applicant  :- for future use
 */
export const approveApplicant =
  ({ applicantId, id, applicant, type }) =>
  async (dispatch) => {
    try {
      // console.log("applicantId,id,type", applicantId, id, type);
      let res;
      if (type.toLowerCase() === "job") {
        res = await axios.post(
          url + `/Company/${type}/Approve`,
          { applicantId, jobId: id },
          {
            withCredentials: true,
          }
        );
      } else if (type.toLowerCase() === "internship") {
        res = await axios.post(
          url + `/Company/${type}/Approve`,
          { applicantId, internshipId: id },
          {
            withCredentials: true,
          }
        );
      } else if (type.toLowerCase() === "placement") {
        res = await axios.post(
          url + `/Company/${type}/Approve`,
          { applicantId, placementId: id },
          {
            withCredentials: true,
          }
        );
      }
      // console.log("After Approve DATA:>> ", res.data);

      if (res.data.success) {
        dispatch({
          type: "APPLICANTS_APPROVED_SUCCESS",
        });
      } else {
        dispatch({ type: "APPLICANTS_APPROVED_FAIL" });
      }
      return res.data.msg;
    } catch (error) {
      dispatch({ type: "APPLICANTS_APPROVED_FAIL" });
    }
  };
// reject applicants
/**
 * id :- can be Job Id ,Intersnhip Id , placement Id
 * type :- can be "Internship" ,"Job","Placement"
 * aplicantId :- applicantId for other use
 * applicant  :- for future use
 */
export const rejectApplicant =
  ({ applicantId, id, applicant, type }) =>
  async (dispatch) => {
    try {
      // console.log("applicantId,id,type", applicantId, id, type);
      let res;
      if (type.toLowerCase() === "job") {
        res = await axios.post(
          url + `/Company/${type}/Reject`,
          { applicantId, jobId: id },
          {
            withCredentials: true,
          }
        );
      } else if (type.toLowerCase() === "internship") {
        res = await axios.post(
          url + `/Company/${type}/Reject`,
          { applicantId, internshipId: id },
          {
            withCredentials: true,
          }
        );
      } else if (type.toLowerCase() === "placement") {
        res = await axios.post(
          url + `/Company/${type}/Reject`,
          { applicantId, placementId: id },
          {
            withCredentials: true,
          }
        );
      }
      // console.log("After Reject DATA:>> ", res.data);

      if (res.data.success) {
        dispatch({
          type: "APPLICANTS_REJECT_SUCCESS",
        });
      } else {
        dispatch({ type: "APPLICANTS_REJECT_FAIL" });
      }
      return res.data.msg;
    } catch (error) {
      dispatch({ type: "APPLICANTS_REJECT_FAIL" });
    }
  };
