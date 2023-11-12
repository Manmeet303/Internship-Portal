const jobReducer = (state = {}, action) => {
    switch (action.type) {
        case "JOB_REQUEST":
            return { ...state, loading: true };
        case "ADD_JOB_SUCCESS":
        case "UPDATE_JOB_SUCCESS":
        case "REMOVE_JOB_SUCCESS":
            return { ...state, loading: false, suc: action.data };
        case "ADD_JOB_FAIL":
        case "UPDATE_JOB_FAIL":
        case "REMOVE_JOB_FAIL":
            return { ...state, loading: false, err: action.data };
        case "APPLY_JOB_SUCCESS":
            return { ...state, loading: false, suc: "Applied Successfully" };
        case "APPLY_JOB_FAIL":
            return { ...state, loading: false, err: "Unable to Apply" };
        case "FETCH_JOB_SUCCESS":
            return { ...state, loading: false, jobs: action.data };
        case "FETCH_JOB_FAIL":
            return { ...state, loading: false, jobs: [] };
        case "CLEAR_JOB_ERRSUC":
            return { ...state, loading: false, err: undefined, suc: undefined };

        //inspect below code first(vishal)
        case "SHOW_JOB_APPLICANTS_SUCCESS":
            return { ...state, loading: false, applicants: action.data };
        case "SHOW_JOB_APPLICANTS_FAIL":
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
export default jobReducer;
