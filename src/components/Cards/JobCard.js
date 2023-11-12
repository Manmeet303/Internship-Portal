import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getJob, removeJob, applyJob } from "../../actions/jobAction";
import { Link } from "react-router-dom";
import { toastStyle } from "../../config/toastify";
import { toast } from "react-toastify";
import { useState } from "react";
import { withdrawApplication } from "../../actions/internshipAction";
const JobCard = ({ props, type }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userId = useSelector((state) => state.auth.user._id);
  //get workType for withdraw internships , job , placements
  const workType = history.location.pathname.split("/")[2];
  const [isApplied, setIsApplied] = useState(
    props?.applicants.includes(userId) ? true : false
  );
  const jobId = props._id;
// console.log(useSelector((state)=>state.job.jobs[1].applicants))
  //action Handler
  const showApplicantsHandler = () => {
    if (props?.applicants.length < 1) {
      toast.info(
        "There is no current applicants please wait for response",
        toastStyle
      );
    } else history.push(`/Company/Job/${props._id}/Applicants`);
  };
  const updateHandler = (e) => {
    e.preventDefault();
    history.push("/Company/Job/Update/" + props._id);
  };
  const removeHandler = async (e) => {
    e.preventDefault();
    await dispatch(removeJob(props._id));
    dispatch(getJob({ companyId: props.companyId }));
  };
  const applyHandler = async (e) => {
    e.preventDefault();
    if (!isApplied) {
      const checkApplied = await dispatch(applyJob(props._id));
      setIsApplied(checkApplied);
    } else if (props?.applicants.includes(userId)) {
      //dispatch event for withdraw
      const isWithdraw = await dispatch(
        withdrawApplication({ id: jobId, workType })
      );
      toast.success("Application Withdraw Success", toastStyle);
      setIsApplied(!isWithdraw);
      //model for comfirm the withdraw
      // if  withdraw success then and dispatch internships
    }
  };
  return (
    <div className="JobCard">
      <table>
        <thead>
          <tr>
            <th colSpan={4} id="title">
              {props?.position}
            </th>
          </tr>
          <tr>
            <td colSpan={4}>{props?.name || props?.companyId}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th colSpan={1}>Required Experience</th>
            <td colSpan={1}>{props?.pastExperienceDuration}</td>
            <th colSpan={1}>Required Skills</th>
            <td colSpan={1}>{props?.skills && props?.skills.join(", ")}</td>
          </tr>
          <tr>
            <th colSpan={1}>Responsibility</th>
            <td colSpan={1}>
              {props?.responsibility && props?.responsibility.join(", ")}
            </td>
            <th colSpan={1}>Description</th>
            <td colSpan={1}>{props?.description}</td>
          </tr>
          <tr>
            <th colSpan={1}>Locations</th>
            <td colSpan={3}>
              {props?.locations && props?.locations.join(", ")}
            </td>
          </tr>
          <tr>
            <th colSpan={1}>Benefits</th>
            <td colSpan={1}>{props?.benefits && props?.benefits.join(", ")}</td>
            <th colSpan={1}>Avg. Salary</th>
            <td colSpan={1}>&#8377; {props?.expectedSalary}</td>
          </tr>
          <tr>
            <th colSpan={1}>Work From Home</th>
            <td colSpan={1}>{props?.allowWFH ? "Allowed" : "Not Allowed"}</td>
            <th colSpan={1}>Position Type</th>
            <td colSpan={1}>{props?.positionType}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            {type === "S" && (
              <td colSpan={4}>
                {
                  <input
                    type="button"
                    value={isApplied ? "Applied" : "Quick Apply"}
                    className={isApplied ? "primary" : "success"}
                    onClick={applyHandler}
                  />
                }
                {/* {props?.applicants.includes(userId) && (
                  <input type="button" value="Applied" className="primary" />
                )} */}
                <Link to={"/Company/Info/" + props._id}>
                  <input
                    type="button"
                    value="About Company"
                    className="primary"
                  />
                </Link>
                <input
                  type="button"
                  value={
                    props?.applicants &&
                    props?.applicants.length + " Applicants"
                  }
                  className="primary"
                />
              </td>
            )}
            {type === "C" && (
              <td colSpan={4}>
                <input
                  type="button"
                  value={
                    "Show Applicants " +
                    (props?.applicants && "(" + props?.applicants.length + ")")
                  }
                  className="primary"
                  onClick={showApplicantsHandler}
                />

                <input
                  type="button"
                  value="Update"
                  className="success"
                  onClick={updateHandler}
                />
                <input
                  type="button"
                  value="Remove"
                  className="error"
                  nodevalue={props._id}
                  onClick={removeHandler}
                />
              </td>
            )}
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default JobCard;
