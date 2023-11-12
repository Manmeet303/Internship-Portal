/**
 * Design and Handler is        DONE (by Vishal)
 * getting Data of Total Numbers of internship,job,Placement TOtal Length(Count) NOT DONE
 */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
// user Defined Components
import { getInternship } from "../../actions/internshipAction";
import { getJob } from "../../actions/jobAction";
import { getPlacement } from "../../actions/placementAction";
// css
import "../../css/Dashboard.css";

// main component
const Dashboard = () => {
    const { internships } = useSelector((state) => state.internship);
    const { jobs } = useSelector((state) => state.job);
    const { placements } = useSelector((state) => state.placement);
    const { _id } = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    //getting data from state
    useEffect(() => {
        if (internships === undefined)
            dispatch(getInternship({ companyId: _id }));
        if (jobs === undefined) dispatch(getJob({ companyId: _id }));
        if (placements === undefined)
            dispatch(getPlacement({ companyId: _id }));
    }, [dispatch, internships, jobs, placements, _id]);
    return (
        <>
            <div className="Dashboard">
                <DashSection
                    sectionName="Internship"
                    totalCount={internships?.length}
                />
                <DashSection sectionName="Job" totalCount={jobs?.length} />
                <DashSection
                    sectionName="Placement"
                    totalCount={placements?.length}
                />
            </div>
        </>
    );
};
//sub-component
const DashSection = ({ sectionName, totalCount }) => {
    //use History for page handling
    const history = useHistory();
    //Handlers
    const viewHandler = () => {
        history.push(`${sectionName}`);
    };
    const addHandler = () => {
        history.push(`${sectionName}/Add`);
    };
    return (
        <>
            <div className={`${sectionName.toLowerCase()}-div`}>
                <h3>{`${sectionName}${totalCount > 1 ? "s" : ""}`}</h3>
                <h2>{totalCount}</h2>
                <div className="dashboard-btn">
                    <button onClick={viewHandler} className="view-btn">
                        View
                    </button>
                    <button onClick={addHandler} className="add-btn">
                        Add
                    </button>
                </div>
            </div>
        </>
    );
};
export default Dashboard;
