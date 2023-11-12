import { Switch, Route } from "react-router";
import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "../views/Company/Dashboard";
// Company Profile
import CompanyProfile from "../views/Company/Profile/CompanyProfile";
import UpdateCompanyProfile from "../views/Company/Profile/UpdateCompanyProfile";
import UpdateCompanyPassword from "../views/Company/Profile/UpdateCompanyPassword";
// Login
import Login from "../views/Company/Auth/Login";
import Register from "../views/Company/Auth/Register";
// Internship Routes.
import AddInternship from "../views/Company/Internship/AddInternship";
import Internships from "../views/Company/Internship/Internships";
import UpdateInternship from "../views/Company/Internship/UpdateInternship";
// Placement Routes.
import Placement from "../views/Company/Placement/Placement";
import AddPlacement from "../views/Company/Placement/AddPlacement";
import UpdatePlacement from "../views/Company/Placement/UpdatePlacement";
// Job Routes.
import Job from "../views/Company/Job/Job";
import AddJob from "../views/Company/Job/AddJob";
import UpdateJob from "../views/Company/Job/UpdateJob";
import ShowApplicants from "../views/Company/ShowApplicants.js"
// Generalized CSS.
import "../css/Auth.css";
import "../css/Cards/Job.css";
import "../css/Cards/Placement.css";
import "../css/Cards/Internship.css";
import "../css/TagInput.css";

const CompanyRoute = () => {
  return (
    <Switch>
      <Route exact path="/Auth/Company/Login" component={Login} />
      <Route exact path="/Auth/Company/Register" component={Register} />
      <Route exact path="/Company/Internship/:id/Applicants" component={ShowApplicants} />
      <Route exact path="/Company/Job/:id/Applicants" component={ShowApplicants} />
      <Route exact path="/Company/Placement/:id/Applicants" component={ShowApplicants} />
      {/* set Default landing in Internship page as DashBoard */}
      <ProtectedRoute exact path="/Company/Dashboard" component={Dashboard} />
      <ProtectedRoute
        exact
        path="/Company/Profile"
        component={CompanyProfile}
      />
      <ProtectedRoute
        exact
        path="/Company/Profile/UpdateProfile"
        component={UpdateCompanyProfile}
      />
      <ProtectedRoute
        exact
        path="/Company/Profile/UpdatePassword"
        component={UpdateCompanyPassword}
      />
      <ProtectedRoute
        exact
        path="/Company/Internship"
        component={Internships}
      />
      <ProtectedRoute
        exact
        path="/Company/Internship/Add"
        component={AddInternship}
      />
      <ProtectedRoute
        exact
        path="/Company/Internship/Update/:internshipId"
        component={UpdateInternship}
      />
      {/* Placement Routes */}
      <ProtectedRoute exact path="/Company/Placement" component={Placement} />
      <ProtectedRoute
        exact
        path="/Company/Placement/Add"
        component={AddPlacement}
      />
      <ProtectedRoute
        exact
        path="/Company/Placement/Update/:placementId"
        component={UpdatePlacement}
      />
      {/* Job Routes */}
      <ProtectedRoute exact path="/Company/Job" component={Job} />
      <ProtectedRoute exact path="/Company/Job/Add" component={AddJob} />
      <ProtectedRoute
        exact
        path="/Company/Job/Update/:jobId"
        component={UpdateJob}
      />
    </Switch>
  );
};
export default CompanyRoute;
