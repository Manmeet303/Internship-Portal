import { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import { logout } from "../actions/userAction";
import "../css/UserOption.css";
const UserOption = ({ type,name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = (e) => {
    e.preventDefault();
    setIsOpen(false);
    dispatch(logout()).then((result) => {
      Redirect("/login");
    });
  };
  const profileHandler = () => {
    setIsOpen(false);
    history.push(`${type === "S" ? "/User/Profile" : "/Company/Profile"}`);
  };
  return (
    <div className="userOption">
      <div className="profile-icon" onClick={handleOpen}>
        <li>{name}</li>
      </div>
      {isOpen && (
        <div className="useroption-bg">
          <div className="options">
            <div className="profile-option" onClick={profileHandler}>
              Profile
            </div>
            <div className="logout-option" onClick={logoutHandler}>
              Logout
            </div>
          </div>
          <div className="close-bg" onClick={handleClose}></div>
        </div>
      )}
    </div>
  );
};
export default UserOption;
