import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router";
import { toast } from "react-toastify";
import { toastStyle } from "../../../config/toastify";
import TagInput from "../../../components/TagInput";
import {
    getInternship,
    updateInternship,
} from "../../../actions/internshipAction";
const UpdateInternship = ({ props }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { internships, err, suc } = useSelector((state) => state.internship);
    const { _id } = useSelector((state) => state.auth.user);
    const { internshipId } = useParams();
    var data = {};
    if (internships)
        data = internships.filter((internship) => {
            return internship._id === internshipId;
        })[0];
    // Form Fields
    const [position, setPosition] = useState(data?.position);
    const [positionType, setPositionType] = useState(data?.positionType);
    const [openPositions, setOpenPositions] = useState(data?.openPositions);
    const [duration, setDuration] = useState(data?.duration || []);
    const [locations, setLocations] = useState(data?.locations || []);
    const [stipend, setStipend] = useState(data?.stipend);
    const [benefits, setBenefits] = useState(data?.benefits || []);
    const [skills, setSkills] = useState(data?.skills || []);
    const [description, setDescription] = useState(data?.description);
    const [allowWFH, setAllowWFH] = useState(data?.allowWFH);
    // Handle Form Submit
    const updateHandler = async (e) => {
        e.preventDefault();
        // Dispatch Data.
        await dispatch(
            updateInternship(data?._id, {
                position,
                openPositions,
                duration,
                locations,
                stipend,
                benefits,
                skills,
                positionType,
                description,
                allowWFH,
            })
        );
        await dispatch(getInternship({ companyId: _id }));
        history.push("/Company/Internship");
    };
    useEffect(() => {
        if (err !== undefined) toast.error(err, toastStyle);
        if (suc !== undefined) toast.success(suc, toastStyle);
        dispatch({ type: "CLEAR_INTERNSHIP_ERRSUC" });
    }, [dispatch, err, suc]);

    return (
        <div className="UpdateInternship">
            {/* 
            This is Internship Update Page

            1> Show Appropriate Form.                           DONE
            2> Fill the existing details.                       DONE
            3> Show an Update and Cancel button in Bottom.      DONE
            
         */}
            <table>
                <thead>
                    <tr id="Heading">
                        <td colSpan={2}>Update Internship</td>
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
                                name="stipend"
                                value={stipend}
                                onChange={(e) => setStipend(e.target.value)}
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
                        <th>Duration</th>
                        <td>
                            <input
                                type="number"
                                name="duration"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="Duration"
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
                                value="Update"
                                onClick={updateHandler}
                            />
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default UpdateInternship;
