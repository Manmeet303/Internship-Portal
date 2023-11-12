import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
    approveApplicant,
    rejectApplicant,
    showApplicants,
} from "../../actions/companyAction";
import { toastStyle } from "../../config/toastify";
import "../../css/ShowApplicants.css";

const ShowApplicants = () => {
    //getting id from url
    //here id can be jobID,internshipId,placementId
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    //type contain data like "internship" ,"job" ,"placement"
    const type = history.location.pathname.split("/")[2];
    // console.log("type", type);

    //taking out applicants according to type
    var applicants;
    const state = useSelector((state) => state);

    if (type.toLowerCase() === "job") {
        applicants = state.job?.applicants;
    } else if (type.toLowerCase() === "internship") {
        applicants = state.internship?.applicants;
    } else if (type.toLowerCase() === "placement") {
        applicants = state.placement?.applicants;
    }
    // console.log("applicants", applicants);

    //getting data from state
    useEffect(() => {
        dispatch(showApplicants({ id, type }));
    }, [dispatch, id, type]);

    //Action handler
    const acceptHandler = async (event, { applicantId, applicant }) => {
        event.preventDefault();
        const msg = await dispatch(
            approveApplicant({ id, applicantId, applicant, type })
        );
        dispatch(showApplicants({ id, type }));
        if (msg) toast.info(msg, toastStyle);
    };

    const rejectHandler = async (event, { applicantId, applicant }) => {
        event.preventDefault();
        const msg = await dispatch(
            rejectApplicant({ id, applicantId, applicant, type })
        );
        dispatch(showApplicants({ id, type }));
        if (msg) toast.info(msg, toastStyle);
    };

    //if there is no applicant show or toast
    if (applicants?.length < 1) {
        return (
            <>
                <div className="applicants-wrapper">
                    <div className="applicants-heading">
                        <h2>Applicants For {type}</h2>
                    </div>
                    <div className="applicants-content">
                        Please Wait for new Responses ...
                    </div>
                </div>
            </>
        );
    }
    return (
        <>
            <div className="applicants-wrapper">
                <div className="applicants-heading">
                    <h2>Applicants For {type}</h2>
                </div>
                <div className="applicants-content">
                    {applicants?.length &&
                        applicants.map((applicant, i) => (
                            <div
                                className="applicant-details"
                                key={"applicant" + i}
                            >
                                <div className="applicant-name">
                                    <h5>Name</h5>
                                    <span>{`${applicant?.fname} ${applicant?.lname}`}</span>
                                </div>
                                <div className="applicant-email">
                                    <h5>Email</h5>
                                    <span>{`${applicant?.email}`}</span>
                                </div>
                                <div className="applicant-btn">
                                    <input
                                        type="button"
                                        value="Accept"
                                        className="accept-btn"
                                        onClick={(event) =>
                                            acceptHandler(event, {
                                                applicantId: applicant._id,
                                                applicant,
                                            })
                                        }
                                    />
                                    <input
                                        type="button"
                                        value="Reject"
                                        className="reject-btn"
                                        onClick={(event) =>
                                            rejectHandler(event, {
                                                applicantId: applicant._id,
                                                applicant,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default ShowApplicants;
