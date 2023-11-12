import { useSelector } from "react-redux";

import JobCard from "../../components/Cards/JobCard";
const SortedJob = () => {
    const { jobs } = useSelector((state) => state.job);

    return (
        <>
      {jobs.length === 0 ? (
        <h1>No Jobs found</h1>
      ) : (
        <div className="UserJob">
          {jobs &&
                jobs.map((ele, i) => {
                    return <JobCard props={ele} type={"S"} key={i} />;
                })}
        </div>
      )}
    </>
    );
};
export default SortedJob;
