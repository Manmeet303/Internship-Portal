const placementReducer = (state = {}, action) => {
    switch (action.type) {
        case "PLACEMENT_REQUEST":
            return { ...state, loading: true };
        case "ADD_PLACEMENT_SUCCESS":
        case "UPDATE_PLACEMENT_SUCCESS":
        case "REMOVE_PLACEMENT_SUCCESS":
            return { ...state, loading: false, suc: action.data };
        case "ADD_PLACEMENT_FAIL":
        case "UPDATE_PLACEMENT_FAIL":
        case "REMOVE_PLACEMENT_FAIL":
            return { ...state, loading: false, err: action.data };
        case "APPLY_PLACEMENT_SUCCESS":
            return { ...state, loading: false, suc: "Applied Successfully" };
        case "APPLY_PLACEMENT_FAIL":
            return { ...state, loading: false, err: "Unable to Apply" };
        case "FETCH_PLACEMENT_SUCCESS":
            return { ...state, loading: false, placements: action.data };
        case "FETCH_PLACEMENT_FAIL":
            return { ...state, loading: false, placements: [] };
        case "CLEAR_PLACEMENT_ERRSUC":
            return { ...state, loading: false, err: undefined, suc: undefined };

        //inspect below code first(vishal)
        case "SHOW_PLACEMENT_APPLICANTS_SUCCESS":
            return { ...state, loading: false, applicants: action.data };
        case "SHOW_PLACEMENT_APPLICANTS_FAIL":
            return {
                  ...state,
                  loading: false,
                  err: "Can not Get Applicants",
                  applicants: [],
                };
        default:
            return state;
    }
};
export default placementReducer;
