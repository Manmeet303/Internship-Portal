import React from "react";
import { useSelector, useDispatch } from "react-redux";
import InternshipCard from "../../components/Cards/InternshipCard";
const FilteredInternships = () => {
  const { internships } = useSelector((state) => state.internship);
  console.log(internships.length);

  return (
    <>
      {internships.length === 0 ? (
        <h1>No Internships found</h1>
      ) : (
        <div className="UserInternship">
          {internships &&
            internships.map((ele, i) => {
              return <InternshipCard props={ele} type={"S"} key={i} />;
            })}
        </div>
      )}
    </>
  );
};

export default FilteredInternships;
