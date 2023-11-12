const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case "REGISTER_USER_REQUEST":
        case "LOGIN_USER_REQUEST":
        case "LOAD_USER_REQUEST":
            return {
                loading: true,
                isAuthenticated: false,
            };
        case "LOGIN_SUCCESS":
        case "REGISTER_USER_SUCCESS":
        case "LOAD_USER_SUCCESS":
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                error: undefined,
                user: action.payload.user,
                type: action.payload.type,
            };
        case "LOGOUT_SUCCESS":
            return {
                loading: false,
                error: undefined,
                isAuthenticated: false,
                user: null,
                internships:undefined,
                jobs:undefined,
                placements:undefined,
            };
        case "LOGIN_FAIL":
        case "REGISTER_USER_FAIL":
        case "LOAD_USER_FAIL":
            console.log(action.payload);
            return {
                loading: false,
                user: null,
                isAuthenticated: false,
                error: action.payload,
            };
        case "LOGOUT_FAIL":
            return {
                ...state,
                error: action.payload,
            };
        case "CLEAR_ERRORS":
            return {
                ...state, 
                error: null
            }
        default:
            return state;
    }
};
export default authReducer;
