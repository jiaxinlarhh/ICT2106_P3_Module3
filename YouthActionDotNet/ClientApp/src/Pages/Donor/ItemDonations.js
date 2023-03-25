import React from "react";
import { Loading } from "../../Components/appCommon";
import { DivSpacing } from "../../Components/common";
import DatapageLayout from "../PageLayout";

export default class Donations extends React.Component {
  state = {
    content: null,
    headers: [],
    // loading: true,
    settings: {},
    error: "",

    loading: true,

    monetaryContents: null,
    monetaryHeaders: null,
    monetarySettings: {},
    monetaryError: "",

    itemContents: null,
    itemHeaders: null,
    itemSettings: {},
    itemError: "",
  };

  settings = {
    title: "Donations",
    primaryColor: "#a6192e",
    accentColor: "#94795d",
    textColor: "#ffffff",
    textColorInvert: "#606060",
    api: "/api/Donations/",
  };

  async componentDidMount() {
    await this.getContent().then((content) => {
      //   console.log("NewContent! ", content);
      var monetaryContentsLocal = [];
      var itemContentsLocal = [];
      content.data.forEach((donation) => {
        // console.log("dontaion", donation["DonationType"]);
        if (donation["DonationType"] === "Monetary") {
          monetaryContentsLocal.push(donation);
        } else if (donation["DonationType"] === "Item") {
          itemContentsLocal.push(donation);
        }
      });
      this.setState(
        {
          content: content,
          monetaryContents: monetaryContentsLocal,
          itemContents: itemContentsLocal,
        },
        () => {
          //   console.log("monetaryContents", this.state.monetaryContents);
          //   console.log("itemContents", this.state.itemContents);
        }
      );
    });

    await this.getSettings().then((settings) => {
      // hardcode columnsettings and fieldsettings keys for now
      console.log("NewSettings!", settings);
      this.setState(
        {
          settings: settings,
          monetarySettings: {
            data: {
              ColumnSettings: {
                DonationsId: settings.data.ColumnSettings.DonationsId,
                DonationType: settings.data.ColumnSettings.DonationType,
                DonationAmount: settings.data.ColumnSettings.DonationAmount,
                DonationDate: settings.data.ColumnSettings.DonationDate,
              },
              FieldSettings: {
                DonationsId: settings.data.FieldSettings.DonationsId,
                DonationType: settings.data.FieldSettings.DonationType,
                DonationAmount: settings.data.FieldSettings.DonationAmount,
                DonationConstraint:
                  settings.data.FieldSettings.DonationConstraint,
                DonationDate: settings.data.FieldSettings.DonationDate,
                DonorId: settings.data.FieldSettings.DonorId,
                ProjectId: settings.data.FieldSettings.ProjectId,
              },
            },
          },
          itemSettings: {
            data: {
              ColumnSettings: {
                DonationsId: settings.data.ColumnSettings.DonationsId,
                DonationType: settings.data.ColumnSettings.DonationType,
                ItemName: settings.data.ColumnSettings.ItemName,
                ItemDescription: settings.data.ColumnSettings.ItemDescription,
                ItemQuantity: settings.data.ColumnSettings.ItemQuantity,
              },
              FieldSettings: {
                DonationsId: settings.data.FieldSettings.DonationsId,
                DonationType: settings.data.FieldSettings.DonationType,
                ItemName: settings.data.FieldSettings.ItemName,
                ItemDescription: settings.data.FieldSettings.ItemDescription,
                ItemQuantity: settings.data.FieldSettings.ItemQuantity,
                DonationDate: settings.data.FieldSettings.DonationDate,
                DonorId: settings.data.FieldSettings.DonorId,
                ProjectId: settings.data.FieldSettings.ProjectId,
              },
            },
          },
        },
        () => {
          // callback after setstate to see changes
          console.log("MonetarySettings!", this.state.monetarySettings);
          console.log("ItemSettings!", this.state.itemSettings);
        }
      );
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
      //   console.log(res);
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
      //   console.log(res);
      //Res = {success: true, message: "Success", data: Array(3)}
      return res.json();
    });
  };

  update = async (data) => {
    // console.log(data);
    return fetch(this.settings.api + "UpdateAndFetch/" + data.DonationsId, {
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
    console.log("handleUpdate", data);
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
      //   console.log(content);
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
    if (this.state.loading) {
      return <Loading></Loading>;
    } else {
      return (
        <>
          <div className="flex justify-end w-300 m-5">
            <a href="/Donations" class="btn btn-primary">
              Monetary Donation
            </a>
          </div>
          <DatapageLayout
            settings={this.settings}
            fieldSettings={this.state.itemSettings.data.FieldSettings}
            headers={this.state.itemSettings.data.ColumnSettings}
            data={this.state.itemContents}
            updateHandle={this.handleUpdate}
            requestRefresh={this.requestRefresh}
            error={this.state.error}
            permissions={this.props.permissions}
            requestError={this.requestError}
          />
        </>
      );
    }
  }
}
