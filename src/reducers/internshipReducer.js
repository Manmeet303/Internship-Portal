const internshipReducer = (state = {}, action) => {
  switch (action.type) {
    case "INTERNSHIP_REQUEST":
      return { ...state, loading: true };
    case "ADD_INTERNSHIP_SUCCESS":
    case "UPDATE_INTERNSHIP_SUCCESS":
    case "REMOVE_INTERNSHIP_SUCCESS":
      return { ...state, loading: false, suc: action.data };
    case "ADD_INTERNSHIP_FAIL":
    case "UPDATE_INTERNSHIP_FAIL":
    case "REMOVE_INTERNSHIP_FAIL":
      return { ...state, loading: false, err: action.data };
    case "FETCH_INTERNSHIP_SUCCESS":
      // console.log("Internship Fetch Success");
      // console.log(action.data)
      return { ...state, loading: false, internships: action.data };
    case "FETCH_INTERNSHIP_FAIL":
      return { ...state, loading: false, internships: [] };
    case "APPLY_INTERNSHIP_SUCCESS":
      return { ...state, loading: false, suc: "Applied Successfully" };
    case "APPLY_INTERNSHIP_FAIL":
      return { ...state, loading: false, err: "Unable to Apply" };
    case "CLEAR_INTERNSHIP_ERRSUC":
      return { ...state, loading: false, err: undefined, suc: undefined };

    case "SHOW_INTERNSHIP_APPLICANTS_SUCCESS":
      return { ...state, loading: false, applicants: action.data };
    case "SHOW_INTERNSHIP_APPLICANTS_FAIL":
      return {
        ...state,
        loading: false,
        err: "Can not Get Applicants",
        applicants: [],
      };
    case "APPLICANTS_APPROVED_SUCCESS":
      return { ...state, loading: false};
    case "APPLICANTS_APPROVED_FAIL":
      return {
        ...state,
        loading: false,
        err: "Can not Approved",
      };
    case "APPLICANTS_REJECT_SUCCESS":
      return { ...state, loading: false };
    case "APPLICANTS_REJECT_FAIL":
      return {
        ...state,
        loading: false,
        err: "Can not Reject",
      };
    default:
      return state;
  }
};
export default internshipReducer;
