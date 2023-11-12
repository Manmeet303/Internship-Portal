import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastStyle } from "../../../config/toastify";
import { getInternship } from "../../../actions/internshipAction";
import InternshipCard from "../../../components/Cards/InternshipCard";
// //internship css
// import "./internship.css";

const Internship = () => {
    const dispatch = useDispatch();
    const { internships, err, suc } = useSelector((state) => state.internship);
    const { _id } = useSelector((state) => state.auth.user);
    useEffect(() => {
        if (internships === undefined)
            dispatch(getInternship({ companyId: _id }));
        if (err !== undefined) toast.error(err, toastStyle);
        if (suc !== undefined) toast.success(suc, toastStyle);
        dispatch({ type: "CLEAR_INTERNSHIP_ERRSUC" });
    }, [dispatch, internships, err, suc, _id]);
    return (
        <div className="Internship">
            {/* 
            This is Internship HomePage for the company

            1> Fetch Internships this company.
            2> Show Button for adding new Internship.
            3> Show Internship Card with Update and Delete Button
            
         */}
            <div className="HeaderCard">
                <p id="Heading">Internship Dashboard</p>
            </div>
            {internships &&
                internships.map((ele, i) => {
                    return <InternshipCard props={ele} type={"C"} key={i} />;
                })}
        </div>
    );
};

export default Internship;
