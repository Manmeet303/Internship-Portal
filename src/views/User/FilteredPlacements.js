import { useSelector } from "react-redux";

import PlacementCard from "../../components/Cards/PlacementCard";
const SortedPlacement = () => {
  const { placements } = useSelector((state) => state.placement);
  return (
    <>
      {placements.length === 0 ? (
        <h1>No Placements found</h1>
      ) : (
        <div className="UserPlacement">
          {placements &&
            placements.map((ele, i) => {
              return <PlacementCard props={ele} type={"S"} key={i} />;
            })}
        </div>
      )}
    </>
  );
};
export default SortedPlacement;
