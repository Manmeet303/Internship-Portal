import { useHistory } from "react-router";
import "../css/Grid.css";
const Grid = ({ children, heading, needNewBtn }) => {
    const history = useHistory();
    const addBtnHandler = () => {
        history.push(`${history.location.pathname}/Add`);
    };

    return (
        <div className="grid-wrapper">
            <div className="grid-head">
                <h1>{heading}</h1>
                {needNewBtn && (
                    <button onClick={addBtnHandler} className="add-icon">
                        +
                    </button>
                )}
            </div>
            <div className="content">{children}</div>
        </div>
    );
};

export default Grid;
