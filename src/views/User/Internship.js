import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastStyle } from "../../config/toastify";
import { getInternship } from "../../actions/internshipAction";
import InternshipCard from "../../components/Cards/InternshipCard";
const Internship = () => {
    const dispatch = useDispatch();
    const { internships, err, suc } = useSelector((state) => state.internship);
    // console.log(internships)
    useEffect(() => {
        dispatch(getInternship());
        if (err !== undefined) toast.error(err, toastStyle);
        if (suc !== undefined) toast.success(suc, toastStyle);
        dispatch({ type: "CLEAR_INTERNSHIP_ERRSUC" });
    }, [err, suc, dispatch]);
    return (
        <div className="UserInternship">
            {internships &&
                internships.map((ele, i) => {
                    return <InternshipCard props={ele} type={"S"} key={i} />;
                })}
        </div>
    );
};
export default Internship;
