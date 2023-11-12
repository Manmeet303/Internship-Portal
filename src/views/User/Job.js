import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastStyle } from "../../config/toastify";
import { getJob } from "../../actions/jobAction";
import JobCard from "../../components/Cards/JobCard";
const Job = () => {
    const dispatch = useDispatch();
    const { jobs, err, suc } = useSelector((state) => state.job);
    useEffect(() => {
        dispatch(getJob());
        if (err !== undefined) toast.error(err, toastStyle);
        if (suc !== undefined) toast.success(suc, toastStyle);
        dispatch({ type: "CLEAR_JOB_ERRSUC" });
    }, [err, suc, dispatch, jobs]);
    return (
        <div className="UserJob">
            {jobs &&
                jobs.map((ele, i) => {
                    return <JobCard props={ele} type={"S"} key={i} />;
                })}
        </div>
    );
};
export default Job;
