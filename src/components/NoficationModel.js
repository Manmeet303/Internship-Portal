import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"; // bell icon using MUI
import "../css/notification.css";
function NoficationModel() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  let user = useSelector((state) => state.auth.user);
  const [notifications, setNotifications] = useState(
    user.notifications.reverse()
  );
  function removeNotification(datetime) {
    let filterNotification = notifications.filter(
      (notification) => notification.datetime !== datetime
    );
    setNotifications(filterNotification);
  }

  //   const profileHandler = () => {
  //     setIsOpen(false);
  //     // history.push(`${type === "S" ? "/User/Profile" : "/Company/Profile"}`);
  //   };
  return (
    <div id="notification-section">
      <li className="header-bell-icon" onClick={handleOpen}>
        <span className="notification-number">{notifications?.length}</span>
        <NotificationsNoneOutlinedIcon fontSize="small" />
      </li>
      {isOpen && (
        <div className="notification-container">
          <div className="notification-bg">
            <div className="notifications">
              {notifications &&
                (notifications.length > 0
                  ? notifications.map((notification) => (
                      <div className={`notification ${notification.type} n-{notification.datetime}` }>
                        <div className="notification-data">
                          <p>{notification.msg}</p>
                          <span>{ new Date(notification.datetime).toDateString()}</span>
                        </div>
                        <div
                          className="cross"
                          onClick={() =>
                            removeNotification(notification.datetime)
                          }
                        >
                          <i class="fa fa-close"/>
                        </div>
                      </div>
                    ))
                  : "there is no notification")}
            </div>
          </div>
          <div className="close-bg" onClick={handleClose}></div>
        </div>
      )}
    </div>
  );
}

export default NoficationModel;
