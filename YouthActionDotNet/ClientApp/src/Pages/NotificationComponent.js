import React, { useState, useRef } from "react";
import { Store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { MdNotificationsNone } from "react-icons/md";
import { FaCommentDollar } from "react-icons/fa";
import {
  TbCircle0,
  TbCircle1,
  TbCircle2,
  TbCircle3,
  TbCircle4,
  TbCircle5,
  TbCircle6,
  TbCircle7,
  TbCircle8,
  TbCircle9,
} from "react-icons/tb";

const MyComponent = () => {
  const [notifications, setNotifications] = useState([]);
  const [counter, setCounter] = useState(0); // Used for the notification badge counter

  const handleNotificationClick = (id) => {
    const updatedNotifications = notifications.map((notification) => {
      if (notification.id === id) {
        return { ...notification, status: "read" };
      }
      return notification;
    });
    setNotifications(updatedNotifications);
  };

  const handleNotificationDismiss = (id) => {
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== id
    );
    setNotifications(updatedNotifications);
  };

  const addNotification = (title, message) => {
    const id = Date.now();
    const newNotification = {
      id,
      title,
      message,
      status: "unread",
    };
    setNotifications([...notifications, newNotification]);
    Store.addNotification({
      title,
      message,
      type: "default",
      container: "top-right",
      dismiss: {
        duration: 5000,
        onScreen: true,
        pauseOnHover: true,
        showIcon: true,
        click: true,
        touch: true,
      },
      // onRemoval: () => {
      //   handleNotificationDismiss(id);
      // },
    });
  };

  const countItemsinList = () => {
    for (let i = 0; i < notifications.length; i++) {
      console.log(notifications[i]);
    }
  };

  const getNumberOfNoti = () => {
    switch (counter) {
      case 1:
        return (
          <TbCircle1
            style={{
              backgroundColor: "white",
              border: "inset 0px",
              borderRadius: "5em",
              width: "1.25em",
              left: "-0.2em",
              position: "absolute",
              top: "-0.1em",
            }}
          />
        );
        break;
      case 2:
        return (
          <TbCircle2
            style={{
              backgroundColor: "white",
              border: "inset 0px",
              borderRadius: "5em",
              width: "1.25em",
              left: "-0.2em",
              position: "absolute",
              top: "-0.1em",
            }}
          />
        );
        break;
      case 3:
        return (
          <TbCircle3
            style={{
              backgroundColor: "white",
              border: "inset 0px",
              borderRadius: "5em",
              width: "1.25em",
              left: "-0.2em",
              position: "absolute",
              top: "-0.1em",
            }}
          />
        );
        break;
      case 4:
        return (
          <TbCircle4
            style={{
              backgroundColor: "white",
              border: "inset 0px",
              borderRadius: "5em",
              width: "1.25em",
              left: "-0.2em",
              position: "absolute",
              top: "-0.1em",
            }}
          />
        );
        break;
      case 5:
        return (
          <TbCircle5
            style={{
              backgroundColor: "white",
              border: "inset 0px",
              borderRadius: "5em",
              width: "1.25em",
              left: "-0.2em",
              position: "absolute",
              top: "-0.1em",
            }}
          />
        );
        break;
      case 6:
        return (
          <TbCircle6
            style={{
              backgroundColor: "white",
              border: "inset 0px",
              borderRadius: "5em",
              width: "1.25em",
              left: "-0.2em",
              position: "absolute",
              top: "-0.1em",
            }}
          />
        );
        break;
      case 7:
        return (
          <TbCircle7
            style={{
              backgroundColor: "white",
              border: "inset 0px",
              borderRadius: "5em",
              width: "1.25em",
              left: "-0.2em",
              position: "absolute",
              top: "-0.1em",
            }}
          />
        );
        break;
      case 8:
        return (
          <TbCircle8
            style={{
              backgroundColor: "white",
              border: "inset 0px",
              borderRadius: "5em",
              width: "1.25em",
              left: "-0.2em",
              position: "absolute",
              top: "-0.1em",
            }}
          />
        );
        break;
      case 9:
        return (
          <TbCircle9
            style={{
              backgroundColor: "white",
              border: "inset 0px",
              borderRadius: "5em",
              width: "1.25em",
              left: "-0.2em",
              position: "absolute",
              top: "-0.1em",
            }}
          />
        );
        break;
      default:
        return (
          <TbCircle0
            style={{
              backgroundColor: "white",
              border: "inset 0px",
              borderRadius: "5em",
              width: "1.25em",
              left: "-0.2em",
              position: "absolute",
              top: "-0.1em",
            }}
          />
        );
    }
  };

  const inputRef = useRef(null);
  const handleKeyPress = (event) => {
    // Definitions
    const v = sessionStorage.getItem("VolunteerCount");
    const d = sessionStorage.getItem("DonorCount");
    const e = sessionStorage.getItem("EmployeeCount");
    var t = { v: v, d: d, e: e };
    const threshold = 5;
    const vm = threshold - v; // For message
    const dm = threshold - d; // For message
    const em = threshold - e; // For message
    var totalNoti = sum(t);

    console.log("You have handled a key press!");
    if (event.key === "z") {
      console.log("Notifications cleared");

      notifications.forEach((noti) => {
        if (noti.status === "unread") {
          noti.status = "read";
        }
      });
      setCounter(0);
    }

    if (event.key === "[") {
      addNotification(
        "Employee Shortage",
        "There is a shortage of " + em + " employees."
      );
      Store.removeAllNotifications();
      setCounter(counter + 1);
    }
    if (event.key === "]") {
      addNotification(
        "Donor Shortage",
        "There is a shortage of " + dm + " donors."
      );
      Store.removeAllNotifications();
      setCounter(counter + 1);
    }
    if (event.key === "\\") {
      addNotification(
        "Volunteer Shortage",
        "There is a shortage of " + vm + " volunteers."
      );
      Store.removeAllNotifications();
      setCounter(counter + 1);
    }
    if (event.key === "|") {
      notificationSetCount();
    }
  };

  function sum(obj) {
    var sum = 0;
    for (var el in obj) {
      if (obj.hasOwnProperty(el)) {
        sum += parseFloat(obj[el]);
      }
    }
    return sum;
  }

  const notificationSetCount = () => {
    // Definitions
    const v = sessionStorage.getItem("VolunteerCount");
    const d = sessionStorage.getItem("DonorCount");
    const e = sessionStorage.getItem("EmployeeCount");
    var t = { v: v, d: d, e: e };
    const threshold = 5;
    const vm = threshold - v; // For message
    const dm = threshold - d; // For message
    const em = threshold - e; // For message
    var totalNoti = sum(t);
    console.log(
      v,
      " volunteer | ",
      d,
      " donor |",
      e,
      " employee = ",
      totalNoti
    );

    // Return #of notifications
    if (vm > 0) {
      addNotification(
        "Volunteer Shortage",
        "There is a shortage of " + vm + " volunteers."
      );
      setCounter(counter + 1);
    }
    if (dm > 0) {
      addNotification(
        "Donor Shortage",
        "There is a shortage of " + dm + " donors."
      );
      setCounter(counter + 1);
    }
    if (em > 0) {
      addNotification(
        "Employee Shortage",
        "There is a shortage of " + em + " employees."
      );
      setCounter(counter + 1);
    }
  };

  const displayAll = () => {
    document.getElementById("myDiv").focus();

    notifications.forEach((notification) => {
      if (notification.status !== "read") {
        Store.addNotification({
          title: notification.title,
          message: notification.message,
          type: "default",
          container: "top-right",
          dismiss: {
            duration: 5000,
            onScreen: true,
            pauseOnHover: true,
            showIcon: true,
            click: false,
            touch: true,
          },
          onRemoval: () => {
            handleNotificationClick(notification.id);
            setCounter(counter - 1);
            // handleNotificationDismiss(notification.id);
          },

          // onClick: () => {
          //   handleNotificationClick(notification.id);
          // },
        });
      }
    });
  };

  return (
    <div
      id="myDiv"
      tabIndex={0}
      onKeyDown={handleKeyPress}
      style={{
        width: "26vw",
        height: "8em",
        position: "absolute",
        zIndex: 15,
        backgroundColor: "transparent",
        top: "0em",
        right: "23em",
      }}
    >
      <button onClick={() => displayAll()}>
        <MdNotificationsNone
          style={{
            width: "1.7em",
            height: "2em",
            color: "grey",
            position: "fixed",
            zIndex: "100",
            right: "20em",
            top: "1.2em",
          }}
        />
        <span
          style={{
            width: "1.7em",
            height: "2em",
            color: "black",
            position: "fixed",
            zIndex: "100",
            right: "20em",
            top: "1.2em",
          }}
        >
          {/* {counter} */}
          {getNumberOfNoti()}
        </span>
      </button>

      {/* <button
        onClick={() => {
          addNotification("Title 5", "Message 5");
          setCounter(counter + 1);
        }}
        style={{ marginTop: "1em", fontSize: "2em" }}
      >
        <h1>Noti5</h1>
      </button> */}

      {/* This Unordered list is for debugging hehehe */}
      <ul style={{ width: "100vw", color: "transparent" }}>
        {notifications.map(
          (notification) => (
            countItemsinList(),
            (
              <li key={notification.id}>
                <span
                  style={{
                    fontWeight:
                      notification.status === "read" ? "normal" : "bold",
                  }}
                >
                  {/* {notification.message} {" -> status ->"} {notification.status} */}
                </span>
              </li>
            )
          )
        )}
      </ul>
    </div>
  );
};

export default MyComponent;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router";
// import { MdNotificationsNone } from "react-icons/md";

// import { ReactNotifications, Store } from "react-notifications-component";
// import "react-notifications-component/dist/theme.css";
// import "animate.css";

// export default class NotificationsComponent extends React.Component {
//   render() {
//     return (
//       <div>
//         <button
//           onClick={() =>
//             usemyComponent.addNotification("New notification message")
//           }
//         >
//           Add Notification
//         </button>
//         <ul>
//           {usemyComponent.notifications.map((notification) => (
//             <li key={notification.id}>
//               <span
//                 style={{
//                   fontWeight:
//                     notification.status === "read" ? "normal" : "bold",
//                 }}
//               >
//                 {notification.message}
//               </span>
//             </li>
//           ))}
//         </ul>
//       </div>
//       // <button
//       //   onClick={() => {
//       //     console.log("UWU");
//       //     Store.addNotification({
//       //       title: "Dropbox",
//       //       message: "Files were synced",
//       //       type: "warning", // 'default', 'success', 'info', 'warning', 'danger'
//       //       insert: "top",
//       //       container: "top-center", // where to position the notifications 'top-left|right|center', 'center', 'bottom-left|right|center'
//       //       animationIn: ["animate__animated", "animate__bounceIn"], // animate.css classes that's applied
//       //       animationOut: ["animate__animated", "animate__zoomOut"], // animate.css classes that's applied
//       //       dismissable: { click: true },
//       //       dismiss: {
//       //         duration: 10000,
//       //         onScreen: true,
//       //         pauseOnHover: true,
//       //       },
//       //     });
//       //   }}
//       // >
//       //   <MdNotificationsNone
//       //     style={{
//       //       width: "1.7em",
//       //       height: "2em",
//       //       color: "grey",
//       //       position: "fixed",
//       //       zIndex: "100",
//       //       right: "20em",
//       //       top: "1.2em",
//       //     }}
//       //   />
//       // </button>
//     );
//   }
// }
