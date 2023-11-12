import axios from "axios";
const url = "http://localhost:8501/Placement";

// Fetch Placement
export const getPlacement =
    (filter = {}) =>
    async (dispatch) => {
        dispatch({ type: "PLACEMENT_REQUEST" });
        const res = await axios.get(url + "/", {
            params: filter,
            withCredentials: true,
        });
        if (res.data.success)
            return dispatch({
                type: "FETCH_PLACEMENT_SUCCESS",
                data: res.data.data,
            });
        else return dispatch({ type: "FETCH_PLACEMENT_FAIL" });
    };
// Add Placement
export const addPlacement =
    (
        position,
        pastExperienceDuration,
        cgpaRequirement,
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
        dispatch({ type: "PLACEMENT_REQUEST" });
        const res = await axios.post(
            url + "/Add",
            {
                position,
                pastExperienceDuration,
                cgpaRequirement,
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
            dispatch({
                type: "ADD_PLACEMENT_SUCCESS",
                data: res.data.msg,
            });
        else
            return dispatch({
                type: "ADD_PLACEMENT_FAIL",
                data: res.data.msg,
            });
    };
// Update Placement
export const updatePlacement = (placementId, updates) => async (dispatch) => {
    dispatch({ type: "PLACEMENT_REQUEST" });
    const res = await axios.put(
        url + "/Update",
        { placementId, updates },
        {
            withCredentials: true,
        }
    );
    if (res.data.success)
        dispatch({
            type: "UPDATE_PLACEMENT_SUCCESS",
            data: res.data.msg,
        });
    else return dispatch({ type: "UPDATE_PLACEMENT_FAIL", data: res.data.msg });
};
// Remove Placement
export const removePlacement = (placementId) => async (dispatch) => {
    dispatch({ type: "PLACEMENT_REQUEST" });
    const res = await axios.delete(url + "/Remove", {
        data: { placementId },
        withCredentials: true,
    });
    if (res.data.success)
        dispatch({
            type: "REMOVE_PLACEMENT_SUCCESS",
            data: res.data.msg,
        });
    else return dispatch({ type: "REMOVE_PLACEMENT_FAIL", data: res.data.msg });
};
// Apply Placement
export const applyPlacement = (placementId) => async (dispatch) => {
    dispatch({ type: "PLACEMENT_REQUEST" });
    const res = await axios.put(
        "http://localhost:8501/User/Placement/Apply",
        { placementId },
        { withCredentials: true }
    );
    if (res.data.success) {
        dispatch({ type: "APPLY_PLACEMENT_SUCCESS" });
        await dispatch(getPlacement());
    }
    else return dispatch({ type: "APPLY_PLACEMENT_FAIL" });
    return res.data.success;
};
