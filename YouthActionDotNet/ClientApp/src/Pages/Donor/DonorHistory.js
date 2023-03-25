import React from "react";
import { Loading } from "../../Components/appCommon";
import DatapageLayout from "../PageLayout";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

export default class DonorHistory extends React.Component {
  state = {
    loading: true,
    donations: [],
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
                    <span className="tableTitle">Donation History</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card>
              <CardBody>
                <h2> Monetary Donation</h2>
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
                <h2 className="pt-5">Item Donation</h2>
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
