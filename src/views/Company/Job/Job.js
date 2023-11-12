import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastStyle } from "../../../config/toastify";
import { getJob } from "../../../actions/jobAction";
import JobCard from "../../../components/Cards/JobCard";

const Job = () => {
    const dispatch = useDispatch();
    const { jobs, err, suc } = useSelector((state) => state.job);
    const { _id } = useSelector((state) => state.auth.user);
    useEffect(() => {
        if (jobs === undefined) dispatch(getJob({ companyId: _id }));
        if (err !== undefined) toast.error(err, toastStyle);
        if (suc !== undefined) toast.success(suc, toastStyle);
        dispatch({ type: "CLEAR_JOB_ERRSUC" });
    }, [dispatch, jobs, err, suc, _id]);
    return (
        <div className="Job">
            {/* 
            This is Job HomePage for the company

            1> Fetch Jobs this company.
            2> Show Button for adding new Job.
            3> Show Job Card with Update and Delete Button
            
         */}
            <div className="HeaderCard">
                <p id="Heading">Job Dashboard</p>
            </div>
            {jobs &&
                jobs.map((ele, i) => {
                    return <JobCard props={ele} type={"C"} key={i} />;
                })}
        </div>
    );
};

export default Job;
