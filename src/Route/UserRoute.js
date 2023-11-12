import { Switch, Route } from "react-router";
import ProtectedRoute from "./ProtectedRoute";
// Auth
import Login from "../views/User/Auth/Login";
import Register from "../views/User/Auth/Register";
// Profile
import Profile from "../views/User/Profile/Profile";
import UpdateProfile from "../views/User/Profile/UpdateProfile";
import UpdatePassword from "../views/User/Profile/UpdatePassword";
// Internship, Placement & Job.
import Internship from "../views/User/Internship";
// import SortedInternship from "../views/User/SortedInternship";
import FilteredInternships from "../views/User/FilteredInternships";
import Placement from "../views/User/Placement";
import FilteredPlacements from "../views/User/FilteredPlacements";
import Job from "../views/User/Job";
import FilteredJobs from "../views/User/FilteredJobs";
// Generalized CSS
import "../css/Auth.css";
import "../css/User/Profile.css";
import "../css/User/UpdateProfile.css";
import "../css/bootstrap/font-awesome.min.css";
import "../css/Cards/Job.css";
import "../css/Cards/Placement.css";
import "../css/Cards/Internship.css";
const UserRoute = () => {
    return (
        <Switch>
            {/* Auth Routes */}
            <Route exact path="/Login" component={Login} />
            <Route exact path="/Register" component={Register} />
            {/* User Profile Routes */}
            <ProtectedRoute exact path="/User/Profile" component={Profile} />
            <ProtectedRoute
                exact
                path="/User/Profile/UpdateProfile"
                component={UpdateProfile}
            />
            <ProtectedRoute
                exact
                path="/User/Profile/UpdatePassword"
                component={UpdatePassword}
            />
            {/* User Internship, Placement & Job Route */}
            <ProtectedRoute
                exact
                path="/User/Internship"
                component={Internship}
            />
            {/* <ProtectedRoute
                exact
                path="/User/SortedInternship"
                component={SortedInternship}
            /> */}
            <ProtectedRoute
                exact
                path="/User/Placement"
                component={Placement}
            />
            <ProtectedRoute
                exact
                path="/User/FilteredPlacements"
                component={FilteredPlacements}
            />
            <ProtectedRoute
                exact
                path="/User/FilteredInternships"
                component={FilteredInternships}
            />
            <ProtectedRoute exact path="/User/Job" component={Job} />
            <ProtectedRoute exact path="/User/FilteredJobs" component={FilteredJobs} />
        </Switch>
    );
};
export default UserRoute;
