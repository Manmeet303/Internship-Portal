import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, TextareaAutosize, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import Loader from "../../../components/Loader";
//Modals
import AddCompanyAccomplishments from "./AddCompanyAccomplishments";
import AddCompanyProjects from "./AddCompanyProjects";
import {
  loadCompany,
  updateCompanyProfile,
} from "../../../actions/companyAction";

const UpdateCompanyProfile = ({ history }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { isUpdated, loading } = useSelector((state) => state.user);
  // console.log("user:", user);

  const [name, setname] = useState(user?.name);
  const [about, setabout] = useState(user.about);

  const [address, setAddress] = useState(user?.address);
  const [city, setCity] = useState(user?.city);
  const [state, setState] = useState(user?.state);
  const [country, setCountry] = useState(user?.country);
  const [projects, setProjects] = useState(
    user?.projects === undefined ? [] : [...user?.projects]
  );
  const [accomplishments, setAccomplishments] = useState(
    user?.achievements === undefined ? [] : [...user?.achievements]
  );

  const data = {
    name,
    about,
    address,
    city,
    state,
    country,
    projects,
    achievements: accomplishments,
  };

  //handlers
  const addProject = (project) => {
    setProjects((projects) => [...projects, project]);
  };

  const addAccomplishments = (accomplishment) => {
    setAccomplishments((accomplishments) => [
      ...accomplishments,
      accomplishment,
    ]);
  };

  const removeProject = (index) => {
    setProjects((projects) => projects.filter((item, pos) => pos !== index));
  };

  const removeAccomplishments = (index) => {
    setAccomplishments((accomplishments) =>
      accomplishments.filter((item, pos) => pos !== index)
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateCompanyProfile(data));
  };
  const cancelHandler = (e) => {
    e.preventDefault();
    history.push("/Company/Profile");
  };

  useEffect(() => {
    if (isUpdated) {
      dispatch(loadCompany());
      // console.log("new user loaded");
      history.push("/Company/Profile");
      // alert("User updated Successfully");
    }
    dispatch({ type: "UPDATE_PROFILE_RESET" });
  }, [dispatch, history, isUpdated]);

  if (loading) return <Loader />;
  else
    return (
      <div>
        <script src="https://kit.fontawesome.com/7c5eef0e2d.js"></script>
        <header>
          <div className="Profile">
            <div className="section-1">
              <h1>{user?.name}</h1>
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
                    label="Company Name"
                    type="text"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    margin="dense"
                    placeholder="Company Name"
                    size="small"
                    required
                  />
                </h2>
                <h2 className="title-about">
                  <TextareaAutosize
                    minRows={3}
                    aria-label="maximum height"
                    placeholder="About Company"
                    value={about}
                    onChange={(e) => setabout(e.target.value)}
                    style={{ width: 200 }}
                    required
                  />
                </h2>
              </div>
            </div>
          </div>
        </section>
        {/* contact-section */}
        <section className="container">
          <div className="row">
            <div className="profile-card">
              <div className="contact">
                <h2>Contact</h2>
                <div className="location-section">
                  <i className="fa fa-map-marker" style={{ fontSize: 30 }}></i>
                  <TextField
                    id="outlined-name"
                    label="Address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    margin="dense"
                    multiline={true}
                    placeholder="Address"
                    size="small"
                    required
                  />
                  <TextField
                    id="outlined-name"
                    label="City"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    margin="dense"
                    multiline={true}
                    placeholder="City"
                    size="small"
                    required
                  />
                  <TextField
                    id="outlined-name"
                    label="State"
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    margin="dense"
                    multiline={true}
                    placeholder="State"
                    size="small"
                    required
                  />
                  <TextField
                    id="outlined-name"
                    label="Country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    margin="dense"
                    multiline={true}
                    placeholder="Country"
                    size="small"
                    required
                  />
                </div>
                <div>
                  <i className="fa fa-envelope" style={{ fontSize: 30 }}></i>{" "}
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
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container">
          <div className="row">
            <div className="profile-card">
              <div className="education">
                <div className="title-div">
                  <h2 className="">Projects</h2>
                  <AddCompanyProjects addProject={addProject} />
                </div>
                {projects?.map((project, idx) => (
                  <>
                    <div className="profile-card-content" key={`project${idx}`}>
                      <h4 className="card-sub-title">
                        <Button onClick={() => removeProject(idx)}>
                          <i
                            className="fa fa-times white-plus"
                            style={{ fontSize: 20 }}
                          ></i>
                        </Button>
                        {project.name}
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
                  <h2>Accomplishments</h2>
                  <AddCompanyAccomplishments
                    addAccomplishments={addAccomplishments}
                  />
                </div>
                <ul className="profile-card-content">
                  {accomplishments?.map((accomplishment, idx) => (
                    <div className="accomplishments" key={`achievement${idx}`}>
                      <Button onClick={() => removeAccomplishments(idx)}>
                        <i
                          className="fa fa-times white-plus"
                          style={{ fontSize: 20 }}
                        ></i>
                      </Button>
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
          <div className="logout" role="button" onClick={cancelHandler}>
            Cancel
          </div>
        </div>
      </div>
    );
};

export default UpdateCompanyProfile;
