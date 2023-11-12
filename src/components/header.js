
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Name } from "../config/Strings";
import NoficationModel from "./NoficationModel";
import UserOption from "./UserOption";
/**
 * design UI  DONE
 * take length of notifications and 
 * is there is no then no show span part 
 * on click make modal active and 
 * on close modal, refersh length of notification 
 * if user delete any notification then decrease notifications 
 */
const Header = () => {
  const { isAuthenticated, user, type } = useSelector((state) => state.auth);

  return (
    
    <div className="Header">
      <div className="content">
        <div className="logo">
          <h2>
            <Link to="/">{Name}</Link>
          </h2>
        </div>
        <div className="navigation">
          <ul>
            {/* General Links */}
            {/*{!type && (
                            <div>
                                <li>
                                    <Link to="/AboutUs">About Us</Link>
                                </li>
                                <li>
                                    <Link to="/ContactUs">Contact Us</Link>
                                </li>
                            </div>
                        )}*/}
            {/* Company Side Links */}
            {type && type === "C" && (
              <div>
                <li>
                  <Link to="/Company/Dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/Company/Internship">Internships</Link>
                </li>
                <li>
                  <Link to="/Company/Job">Jobs</Link>
                </li>
                <li>
                  <Link to="/Company/Placement">Placements</Link>
                </li>
              </div>
            )}
            {/* User Side Links */}
            {type && type === "S" && (
              <div>
                <li>
                  <Link to="/User/Internship">Internships</Link>
                </li>
                <li>
                  <Link to="/User/Job">Jobs</Link>
                </li>
                <li>
                  <Link to="/User/Placement">Placements</Link>
                </li>
                <NoficationModel/>
              </div>
            )}
            {/* Auth Links */}
            {!isAuthenticated && (
              <div>
                <li>
                  <Link to="/Login">Login</Link>
                </li>
                <li>
                  <Link to="/Register">Register</Link>
                </li>
              </div>
            )}
            {isAuthenticated && (
              <UserOption
                type={type}
                name={type === "S" ? user.fname : user.name}
              />
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
