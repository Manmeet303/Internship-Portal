import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import { toastStyle } from "../../../config/toastify";
import TagInput from "../../../components/TagInput";
import { addPlacement, getPlacement } from "../../../actions/placementAction";
const AddPlacement = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { _id } = useSelector((state) => state.auth.user);
    // Form Fields
    const [position, setPosition] = useState("");
    const [positionType, setPositionType] = useState("Full Time");
    const [pastExperienceDuration, setPastExperienceDuration] = useState("");
    const [cgpaRequirement, setCGPARequirement] = useState("");
    const [locations, setLocations] = useState([]);
    const [expectedSalary, setExpectedSalary] = useState("");
    const [benefits, setBenefits] = useState([]);
    const [skills, setSkills] = useState([]);
    const [responsibility, setResponsibility] = useState([]);
    const [description, setDescription] = useState("");
    const [allowWFH, setAllowWFH] = useState(false);
    // Handle Form Submit
    const addHandler = async (e) => {
        e.preventDefault();
        // Dispatch Data.
        await dispatch(
            addPlacement(
                position,
                pastExperienceDuration,
                cgpaRequirement,
                locations,
                expectedSalary,
                benefits,
                skills,
                responsibility,
                positionType,
                description,
                allowWFH
            )
        );
        await dispatch(getPlacement({ companyId: _id }));
        history.push("/Company/Placement");
    };
    const { err, suc } = useSelector((state) => state.placement);
    useEffect(() => {
        if (err !== undefined) toast.error(err, toastStyle);
        if (suc !== undefined) toast.success(suc, toastStyle);
        dispatch({ type: "CLEAR_PLACEMENT_ERRSUC" });
    }, [dispatch, err, suc]);
    return (
        <div className="AddPlacement">
            {/* 
            This is Add Placement Page

            1> Show Appropriate Form.                           DONE
            2> Show Placement Card with Add and Cancel Button    X
            
         */}
            <table>
                <thead>
                    <tr id="Heading">
                        <td colSpan={2}>Add Placement</td>
                    </tr>
                    <tr id="SubHeading">
                        <td colSpan={2}>
                            Fill out all the details gven below to add a new
                            placement to your company.
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
                        <th>Past Experience</th>
                        <td>
                            <input
                                type="number"
                                name="pastExperienceDuration"
                                value={pastExperienceDuration}
                                onChange={(e) =>
                                    setPastExperienceDuration(e.target.value)
                                }
                                placeholder="Months"
                            />
                        </td>
                    </tr>

                    <tr>
                        <th>Minimun CGPA</th>
                        <td>
                            <input
                                type="number"
                                name="CGPARequirement"
                                value={cgpaRequirement}
                                onChange={(e) =>
                                    setCGPARequirement(e.target.value)
                                }
                                placeholder="CGPA"
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
                        <th>Expected Salary</th>
                        <td>
                            <input
                                type="number"
                                name="expectedSalary"
                                value={expectedSalary}
                                onChange={(e) =>
                                    setExpectedSalary(e.target.value)
                                }
                                placeholder="Expected Salary"
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
                        <th>Responsibilities</th>
                        <td>
                            <TagInput
                                tags={responsibility}
                                placeholder="Responsibilities"
                                setState={setResponsibility}
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

export default AddPlacement;
