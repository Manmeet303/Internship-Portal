import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
//import user defined components
import {
  getInternship,
  removeInternship,
  applyInternship,
  withdrawApplication,
} from "../../actions/internshipAction";
import { toastStyle } from "../../config/toastify";

const InternshipCard = ({ props, type }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  //get workType for withdraw internships , job , placements
  const workType = history.location.pathname.split("/")[2];
  const userId = useSelector((state) => state.auth?.user?._id);
  const [isApplied, setIsApplied] = useState(
    props?.applicants.includes(userId) ? true : false
  );
  const internshipId = props._id;
  // console.log(useSelector((state) => state.internship?.internships[6]));
  //action handlers
  const showApplicantsHandler = () => {
    if (props?.applicants.length < 1) {
      toast.info(
        "There is no current applicants please wait for response",
        toastStyle
      );
    } else history.push(`/Company/Internship/${props._id}/Applicants`);
  };
  const updateHandler = (e) => {
    e.preventDefault();
    history.push("/Company/Internship/Update/" + props._id);
  };
  const removeHandler = async (e) => {
    e.preventDefault();
    await dispatch(removeInternship(props._id));
    dispatch(getInternship({ companyId: props.companyId }));
  };
  const applyHandler = async (e) => {
    e.preventDefault();
    if (!isApplied) {
      const checkApplied = await dispatch(applyInternship(props._id));
      setIsApplied(checkApplied);
    }
    else if (props?.applicants.includes(userId)) {
      //dispatch event for withdraw
      const isWithdraw = await dispatch(
        withdrawApplication({ id:internshipId, workType })
      );
      toast.success(
        "Application Withdraw Success",
        toastStyle
      );
      setIsApplied(!isWithdraw);
      //model for comfirm the withdraw
      // if  withdraw success then and dispatch internships
    }
  };
  //main
  return (
    <div className="InternshipCard">
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
            <th colSpan={1}>Open Positions</th>
            <td colSpan={1}>{props?.openPositions}</td>
            <th colSpan={1}>Required Skills</th>
            <td colSpan={1}>{props?.skills && props?.skills.join(", ")}</td>
          </tr>
          <tr>
            <th colSpan={1}>Locations</th>
            <td colSpan={1}>
              {props?.locations && props?.locations.join(", ")}
            </td>
            <th colSpan={1}>Duration</th>
            <td colSpan={1}>{props?.duration}</td>
          </tr>
          <tr>
            <th colSpan={1}>Description</th>
            <td colSpan={3}>{props?.description}</td>
          </tr>
          <tr>
            <th colSpan={1}>Benefits</th>
            <td colSpan={1}>{props?.benefits && props?.benefits.join(", ")}</td>
            <th colSpan={1}>Stipend</th>
            <td colSpan={1}>&#8377; {props?.stipend}</td>
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
                                    <input
                                        type="button"
                                        value="Applied"
                                        className="primary"
                                    />
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
export default InternshipCard;
/*

        <div className="internship-card">
          <div className="title">
            <h3>
              {`${props.position[0].toUpperCase() + props.position.slice(1)}`}
            </h3>
          </div>
        </div>
*/