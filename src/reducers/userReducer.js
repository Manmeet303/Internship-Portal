const userReducer = (state = {}, action) => {
    switch (action.type) {
        case "UPDATE_PASSWORD_REQUEST":
        case "UPDATE_PROFILE_REQUEST":
            return {
                ...state,
                loading: true,
            };

        case "UPDATE_PASSWORD_SUCCESS":
        case "UPDATE_PROFILE_SUCCESS":
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case "UPDATE_PASSWORD_FAIL":
        case "UPDATE_PROFILE_FAIL":
            return {
                ...state,
                loading: false,
            };
        case "UPDATE_PROFILE_RESET":
            return {
                ...state,
                isUpdated: false,
            };
        default:
            return state;
    }
};
export default userReducer;
