const companyReducer = (state = {}, action) => {
    switch (action.type) {
        case "COMPANY_LIST_FETCH_REQUEST":
            return {
                ...state,
                loading: true,
            };
        case "COMPANY_LIST_FETCH_SUCCESS":
            return {
                ...state,
                loading: false,
                company: action.payload?.data,
            };
        case "COMPANY_LIST_FETCH_FAIL":
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};
export default companyReducer;
