import React from "react";
import { Loading } from "../../Components/appCommon";
import DatapageLayout from "../PageLayout";
import { Pie, Bar, Line } from "react-chartjs-2";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { useState } from "react";
import { ReactNotifications, Store } from "react-notifications-component";
import MyComponent from "../NotificationComponent";

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.count = [0, 0, 0];
    this.state = {
      content: null,
      headers: [],
      loading: true,
      settings: {},
      error: "",
      data: {
        labels: ["Completed", "In-progress", "Not Started"],
        datasets: [
          {
            data: this.count,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          },
        ],
      },
    };

    this.settings = {
      title: "Project",
      primaryColor: "#a6192e",
      accentColor: "#94795d",
      textColor: "#ffffff",
      textColorInvert: "#606060",
      api: "/api/Project/",
    };
  }
  async reset() {
    await this.getContent().then((content) => {
      const filteredContent = content.data;

      const completeCount = filteredContent.filter(
        (item) => item.ProjectStatus === "Complete"
      ).length;
      const inProgressCount = filteredContent.filter(
        (item) => item.ProjectStatus === "In progress"
      ).length;
      const notStartedCount = filteredContent.filter(
        (item) => item.ProjectStatus === "Not Started"
      ).length;
      this.count[0] = completeCount;
      this.count[1] = inProgressCount;
      this.count[2] = notStartedCount;
      console.log(content);
      this.setState({
        content: filteredContent,
        data: {
          labels: ["Completed", "In-progress", "Not Started"],
          datasets: [
            {
              data: this.count,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        },
      });
    });

    await this.getSettings().then((settings) => {
      console.log(settings);
      this.setState({
        settings: settings,
      });
    });

    this.setState({
      loading: false,
    });
  }

  async filterName(name) {
    await this.getContent().then((content) => {
      const filteredContent = content.data.filter(
        (item) => item.ServiceCenterId === name
      );

      const completeCount = filteredContent.filter(
        (item) => item.ProjectStatus === "Complete"
      ).length;
      const inProgressCount = filteredContent.filter(
        (item) => item.ProjectStatus === "In progress"
      ).length;
      const notStartedCount = filteredContent.filter(
        (item) => item.ProjectStatus === "Not Started"
      ).length;
      this.count[0] = completeCount;
      this.count[1] = inProgressCount;
      this.count[2] = notStartedCount;
      console.log(content);

      this.setState({
        content: filteredContent,
        data: {
          labels: ["Completed", "In-progress", "Not Started"],
          datasets: [
            {
              data: this.count,
              backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
            },
          ],
        },
      });
    });

    await this.getSettings().then((settings) => {
      console.log(settings);
      this.setState({
        settings: settings,
      });
    });

    this.setState({
      loading: false,
    });
  }

  async componentDidMount() {
    await this.getContent().then((content) => {
      const completeCount = content.data.filter(
        (item) => item.ProjectStatus === "Complete"
      ).length;
      const inProgressCount = content.data.filter(
        (item) => item.ProjectStatus === "In progress"
      ).length;
      const notStartedCount = content.data.filter(
        (item) => item.ProjectStatus === "Not Started"
      ).length;
      this.count[0] = completeCount;
      this.count[1] = inProgressCount;
      this.count[2] = notStartedCount;
      console.log(content);
      this.setState({
        content: content,
      });
    });

    await this.getSettings().then((settings) => {
      console.log(settings);
      this.setState({
        settings: settings,
      });
    });

    this.setState({
      loading: false,
    });
  }

  getSettings = async () => {
    // fetches http://...:5001/api/User/Settings
    return fetch(this.settings.api + "Settings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      return res.json();
    });
  };

  getContent = async () => {
    return fetch(this.settings.api + "All", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      //Res = {success: true, message: "Success", data: Array(3)}
      return res.json();
    });
  };

  update = async (data) => {
    console.log(data);
    return fetch(this.settings.api + "UpdateAndFetch/" + data.UserId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (res) => {
      return res.json();
    });
  };

  handleUpdate = async (data) => {
    await this.update(data).then((content) => {
      if (content.success) {
        this.setState({
          error: "",
        });
        return true;
      } else {
        this.setState({
          error: content.message,
        });
        return false;
      }
    });
  };

  requestRefresh = async () => {
    this.setState({
      loading: true,
    });
    await this.getContent().then((content) => {
      console.log(content);
      this.setState({
        content: content,
        loading: false,
      });
    });
  };

  requestError = async (error) => {
    this.setState({
      error: error,
    });
  };

  render() {
    const { data, option } = this.state;

    if (this.state.loading) {
      return <Loading></Loading>;
    } else {
      return (
        <div>
          <ReactNotifications /> {/* For the popup notification */}
          <div style={{ width: "2em" }}>
            <MyComponent></MyComponent>{" "}
            {/* For the bellicon and all the logic */}
          </div>
          <Card>
            <CardBody
              style={{ display: "flex", flexDirection: "row" }}
              className="pie-chart"
            >
              <div>
                <div className="pie-chart">
                  <Pie data={data} options={option} />
                </div>
                <div>
                  <button onClick={() => this.reset()}>All</button>
                </div>
                <div>
                  <button onClick={() => this.filterName("id2")}>
                    Hougang Service Center
                  </button>
                </div>
                <div>
                  <button
                    onClick={() =>
                      this.filterName("fed1f105-7ae4-40e5-b055-9185b7d8ab9e")
                    }
                  >
                    Test Employee Center
                  </button>
                </div>
                <div>
                  <button onClick={() => this.filterName("id3")}>
                    Pasir Ris Service Center
                  </button>
                </div>
              </div>
            </CardBody>
            <DatapageLayout
              settings={this.settings}
              fieldSettings={this.state.settings.data.FieldSettings}
              headers={this.state.settings.data.ColumnSettings}
              data={this.state.content.data}
              updateHandle={this.handleUpdate}
              requestRefresh={this.requestRefresh}
              error={this.state.error}
              permissions={this.props.permissions}
              requestError={this.requestError}
            ></DatapageLayout>
          </Card>
        </div>
      );
    }
  }
}
