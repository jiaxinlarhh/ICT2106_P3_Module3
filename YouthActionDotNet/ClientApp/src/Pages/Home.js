import React from "react";
import { ReactNotifications, Store } from "react-notifications-component";
import MyComponent from "./NotificationComponent";

export default class Home extends React.Component {
  render() {
    return (
      <div style={{ width: "100%" }}>
        <ReactNotifications /> {/* For the popup notification */}
        <div style={{ width: "2em" }}>
          <MyComponent></MyComponent> {/* For the bellicon and all the logic */}
        </div>
        <p style={{ color: "white" }}>Home</p>
      </div>
    );
  }
}
