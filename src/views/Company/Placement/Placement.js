import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastStyle } from "../../../config/toastify";
import { getPlacement } from "../../../actions/placementAction";
import PlacementCard from "../../../components/Cards/PlacementCard";
const Placement = () => {
    const dispatch = useDispatch();
    const { placements, err, suc } = useSelector((state) => state.placement);
    const { _id } = useSelector((state) => state.auth.user);
    useEffect(() => {
        if (placements === undefined)
            dispatch(getPlacement({ companyId: _id }));
        if (err !== undefined) toast.error(err, toastStyle);
        if (suc !== undefined) toast.success(suc, toastStyle);
        dispatch({ type: "CLEAR_PLACEMENT_ERRSUC" });
    }, [dispatch, placements, err, suc, _id]);
    return (
        <div className="Placement">
            {/* 
            This is Placement HomePage for the company

            1> Fetch Placements this company.                       DONE
            2> Show Button for adding new Placement.                DONE
            3> Show Placement Card with Update and Delete Button    DONE
            
         */}
            <div className="HeaderCard">
                <p id="Heading">Placement Dashboard</p>
            </div>
            {placements &&
                placements.map((ele, i) => {
                    return <PlacementCard props={ele} type={"C"} key={i} />;
                })}
        </div>
    );
};

export default Placement;
