import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    TextField,
    FormControl,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, loadUser } from "../../../actions/userAction";
import Loader from "../../../components/Loader";
//Modals
import AddAccomplishments from "../../../components/Models/AddAccomplishments";
import AddCertificates from "../../../components/Models/AddCertificates";
import AddEducation from "../../../components/Models/AddEducation";
import AddExperience from "../../../components/Models/AddExperience";
import AddLanguage from "../../../components/Models/AddLanguage";
import AddProject from "../../../components/Models/AddProject";
import AddSkill from "../../../components/Models/AddSkill";

const UpdateProfile = ({ history }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { isUpdated, loading } = useSelector((state) => state.user);

    const [fname, setFname] = useState(user?.fname);
    const [lname, setLname] = useState(user?.lname);
    const [mobile, setMobile] = useState(user?.mobile);
    // const [dob, setDob] = useState("");
    const [gender, setGender] = useState(user?.personal?.gender);
    const [address, setAddress] = useState(user?.personal?.address);
    const [dob, setDOB] = useState(user?.personal?.dob);
    const [city, setCity] = useState(user?.personal?.city);
    const [state, setState] = useState(user?.personal?.state);
    const [country, setCountry] = useState(user?.personal?.country);
    const [skills, setSkills] = useState([...user?.skills]);
    const [languages, setLanguages] = useState([...user?.languages]);
    const [experience, setExperience] = useState([...user?.experience]);
    const [education, setEducation] = useState([...user?.education]);
    const [projects, setProjects] = useState([...user?.projects]);
    const [certifications, setCertifications] = useState([
        ...user?.certifications,
    ]);
    const [accomplishments, setAccomplishments] = useState([
        ...user?.accomplishments,
    ]);

    const personal = {
        dob,
        gender,
        address,
        city,
        state,
        country,
    };

    const data = {
        fname,
        lname,
        mobile,
        personal,
        skills,
        languages,
        experience,
        education,
        projects,
        certifications,
        accomplishments,
    };

    const addSkills = (skill) => {
        setSkills((skills) => [...skills, skill]);
    };
    const addLanguage = (language) => {
        setLanguages((languages) => [...languages, language]);
    };
    const addProject = (project) => {
        setProjects((projects) => [...projects, project]);
    };
    const addCertificate = (certificate) => {
        setCertifications((certificates) => [...certificates, certificate]);
    };
    const addExperience = (experience) => {
        setExperience((experiences) => [...experiences, experience]);
    };
    const addEducations = (education) => {
        setEducation((educations) => [...educations, education]);
    };
    const addAccomplishments = (accomplishment) => {
        setAccomplishments((accomplishments) => [
            ...accomplishments,
            accomplishment,
        ]);
    };
    
    const removeSkills = (index) => {
        setSkills((skills) => skills.filter((item, pos) => pos !== index));
    };
    const removeLanguage = (index) => {
        setLanguages((languages) => languages.filter((item, pos) => pos !== index));
    };
    const removeProject = (index) => {
        setProjects((projects) => projects.filter((item, pos) => pos !== index));
    };
    const removeCertificate = (index) => {
        setCertifications((certificates) => certificates.filter((item, pos) => pos !== index));
    };
    const removeExperience = (index) => {
        setExperience((experiences) => experiences.filter((item, pos) => pos !== index));
    };
    const removeEducations = (index) => {
        setEducation((educations) => educations.filter((item, pos) => pos !== index));
    };
    const removeAccomplishments = (index) => {
        setAccomplishments((accomplishments) => accomplishments.filter((item, pos) => pos !== index) );
    };

    useEffect(() => {
        if (isUpdated) {
            dispatch(loadUser());
            history.push("/User/Profile");
        }
        dispatch({ type: "UPDATE_PROFILE_RESET" });
    }, [dispatch, history, isUpdated]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateProfile(data));
    };
    const cancelHandler = (e) => {
        e.preventDefault();
        history.push("/User/Profile");
    };
    if (loading) return <Loader />;
    else
        return (
            <div>
                <script src="https://kit.fontawesome.com/7c5eef0e2d.js"></script>
                <header>
                    <div className="Profile">
                        <div className="section-1">
                            <h1>
                                Hi, I'm {user.fname} {user.lname}
                                <br />
                                <strong>Web Developer</strong>
                            </h1>
                        </div>
                    </div>
                </header>
                <section className="container">
                    <div className="row">
                        <div className="profile-card white-card">
                            <div className="about">
                                <h3 className="accent">Basic Info</h3>
                                <h2 className="title-name">
                                    <TextField
                                        id="outlined-name"
                                        label="First name"
                                        type="text"
                                        value={fname}
                                        onChange={(e) =>
                                            setFname(e.target.value)
                                        }
                                        margin="dense"
                                        placeholder="First name"
                                        size="small"
                                        required
                                    />
                                    <TextField
                                        id="outlined-name"
                                        label="Last name"
                                        type="text"
                                        value={lname}
                                        onChange={(e) =>
                                            setLname(e.target.value)
                                        }
                                        margin="dense"
                                        placeholder="First name"
                                        size="small"
                                        required
                                    />
                                </h2>
                                <h4>
                                    <strong>Gender :</strong>
                                    <div>
                                        <FormControl component="fieldset">
                                            <RadioGroup
                                                row
                                                aria-label="gender"
                                                defaultValue={gender}
                                                name="radio-buttons-group"
                                                onChange={(e) =>
                                                    setGender(e.target.value)
                                                }
                                            >
                                                <FormControlLabel
                                                    value="Female"
                                                    control={<Radio />}
                                                    label="Female"
                                                />
                                                <FormControlLabel
                                                    value="Male"
                                                    control={<Radio />}
                                                    label="Male"
                                                />
                                                <FormControlLabel
                                                    value="Other"
                                                    control={<Radio />}
                                                    label="Other"
                                                />
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                </h4>
                                <h4>
                                    <strong>DOB :</strong> June 5, 2001
                                </h4>
                            </div>
                        </div>

                        <div className="profile-card">
                            <div className="skills">
                                <div className="title-div">
                                    <h2 className="white card-title">Skills</h2>
                                    <AddSkill addSkills={addSkills} />
                                </div>
                                {skills.map((skill, index) => (
                                    <h4>
                                        <Button onClick={() => (removeSkills(index))}><i class="fa fa-times white-plus" style={{ fontSize: 20 }}></i></Button>{skill}</h4>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container">
                    <div className="row">
                        <div className="profile-card">
                            <div className="contact">
                                <h2 className="card-title">Contact</h2>
                                <p>
                                    <i
                                        className="fa fa-map-marker"
                                        style={{ fontSize: 30 }}
                                    ></i>
                                    <TextField
                                        id="outlined-name"
                                        label="Address"
                                        type="text"
                                        value={address}
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                        margin="dense"
                                        multiline={true}
                                        placeholder="First name"
                                        size="small"
                                        required
                                    />
                                </p>
                                <p>
                                    <i
                                        className="fa fa-phone"
                                        style={{ fontSize: 30 }}
                                    ></i>
                                    <TextField
                                        id="outlined-name"
                                        label="Mobile"
                                        type="text"
                                        value={mobile}
                                        onChange={(e) =>
                                            setMobile(e.target.value)
                                        }
                                        margin="dense"
                                        multiline={true}
                                        placeholder="Mobile"
                                        size="small"
                                        required
                                    />
                                </p>
                                <p>
                                    <i
                                        className="fa fa-envelope"
                                        style={{ fontSize: 30 }}
                                    ></i>{" "}
                                    <TextField
                                        id="outlined-name"
                                        label="Email"
                                        type="text"
                                        value={user.email}
                                        margin="dense"
                                        multiline={true}
                                        disabled={true}
                                        size="small"
                                        required
                                    />
                                </p>
                            </div>
                        </div>
                        <div className="profile-card white-card">
                            <div className="languages">
                                <div className="title-div">
                                    <h2 className="card-title">Languages</h2>
                                    <AddLanguage addLanguage={addLanguage} />
                                </div>
                                <ul>
                                    {languages.map((value, index) => (
                                        <li><Button onClick={() => (removeLanguage(index))}><i class="fa fa-times black" style={{ color: "black" }}></i></Button>{value}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container">
                    <div className="row">
                        <div className="profile-card">
                            <div className="experience">
                                <div className="title-div">
                                    <h2 className="white card-title">
                                        Experiences
                                    </h2>
                                    <AddExperience
                                        addExperience={addExperience}
                                    />
                                </div>
                                {experience &&
                                    experience.map((experience, index) => (
                                        <>
                                        
                                            <div className="profile-card-content">
                                                
                                                <h4 className="card-sub-title">
                                                <Button onClick={() => (removeExperience(index))}><i class="fa fa-times white-plus" style={{ fontSize: 20 }}></i></Button>{experience.role}
                                                </h4>
                                                <h4 className="info-title">
                                                    {experience.company}
                                                </h4>
                                                <h4 className="info-title">
                                                    {experience.fromDate} -{" "}
                                                    {experience.toDate}
                                                </h4>
                                                <p className="education-description">
                                                    {experience.description}
                                                </p>
                                            </div>
                                        </>
                                    ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container">
                    <div className="row">
                        <div className="profile-card">
                            <div className="education">
                                <div className="title-div">
                                    <h2 className="card-title">Education</h2>
                                    <AddEducation
                                        addEducations={addEducations}
                                    />
                                </div>
                                {education.map((education, index) => (
                                    <>
                                        <div className="profile-card-content">
                                            <h4 className="card-sub-title">
                                            <Button onClick={() => (removeEducations(index))}><i class="fa fa-times white-plus" style={{ fontSize: 20 }}></i></Button>{education.domain}
                                            </h4>
                                            <div className="education-school">
                                                <h4 className="info-title">
                                                    {education.institute}
                                                </h4>
                                                <h4 className="info-title">
                                                    {education.fromYear} -{" "}
                                                    {education.toYear}
                                                </h4>
                                            </div>
                                            <p className="education-description">
                                                {education.description}
                                            </p>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container">
                    <div className="row">
                        <div className="profile-card">
                            <div className="education">
                                <div className="title-div">
                                    <h2 className="card-title">Projects</h2>
                                    <AddProject addProject={addProject} />
                                </div>
                                {projects.map((project, index) => (
                                    <>
                                        <div className="profile-card-content">
                                            <h4 className="card-sub-title">
                                            <Button onClick={() => (removeProject(index))}><i class="fa fa-times white-plus" style={{ fontSize: 20 }}></i></Button>{project.name}
                                            </h4>
                                            <p className="education-description">
                                                {project.description}
                                            </p>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container">
                    <div className="row">
                        <div className="profile-card">
                            <div className="education">
                                <div className="title-div">
                                    <h2 className="card-title">Certificates</h2>
                                    <AddCertificates
                                        addCertificate={addCertificate}
                                    />
                                </div>
                                {certifications.map((certificate, index) => (
                                    <>
                                        <div className="profile-card-content">
                                            <h4 className="card-sub-title">
                                            <Button onClick={() => (removeCertificate(index))}><i class="fa fa-times white-plus" style={{ fontSize: 20 }}></i></Button>{certificate.name}
                                            </h4>
                                            <div className="education-school">
                                                <h4 className="info-title">
                                                    {certificate.name}
                                                </h4>
                                                <h4 className="info-title">
                                                    {certificate.credential}
                                                </h4>
                                            </div>
                                            <p className="education-description">
                                                {certificate.description}
                                            </p>
                                        </div>
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="container">
                    <div className="row">
                        <div className="profile-card">
                            <div className="education">
                                <div className="title-div">
                                    <h2 className="card-title">
                                        Accomplishments
                                    </h2>
                                    <AddAccomplishments
                                        addAccomplishments={addAccomplishments}
                                    />
                                </div>
                                <ul className="profile-card-content">
                                    {accomplishments.map((accomplishment, index) => (
                                        <div className="accomplishments">
                                            <Button onClick={() => (removeAccomplishments(index))}><i class="fa fa-times white-plus" style={{ fontSize: 20 }}></i></Button>
                                        <li className="education-description">
                                            {accomplishment.accomplishment}
                                        </li>
                                    </div>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                {/* <Button onClick={submitHandler}>Update</Button> */}
                <div className="buttons">
                    <Link
                        to="/password/update"
                        className="password"
                        role="button"
                        onClick={submitHandler}
                    >
                        Update
                    </Link>
                    <Link
                        className="logout"
                        role="button"
                        onClick={cancelHandler}
                    >
                        Cancel
                    </Link>
                </div>
            </div>
        );
};

export default UpdateProfile;
