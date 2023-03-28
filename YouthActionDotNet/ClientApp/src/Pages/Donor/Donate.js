import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "../../Components/appCommon";
import { useNavigate } from "react-router-dom";

class Donate extends React.Component {
  state = {
    id: this.props.params.id,
    loading: true,
    donationType: "Monetary",
    donationAmount: 0.0,
    donationConstraint: "",
    itemName: "",
    itemDescription: "",
    itemQuantity: 0,
    project: [],
  };

  componentDidMount = async () => {
    await this.getProject()
      .then((response) => {
        if (response.success) {
          this.setState({ project: response.data, loading: false });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({ error: error.message, loading: false });
      });
  };

  getProject = async () => {
    return fetch("/api/Project/" + this.state.id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.json();
    });
  };

  navigateBack = () => {
    return this.props.nav;
  };

  getTodaysDate = () => {
    const todaysDate = new Date();
    // if less than 10, add 0 at the front of number
    const date =
      todaysDate.getDate() < 10
        ? `0${todaysDate.getDate()}`
        : `${todaysDate.getDate()}`;
    // month+1 because January is 0 and December is 11
    const month =
      todaysDate.getMonth() + 1 < 10
        ? `0${todaysDate.getMonth() + 1}`
        : `${todaysDate.getMonth() + 1}`;
    const year = `${todaysDate.getFullYear()}`;
    const hours =
      todaysDate.getHours() < 10
        ? `0${todaysDate.getHours()}`
        : `${todaysDate.getHours()}`;
    const minutes =
      todaysDate.getMinutes() < 10
        ? `0${todaysDate.getMinutes()}`
        : `${todaysDate.getMinutes()}`;
    const time = `${hours}:${minutes}`;
    return `${year}-${month}-${date}T${time}`;
  };

  handleDonateNow = async (e) => {
    e.preventDefault(); // so that page doesnt refresh on submit

    var toSubmit = {};
    if (this.state.donationType == "Monetary") {
      toSubmit = {
        DonationType: this.state.donationType,
        DonationDate: this.getTodaysDate(),
        DonorId: this.props.user.data.UserId,
        ProjectId: this.state.id,
        // for Monetary Donations
        DonationAmount: parseFloat(this.state.donationAmount).toFixed(2),
        DonationConstraint: this.state.donationConstraint,
        PaymentMethod: "online", // hard code its online by default
        //pass a extra field to indicate its a currency type
        CurrencyType: "JPY",
      };
    } else if (this.state.donationType == "Item") {
      toSubmit = {
        DonationType: this.state.donationType,
        DonationDate: this.getTodaysDate(),
        DonorId: this.props.user.data.UserId,
        ProjectId: this.state.id,
        // for Item donation
        ItemName: this.state.itemName,
        ItemDescription: this.state.itemDescription,
        ItemQuantity: this.state.itemQuantity,
      };
    }

    console.log("toSubmit", toSubmit);
    // /api/Donations/
    return fetch("/api/Donations/" + "Create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(toSubmit),
    })
      .then((res) => {
        this.props.nav(-1); // navigate back to previous page
        // return res.json();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  donateMoney = () => {
    return (
      <>
        <div class=" mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold  mb-1 ">
              Donation Amount
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              type="number"
              step="0.1"
              value={this.state.donationAmount}
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              onChange={(e) =>
                this.setState({ donationAmount: e.target.value })
              }
            />
          </div>
        </div>
      </>
    );
  };

  donateItem = () => {
    return (
      <>
        <div class=" mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold  mb-1 ">
              Item Name
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              type="text"
              value={this.state.itemName}
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              onChange={(e) => this.setState({ itemName: e.target.value })}
            />
          </div>
        </div>

        <div class=" mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold  mb-1 ">
              Item Description
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              type="text"
              value={this.state.itemDescription}
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              onChange={(e) =>
                this.setState({ itemDescription: e.target.value })
              }
            />
          </div>
        </div>

        <div class=" mb-6">
          <div class="md:w-1/3">
            <label class="block text-gray-500 font-bold  mb-1 ">
              Item Quantity
            </label>
          </div>
          <div class="md:w-2/3">
            <input
              type="number"
              value={this.state.itemQuantity}
              class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
              onChange={(e) => this.setState({ itemQuantity: e.target.value })}
            />
          </div>
        </div>
      </>
    );
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
                        window.innerWidth < 768
                          ? { "--ScaleMultiplier": 0.75 }
                          : { "--ScaleMultiplier": 2 }
                      }
                    ></div>
                    <div
                      className="tableTitlePulseAnimation-2"
                      style={
                        window.innerWidth < 768
                          ? { "--ScaleMultiplier": 0.75 }
                          : { "--ScaleMultiplier": 2 }
                      }
                    ></div>
                    <div
                      className="tableTitlePulseAnimation-3"
                      style={
                        window.innerWidth < 768
                          ? { "--ScaleMultiplier": 0.75 }
                          : { "--ScaleMultiplier": 2 }
                      }
                    ></div>
                    <span className="tableTitle">Donate Now</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form class="">
            <div className="flex flex-col justify-center item-center m-5">
              <div class="mb-6">
                <div class="md:w-1/3">
                  <label class="block text-gray-500 font-bold mb-1">
                    Donation Type
                  </label>
                </div>
                <div class="md:w-2/3">
                  <select
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    onChange={(e) => {
                      this.setState({ donationType: e.target.value });
                    }}
                  >
                    <option>Monetary</option>
                    <option>Item</option>
                  </select>
                </div>
              </div>

              <div class=" mb-6">
                <div class="md:w-1/3">
                  <label class="block text-gray-500 font-bold  mb-1">
                    Selected Project
                  </label>
                </div>
                <div class="md:w-2/3">
                  <div class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                    {this.state.project.ProjectName}
                  </div>
                </div>
              </div>

              <div class=" mb-6">
                <div class="md:w-1/3">
                  <label class="block text-gray-500 font-bold  mb-1 ">
                    Project Description
                  </label>
                </div>
                <div class="md:w-2/3">
                  <div class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500">
                    {this.state.project.ProjectDescription}
                  </div>
                </div>
              </div>

              {(() => {
                if (this.state.donationType == "Monetary") {
                  return this.donateMoney();
                } else if (this.state.donationType == "Item") {
                  return this.donateItem();
                }
              })()}

              <div class=" mb-6">
                <div class="md:w-1/3">
                  <label class="block text-gray-500 font-bold  mb-1 ">
                    Project Constraints
                  </label>
                </div>
                <div class="md:w-2/3">
                  <input
                    type="text"
                    value={this.state.donationConstraint}
                    class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    onChange={(e) =>
                      this.setState({ donationConstraint: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary ml-5"
              onClick={this.handleDonateNow}
            >
              Donate Now
            </button>
          </form>
        </div>
      );
    }
  }
}

export default (props) => {
  const navigation = useNavigate();
  return <Donate {...props} params={useParams()} nav={navigation} />;
};
