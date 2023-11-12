//import react things
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { toastStyle } from "../../../config/toastify";
//import components
import TagInput from "../../../components/TagInput";
import {
    addInternship,
    getInternship,
} from "../../../actions/internshipAction";

const AddInternship = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { _id } = useSelector((state) => state.auth.user);
    // Form Fields
    const [position, setPosition] = useState("");
    const [positionType, setPositionType] = useState("Full Time");
    const [openPositions, setOpenPositions] = useState(0);
    const [duration, setDuration] = useState(0);
    const [locations, setLocations] = useState([]);
    const [stipend, setStipend] = useState("");
    const [benefits, setBenefits] = useState([]);
    const [skills, setSkills] = useState([]);
    const [description, setDescription] = useState("");
    const [allowWFH, setAllowWFH] = useState(false);
    // Handle Form Submit
    const addHandler = async (e) => {
        e.preventDefault();
        // Dispatch Data.
        await dispatch(
            addInternship(
                position,
                openPositions,
                duration,
                locations,
                stipend,
                benefits,
                skills,
                positionType,
                description,
                allowWFH
            )
        );
        await dispatch(getInternship({ companyId: _id }));
        history.push("/Company/Internship");
    };

    const { err, suc } = useSelector((state) => state.internship);
    useEffect(() => {
        if (err !== undefined) toast.error(err, toastStyle);
        if (suc !== undefined) toast.success(suc, toastStyle);
        dispatch({ type: "CLEAR_INTERNSHIP_ERRSUC" });
    }, [dispatch, err, suc]);
    return (
        <div className="AddInternship">
            {/* 
            This is Add Internship Page

            1> Show Appropriate Form.                       DONE
            2> Show Internship Card with Add.                      DONE
            
         */}
            <table>
                <thead>
                    <tr id="Heading">
                        <td colSpan={2}>Add Internship </td>
                    </tr>
                    <tr id="SubHeading">
                        <td colSpan={2}>
                            Fill out all the details gven below to add a new
                            Internship vacancy to your company.
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>Position </th>
                        <td>
                            <input
                                type="text"
                                name="position"
                                value={position}
                                onChange={(e) => setPosition(e.target.value)}
                                placeholder="Position"
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Duration</th>
                        <td>
                            <input
                                type="number"
                                name="duration"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="Months"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Locations</th>
                        <td>
                            <TagInput
                                tags={locations}
                                setState={setLocations}
                                placeholder="Locations"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Stipend</th>
                        <td>
                            <input
                                type="number"
                                name="stipend"
                                value={stipend}
                                onChange={(e) => setStipend(e.target.value)}
                                placeholder="Stipend"
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Benefits</th>
                        <td>
                            <TagInput
                                tags={benefits}
                                setState={setBenefits}
                                placeholder="Benefits"
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Required skills</th>
                        <td>
                            <TagInput
                                tags={skills}
                                placeholder="Required Skills"
                                setState={setSkills}
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Open Positions</th>
                        <td>
                            <input
                                type="number"
                                name="openPositions"
                                value={openPositions}
                                onChange={(e) =>
                                    setOpenPositions(e.target.value)
                                }
                                placeholder="Open Positions"
                            />
                        </td>
                    </tr>
                    <tr>
                        <th>Position Type</th>
                        <td>
                            <select
                                value={positionType}
                                onChange={(e) =>
                                    setPositionType(e.target.value)
                                }
                            >
                                <option value={"Full Time"}>Full Time</option>
                                <option value={"Part Time"}>Part Time</option>
                                <option value={"Freelance"}>Freelance</option>
                            </select>
                        </td>
                    </tr>

                    <tr>
                        <th>Description</th>
                        <td>
                            <textarea
                                rows={5}
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Add something about the Placement"
                            />
                        </td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={2}>
                            <input
                                type="checkbox"
                                name="allow_wfh"
                                onChange={(e) => setAllowWFH(!allowWFH)}
                            />
                            <label>Work From Home</label>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2} id="submit">
                            <input
                                type="button"
                                value="Add"
                                onClick={addHandler}
                            />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default AddInternship;
