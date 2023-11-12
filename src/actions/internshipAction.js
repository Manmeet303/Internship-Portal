import axios from "axios";
import { getJob } from "./jobAction";
import { getPlacement } from "./placementAction";
const url = "http://localhost:8501/Internship";

// Fetch Internship
export const getInternship = (filter = {}) => async (dispatch) => {
    console.log("filter")
    dispatch({ type: "INTERNSHIP_REQUEST" });
    const res = await axios.get(url + "/", {
      params: filter,
      withCredentials: true,
    });
    if (res.data.success){
      return dispatch({
        type: "FETCH_INTERNSHIP_SUCCESS",
        data: res.data.data,
      });
    }
    else return dispatch({ type: "FETCH_INTERNSHIP_FAIL" });
  };
// Add Internship
export const addInternship =
  (
    position,
    openPositions,
    duration,
    locations,
    stipend,
    benefits,
    skills,
    positionType,
    description,
    allowWFH
  ) =>
  async (dispatch) => {
    dispatch({ type: "INTERNSHIP_REQUEST" });
    const res = await axios.post(
      url + "/Add",
      {
        position,
        openPositions,
        duration,
        locations,
        stipend,
        benefits,
        skills,
        positionType,
        description,
        allowWFH,
      },
      {
        withCredentials: true,
      }
    );
    // console.log(res.data);
    if (res.data.success)
      dispatch({
        type: "ADD_INTERNSHIP_SUCCESS",
        data: res.data.msg,
      });
    else
      return dispatch({
        type: "ADD_INTERNSHIP_FAIL",
        data: res.data.msg,
      });
  };
// Update Internship
export const updateInternship = (internshipId, updates) => async (dispatch) => {
  dispatch({ type: "INTERNSHIP_REQUEST" });
  const res = await axios.put(
    url + "/Update",
    { internshipId, updates },
    {
      withCredentials: true,
    }
  );
  if (res.data.success)
    dispatch({
      type: "UPDATE_INTERNSHIP_SUCCESS",
      data: res.data.msg,
    });
  else return dispatch({ type: "UPDATE_INTERNSHIP_FAIL", data: res.data.msg });
};
// Remove Internship
export const removeInternship = (internshipId) => async (dispatch) => {
  dispatch({ type: "INTERNSHIP_REQUEST" });
  const res = await axios.delete(url + "/Remove", {
    data: { internshipId },
    withCredentials: true,
  });
  if (res.data.success)
    dispatch({
      type: "REMOVE_INTERNSHIP_SUCCESS",
      data: res.data.msg,
    });
  else return dispatch({ type: "REMOVE_INTERNSHIP_FAIL", data: res.data.msg });
};
// Apply Internship
export const applyInternship = (internshipId) => async (dispatch) => {
  dispatch({ type: "INTERNSHIP_REQUEST" });
  const res = await axios.put(
    "http://localhost:8501/User/Internship/Apply",
    { internshipId },
    { withCredentials: true }
  );
  if (res.data.success) {
    dispatch({ type: "APPLY_INTERNSHIP_SUCCESS" });
    //resetting internship state
    await dispatch(getInternship());
  } else return dispatch({ type: "APPLY_INTERNSHIP_FAIL" });
  //return data for UI use
  return res.data.success;
};
// Withdraw Application
export const withdrawApplication =
  ({ id, workType }) =>
  async (dispatch) => {
    try {
      //   console.log("workType,internshipId:", workType,internshipId);

      var res;
      if (workType.toLowerCase() === "job") {
        res = await axios.put(
          `http://localhost:8501/User/${workType}/Withdraw`,
          { jobId: id },
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          //resetting Job state
          await dispatch(getJob());
        }
      } else if (workType.toLowerCase() === "internship") {
        res = await axios.put(
          `http://localhost:8501/User/${workType}/Withdraw`,
          { internshipId: id },
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          //resetting internship state
          await dispatch(getInternship());
        }
      } else if (workType.toLowerCase() === "placement") {
        res = await axios.put(
          `http://localhost:8501/User/${workType}/Withdraw`,
          { placementId: id },
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          //resetting Placement state
          await dispatch(getPlacement());
        }
      }
      // console.log(res.data);

      // for front end use
      return res.data.success;
    } catch (error) {
      //dispatch action of error
    }
  };
