import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import thunk from "redux-thunk";

import authReducer from "./reducers/authReducer";
import userReducer from "./reducers/userReducer";
import companyReducer from "./reducers/companyReducer";
import internshipReducer from "./reducers/internshipReducer";
import placementReducer from "./reducers/placementReducer";
import jobReducer from "./reducers/jobReducer";
import storage from "redux-persist/lib/storage";


const reducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    company: companyReducer,
    internship: internshipReducer,
    placement: placementReducer,
    job: jobReducer,
});

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const middlware = [thunk];

const store = createStore(
    persistedReducer,
    composeWithDevTools(applyMiddleware(...middlware))
);

const persistor = persistStore(store);

export default store;
export { persistor };
