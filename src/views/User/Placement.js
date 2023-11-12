import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { toastStyle } from "../../config/toastify";
import { getPlacement } from "../../actions/placementAction";
import PlacementCard from "../../components/Cards/PlacementCard";
const Placement = () => {
    const dispatch = useDispatch();
    const { placements, err, suc } = useSelector((state) => state.placement);
    useEffect(() => {
        dispatch(getPlacement());
        if (err !== undefined) toast.error(err, toastStyle);
        if (suc !== undefined) toast.success(suc, toastStyle);
        dispatch({ type: "CLEAR_PLACEMENT_ERRSUC" });
    }, [err, suc, dispatch, placements]);
    return (
        <div className="UserPlacement">
            {placements &&
                placements.map((ele, i) => {
                    return <PlacementCard props={ele} type={"S"} key={i} />;
                })}
        </div>
    );
};
export default Placement;
