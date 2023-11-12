import { useSelector, useDispatch } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { logout } from "../../../actions/userAction";
import Loader from "../../../components/Loader";
const Profile = () => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.auth);
    console.log(user);
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
                            <h1>
                                Hi, I'm {user?.fname} {user?.lname}
                            </h1>
                            <h1>
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
                                    {user?.fname} {user?.lname}
                                </h2>
                                <h4>
                                    <strong>Gender :</strong>{" "}
                                    {user?.personal?.gender}
                                </h4>
                                <h4>
                                    <strong>DOB :</strong> June 5, 2001
                                </h4>
                            </div>
                        </div>
                        {user?.skills && user?.skills.length !== 0 && (
                            <>
                                <div className="profile-card">
                                    <div className="skills">
                                        <h2 className="white card-title">
                                            Skills
                                        </h2>
                                        {user?.skills.map((skill) => (
                                            <h4>{skill}</h4>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </section>

                <section className="container">
                    <div className="row">
                        <div className="profile-card">
                            <div className="contact">
                                <h2 className="card-title">Contact</h2>
                                <p>
                                    <i className="fa fa-map-marker"></i>{" "}
                                    {user?.personal?.address}
                                </p>
                                <p>
                                    <i className="fa fa-phone"></i>{" "}
                                    {user?.mobile}
                                </p>
                                <p>
                                    <i className="fa fa-envelope"></i>{" "}
                                    {user?.email}
                                </p>
                            </div>
                        </div>
                        {user?.languages && user?.languages.length !== 0 && (
                            <>
                                <div className="profile-card white-card">
                                    <div className="languages">
                                        <h2 className="card-title">
                                            Languages
                                        </h2>
                                        <ul>
                                            {user?.languages.map((value) => (
                                                <li>{value}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </section>
                {user?.experiences && (
                    <section className="container">
                        <div className="row">
                            <div className="profile-card">
                                <div className="experience">
                                    <h2 className="card-title">Experiences</h2>
                                    {user?.experiences.map((experience) => (
                                        <>
                                            <div className="profile-card-content">
                                                <h4 className="card-sub-title">
                                                    {experience.role}
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
                )}
                {user?.education && user?.education.length !== 0 && (
                    <section className="container">
                        <div className="row">
                            <div className="profile-card">
                                <div className="education">
                                    <h2 className="card-title">Education</h2>
                                    {user?.education.map((education) => (
                                        <>
                                            <div className="profile-card-content">
                                                <h4 className="card-sub-title">
                                                    {education.domain}
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
                )}
                {user?.projects && user?.projects.length !== 0 && (
                    <section className="container">
                        <div className="row">
                            <div className="profile-card">
                                <div className="education">
                                    <h2 className="card-title">Projects</h2>
                                    {user?.projects.map((project) => (
                                        <>
                                            <div className="profile-card-content">
                                                <h4 className="card-sub-title">
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
                )}
                {user?.certifications && user?.certifications.length !== 0 && (
                    <section className="container">
                        <div className="row">
                            <div className="profile-card">
                                <div className="education">
                                    <h2 className="card-title">Certificates</h2>
                                    {user?.certifications.map((certificate) => (
                                        <>
                                            <div className="profile-card-content">
                                                <h4 className="card-sub-title">
                                                    {certificate.name}
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
                )}
                {user?.accomplishments && user?.accomplishments.length !== 0 && (
                    <section className="container">
                        <div className="row">
                            <div className="profile-card">
                                <div className="education">
                                    <h2 className="card-title">
                                        Accomplishments
                                    </h2>
                                    <ul className="profile-card-content">
                                        {user?.accomplishments.map(
                                            (accomplishment) => (
                                                <li className="education-description">
                                                    {
                                                        accomplishment.accomplishment
                                                    }
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                <div className="buttons">
                    <Link
                        to="/User/Profile/UpdateProfile"
                        className="profile"
                        role="button"
                    >
                        Update Profile
                    </Link>
                    <Link
                        to="/User/Profile/UpdatePassword"
                        className="password"
                        role="button"
                    >
                        Update Password
                    </Link>
                    <Link
                        className="logout"
                        role="button"
                        onClick={logoutHandler}
                    >
                        Logout
                    </Link>
                </div>
            </div>
        );
};

export default Profile;
