import React from "react";
import { useState, useEffect } from "react";
import { Loading } from "../../Components/appCommon";
import "../../styles/donorDashboard.css";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import {
  FaMoneyBillWave,
  FaTrophy,
  FaChartLine,
  FaProjectDiagram,
} from "react-icons/fa";

import Chart from "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";

const DonationBarChart = ({ donations }) => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthlyTotals = Array.from({ length: 12 }, () => 0); // initialize array with 12 zeros

  donations.forEach((donation) => {
    const month = new Date(donation.DonationDate).getMonth(); // extract month from donation date
    monthlyTotals[month] += parseInt(donation.DonationAmount); // add donation amount to corresponding month's total
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Donations",
        data: monthlyTotals,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
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
    projects: [],
    monetary: [],
    item: [],
  };

  componentDidMount = async () => {
    await this.getDonations()
      .then((response) => {
        if (response.success) {
          var monetaryDonation = [];
          var itemDonation = [];

          console.log("Donations?: ", this.state.donations);
          this.setState({
            donations: response.data,
            loading: false,
          });
          // for (val of this.state.donations) {
          //   console.log(val);

          // }

          response.data.forEach((donation) => {
            if (donation["DonationType"] === "Monetary") {
              monetaryDonation.push(donation);
            } else if (donation["DonationType"] === "Item") {
              itemDonation.push(donation);
            }
          });

          this.setState({
            monetary: monetaryDonation,
            item: itemDonation,
          });

          console.log("Monetary:", this.state.monetary);
          console.log("Item:", this.state.item);
        }
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
      });

    await this.getProjects()
      .then((response) => {
        if (response.success) {
          console.log(response);
          this.setState({
            projects: response.data,
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
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

  getProjects = async () => {
    return fetch("/api/DonorDashboard/GetProjects", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
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

          <div className="flex flex-col justify-center md:flex-row ">
            <Card className="card-style">
              <CardBody>
                <FaMoneyBillWave className="mr-2 icon-style" />
                <CardTitle className="card-title">
                  $
                  {this.state.monetary.reduce(
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
                  {/* Get highest donation */}$
                  {this.state.monetary.length > 0
                    ? Math.max.apply(
                        Math,
                        this.state.monetary.map(function (donation) {
                          return donation.DonationAmount;
                        })
                      )
                    : 0}
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
                  ${/* Get average donations if no donation display 0*/}
                  {this.state.monetary.length > 0
                    ? (
                        this.state.monetary.reduce(
                          (total, donation) =>
                            total + Number(donation.DonationAmount),
                          0
                        ) / this.state.monetary.length
                      ).toFixed(2)
                    : 0}
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
                  Donations Made
                </CardSubtitle>
              </CardBody>
            </Card>
          </div>

          <div>
            <Card>
              <CardBody>
                <h3 className="text-start">Donation Analysis</h3>
                <DonationBarChart donations={this.state.monetary} />
              </CardBody>
            </Card>
          </div>

          <div>
            <Card>
              <CardBody>
                <div className="flex flex-row justify-between pt-5">
                  <h3>Available Projects</h3>
                  <a href="/DonorAvailableProjects" className="view-all">
                    View All
                  </a>
                </div>
                {this.state.projects
                  .slice(Math.max(this.state.projects.length - 4, 0))
                  .map((project) => (
                    <div className="pt-5 pb-5">
                      <h5>{project.ProjectName}</h5>
                      <p>{project.ProjectDescription}</p>
                    </div>
                  ))}
              </CardBody>
            </Card>
          </div>

          <div>
            <Card>
              <CardBody>
                <div className="flex justify-between">
                  <h3>Donation History</h3>
                  <a href="/DonorHistory" class="view-all">
                    View All
                  </a>
                </div>

                <table className="table-responsive ">
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
                    {this.state.monetary.map((donation) => (
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
                <table className="table-responsive ">
                  <thead>
                    <tr>
                      <th>Donation Type</th>
                      <th>Item Name</th>
                      <th>Item Description</th>
                      <th>Item Quantity</th>
                      <th>Donation Date</th>
                      <th>Project Id</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.item.map((donation) => (
                      <tr key={donation.DonationsId}>
                        <td>{donation.DonationType}</td>
                        <td>{donation.ItemName}</td>
                        <td>{donation.ItemDescription}</td>
                        <td>{donation.ItemQuantity}</td>
                        <td>{donation.DonationDate}</td>
                        <td>{donation.ProjectId}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </div>
        </div>
      );
    }
  }
}
