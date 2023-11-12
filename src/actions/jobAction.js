import axios from "axios";
const url = "http://localhost:8501/Job";

// Fetch Job
export const getJob =
  (filter = {}) =>
  async (dispatch) => {
    dispatch({ type: "JOB_REQUEST" });
    const res = await axios.get(url + "/", {
      params: filter,
      withCredentials: true,
    });
    if (res.data.success)
      return dispatch({
        type: "FETCH_JOB_SUCCESS",
        data: res.data.data,
      });
    else return dispatch({ type: "FETCH_JOB_FAIL" });
  };
// Add Job
export const addJob =
  (
    position,
    pastExperienceDuration,
    locations,
    expectedSalary,
    benefits,
    skills,
    responsibility,
    positionType,
    description,
    allowWFH
  ) =>
  async (dispatch) => {
    dispatch({ type: "JOB_REQUEST" });
    const res = await axios.post(
      url + "/Add",
      {
        position,
        pastExperienceDuration,
        locations,
        expectedSalary,
        benefits,
        skills,
        responsibility,
        positionType,
        description,
        allowWFH,
      },
      {
        withCredentials: true,
      }
    );
    if (res.data.success)
      return dispatch({ type: "ADD_JOB_SUCCESS", data: res.data.msg });
    else return dispatch({ type: "ADD_JOB_FAIL", data: res.data.msg });
  };
// Update Job
export const updateJob = (jobId, updates) => async (dispatch) => {
  dispatch({ type: "JOB_REQUEST" });
  const res = await axios.put(
    url + "/Update",
    { jobId, updates },
    {
      withCredentials: true,
    }
  );
  if (res.data.success)
    dispatch({ type: "UPDATE_JOB_SUCCESS", data: res.data.msg });
  else return dispatch({ type: "UPDATE_JOB_FAIL", data: res.data.msg });
};
// Remove Job
export const removeJob = (jobId) => async (dispatch) => {
  dispatch({ type: "JOB_REQUEST" });
  const res = await axios.delete(url + "/Remove", {
    data: { jobId },
    withCredentials: true,
  });
  if (res.data.success)
    dispatch({ type: "REMOVE_JOB_SUCCESS", data: res.data.msg });
  else return dispatch({ type: "REMOVE_JOB_FAIL", data: res.data.msg });
};
// Apply Job
export const applyJob = (jobId) => async (dispatch) => {
  dispatch({ type: "JOB_REQUEST" });
  const res = await axios.put(
    "http://localhost:8501/User/Job/Apply",
    { jobId },
    { withCredentials: true }
  );
  if (res.data.success) {
    dispatch({ type: "APPLY_JOB_SUCCESS" });
    await dispatch(getJob());
  } else return dispatch({ type: "APPLY_JOB_FAIL" });
  return res.data.success;
};
