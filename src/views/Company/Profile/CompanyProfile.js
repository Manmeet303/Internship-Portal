//components

import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
// Actions
import { logout } from "../../../actions/userAction";
import Loader from "../../../components/Loader";

const CompanyProfile = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);
  // console.log(user);
  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout()).then((result) => {
      Redirect("/login");
    });
  };

  if (loading) return <Loader />;
  else
    return (
      <div className="ProfilePage">
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
                <h3 className="accent card-title">Info</h3>
                <h2 className="title-name">{user?.name}</h2>
                <p>{user?.about}</p>
                <h4>
                  <strong>Working In </strong>
                  {user?.type}
                </h4>
              </div>
            </div>
          </div>
        </section>

        <section className="container">
          <div className="row">
            <div className="profile-card">
              <div className="contact">
                <h2 className="card-title">Contact</h2>
                {user?.address && (
                  <p>
                    <i className="fa fa-map-marker"></i> {user?.address},
                    {user?.city},{user?.state}
                  </p>
                )}
                {user?.mobile && (
                  <p>
                    <i className="fa fa-phone"></i> {user?.mobile}
                  </p>
                )}
                <p>
                  <i className="fa fa-envelope"></i> {user?.email}
                </p>
              </div>
            </div>
          </div>
        </section>

        {user?.projects && user?.projects.length !== 0 && (
          <section className="container">
            <div className="row">
              <div className="profile-card">
                <div className="education">
                  <h2 className="card-title">Projects</h2>
                  {user?.projects.map((project, index) => (
                    <>
                      <div
                        className="profile-card-content"
                        key={`project${index}`}
                      >
                        <h4 className="card-sub-title">{project.name}</h4>
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
        )}

        {user?.achievements && user?.achievements.length !== 0 && (
          <section className="container">
            <div className="row">
              <div className="profile-card">
                <div className="education">
                  <h2 className="card-title">Accomplishments</h2>
                  <ul className="profile-card-content">
                    {user?.achievements.map((achievement, index) => (
                      <div
                        className="accomplishments"
                        key={`achievement${index}`}
                      >
                        <li
                          className="education-description"
                        >
                          {achievement.accomplishment}
                        </li>
                      </div>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
        <div className="buttons">
          <Link
            to="/Company/Profile/UpdateProfile"
            className="profile"
            role="button"
          >
            Update Profile
          </Link>
          <Link
            to="/Company/Profile/UpdatePassword"
            className="password"
            role="button"
          >
            Update Password
          </Link>
          <div className="logout" role="button" onClick={logoutHandler}>
            Logout
          </div>
        </div>
      </div>
    );
};

export default CompanyProfile;
