import React from "react";
import { Loading } from "../../Components/appCommon";
import DatapageLayout from "../PageLayout";
import "../../styles/donorDashboard.css";
import { Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import {
  FaMoneyBillWave,
  FaTrophy,
  FaChartLine,
  FaProjectDiagram,
} from "react-icons/fa";

import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";

const TestBarChart = () => {
  const labels = ["January", "February", "March", "April", "May", "June"];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
  };

  return (
    <div className="row">
      <Bar data={data} />
    </div>
  );
};

export default class DonorDashboard extends React.Component {
  state = {
    loading: true,
    donations: [],
  };

  componentDidMount = async () => {
    await this.getDonations()
      .then((response) => {
        if (response.success) {
          console.log(response);
          this.setState({
            donations: response.data,
            loading: false,
          });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });
  };

  getDonations = async () => {
    var loggedInVol = this.props.user.data;
    console.log(loggedInVol.UserId);
    return fetch("/api/DonorDashboard/GetByDonorId/" + loggedInVol.UserId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.json();
    });
  };

  render() {
    if (this.state.loading) {
      return <Loading></Loading>;
    } else {
      return (
        <div className="col-md-12">
          <div className="row">
            <div className="tableHeader p-4">
              <div className="tableHeaderActions ">
                <div className="d-flex justify-content-start align-items-center">
                  <div className="tableTitleContainer">
                    <div
                      className="tableTitlePulseAnimation-1"
                      style={
                        this.state.searchBarExtended
                          ? { "--ScaleMultiplier": 0.75 }
                          : { "--ScaleMultiplier": 2 }
                      }
                    ></div>
                    <div
                      className="tableTitlePulseAnimation-2"
                      style={
                        this.state.searchBarExtended
                          ? { "--ScaleMultiplier": 0.75 }
                          : { "--ScaleMultiplier": 2 }
                      }
                    ></div>
                    <div
                      className="tableTitlePulseAnimation-3"
                      style={
                        this.state.searchBarExtended
                          ? { "--ScaleMultiplier": 0.75 }
                          : { "--ScaleMultiplier": 2 }
                      }
                    ></div>
                    <span className="tableTitle">Donor Dashboard</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card-group mt-3">
            <Card className="card-style">
              <CardBody>
                <FaMoneyBillWave className="mr-2 icon-style" />
                <CardTitle className="card-title">
                  $
                  {this.state.donations.reduce(
                    (total, donation) =>
                      total + Number(donation.DonationAmount),
                    0
                  )}
                </CardTitle>
                <CardSubtitle className="card-subtitle">
                  Total Donations
                </CardSubtitle>
              </CardBody>
            </Card>
            <Card className="card-style">
              <CardBody>
                <FaTrophy className="mr-2 icon-style" />
                <CardTitle className="card-title">
                  {/* Get highest donation */}$ ???
                </CardTitle>
                <CardSubtitle className="card-subtitle">
                  Highest Donation
                </CardSubtitle>
              </CardBody>
            </Card>
            <Card className="card-style">
              <CardBody>
                <FaChartLine className="mr-2 icon-style" />
                <CardTitle className="card-title">
                  ${/* Get average donations */}
                  {this.state.donations.reduce(
                    (total, donation) =>
                      total + Number(donation.DonationAmount),
                    0
                  ) / this.state.donations.length}
                </CardTitle>
                <CardSubtitle className="card-subtitle">
                  Average Donation
                </CardSubtitle>
              </CardBody>
            </Card>
            <Card className="card-style">
              <CardBody>
                <FaProjectDiagram className="mr-2 icon-style" />
                <CardTitle className="card-title">
                  # {this.state.donations.length}
                </CardTitle>
                <CardSubtitle className="card-subtitle">
                  Number of Donations Made
                </CardSubtitle>
              </CardBody>
            </Card>
          </div>

          <div className="row justify-content-center p-3">
            <div className="col-md-7 mt-4">
              <Card>
                <CardBody>
                  <h3 className="text-start p-5">Donation Analysis</h3>
                  <TestBarChart />
                </CardBody>
              </Card>
            </div>

            <div className="col-md-5 mt-4">
              <Card className="p-5">
                <CardBody>
                  <div className="d-flex justify-content-between mb-5">
                    <h3>Available Projects</h3>
                    <a href="/DonorAvailableProjects" className="view-all">
                      View All
                    </a>
                  </div>
                  {/*project name and project description and button (center align) align */}
                  <div className="d-flex justify-content-between mb-5">
                    <div className="d-flex flex-column">
                      <h5>Project 1</h5>
                      <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                    </div>
                    <a href="/DonorProjectDetails" className="btn view-details">
                      View
                    </a>
                  </div>

                  <div className="d-flex justify-content-between mb-5">
                    <div className="d-flex flex-column">
                      <h5>Project 1</h5>
                      <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                    </div>
                    <a href="/DonorProjectDetails" className="btn view-details">
                      View
                    </a>
                  </div>

                  <div className="d-flex justify-content-between mb-5">
                    <div className="d-flex flex-column">
                      <h5>Project 1</h5>
                      <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat.
                      </p>
                    </div>
                    <a href="/DonorProjectDetails" className="btn view-details">
                      View
                    </a>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-12 p-4">
              <div className="card p-5">
                <div className="d-flex justify-content-between">
                  <h3>Donation History</h3>
                  <a href="/DonorHistory" class="view-all">
                    View All
                  </a>
                </div>
                <div className="card-body">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Donation Type</th>
                        <th>Donation Amount</th>
                        <th>Donation Constraint</th>
                        <th>Donation Date</th>
                        <th>Project Id</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.donations.map((donation) => (
                        <tr key={donation.DonationsId}>
                          <td>{donation.DonationType}</td>
                          <td>{donation.DonationAmount}</td>
                          <td>{donation.DonationConstraint}</td>
                          <td>{donation.DonationDate}</td>
                          <td>{donation.ProjectId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
