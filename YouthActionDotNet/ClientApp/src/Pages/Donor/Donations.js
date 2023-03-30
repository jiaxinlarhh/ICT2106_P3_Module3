import React, { useRef } from "react";
import { Loading } from "../../Components/appCommon";
import { DivSpacing } from "../../Components/common";
import { StdInput } from "../../Components/input";
import { CSVLink } from "react-csv";
import DatapageLayout from "../PageLayout";
import { Bar } from "react-chartjs-2";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

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

  const myRef = useRef(null);
  const moneyMonthlyTotals = Array.from({ length: 12 }, () => 0);
  const itemMonthlyTotals = Array.from({ length: 12 }, () => 0);

  donations.forEach((donation) => {
    const month = new Date(donation.DonationDate).getMonth(); // extract month from donation date
    if (donation.DonationAmount != null) {
      moneyMonthlyTotals[month] += parseInt(donation.DonationAmount); // add donation amount to corresponding month's total
    } else {
      itemMonthlyTotals[month] += parseInt(donation.ItemQuantity);
    }
  });
  console.log(donations);

  function saveChart() {
    const link = document.createElement("a");
    link.download = "DonationsChart.jpeg";
    link.href = myRef.current.toBase64Image("image/jpeg", 1);
    link.click();
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "MoneyDonations",
        data: moneyMonthlyTotals,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
      {
        label: "ItemDonations",
        data: itemMonthlyTotals,
        fill: false,
        backgroundColor: "rgb(99, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };
  const options = {
    animation: {
      onComplete: function () {
        console.log(myRef.current.toBase64Image());
      },
    },
  };
  const plugin = {
    beforeDraw: (chartCtx) => {
      const ctx = chartCtx.canvas.getContext("2d");
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, chartCtx.width, chartCtx.height);
      ctx.restore();
    },
  };

  return (
    <div className="row">
      <Bar
        id="save"
        ref={myRef}
        data={data}
        options={options}
        plugins={[plugin]}
      />
      <div
        className="card w-56 flex flex-col items-stretch basis-1/4 gap-4"
        style={{ marginTop: "1rem", marginBottom: "1rem" }}
      >
        <button onClick={saveChart} class="btn btn-primary">
          DOWNLOAD CHART
        </button>
      </div>
    </div>
  );
};

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
            <a href="/ItemDonations" class="btn btn-primary">
              Item Donation
            </a>
          </div>
          <div>
            <DatapageLayout
              settings={this.settings}
              fieldSettings={this.state.monetarySettings.data.FieldSettings}
              headers={this.state.monetarySettings.data.ColumnSettings}
              data={this.state.monetaryContents}
              updateHandle={this.handleUpdate}
              requestRefresh={this.requestRefresh}
              error={this.state.error}
              permissions={this.props.permissions}
              requestError={this.requestError}
            />
          </div>
          <div className="p-5">
            <h3 className="text-start">Donation Analysis</h3>
            <DonationsReportInput></DonationsReportInput>
          </div>
        </>
      );
    }
  }
}
class DonationsReportInput extends React.Component {
  fields = ["projectId"];

  state = {
    loading: true,
    donations: [],
    monetary: [],
    item: [],
    dataToFetch: {
      projectId: "",
    },
  };

  componentDidMount = async () => {
    await this.getSettings().then((settings) => {
      console.log(settings);
      this.setState({
        settings: settings.data,
      });
    });
    this.setState({
      loading: false,
    });
  };

  getSettings = async () => {
    return fetch("/api/DonationsReport/Settings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      console.log(response);
      return response.json();
    });
  };

  onChange = (field, value) => {
    let dataToFetch = this.state.dataToFetch;
    dataToFetch[field] = value;
    this.setState({
      dataToFetch: dataToFetch,
    });

    this.getReportDetails()
      .then((response) => {
        if (response.success) {
          var monetaryDonation = [];
          var itemDonation = [];

          console.log("Donations?: ", this.state.donations);
          this.setState({
            donations: response.data,
            loading: false,
          });

          response.data.forEach((donation) => {
            // if (donation["DonationType"] === "Monetary") {
            //   monetaryDonation.push(donation);
            // } else if (donation["DonationType"] === "Item") {
            //   itemDonation.push(donation);
            // }
            monetaryDonation.push(donation);
          });

          this.setState({
            monetary: monetaryDonation,
            item: itemDonation,
          });
        }
      })
      .catch((error) => {
        this.setState({ error: error.message, loading: false });
        console.log("Error geting donations");
      });
  };

  getReportDetails = async () => {
    let dataToFetch = this.state.dataToFetch;

    console.log(dataToFetch);

    // Get custom report data
    const result = await fetch("/api/DonationsReport/DonationsReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToFetch),
    }).then((response) => {
      console.log(response);
      return response.json();
    });

    var donationsData = this.state.dataToFetch;

    this.setState({
      result: result,
    });

    // get donations per project
    if (donationsData.projectId != "") {
      return fetch(
        "/api/DonationsReport/GetDonationsByProjectId/" +
          donationsData.projectId,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        console.log(response);
        return response.json();
      });
    }
  };

  render = () => {
    return this.state.loading ? (
      <Loading></Loading>
    ) : (
      <>
        <div className="card w-56 flex flex-col items-stretch basis-1/4 gap-4">
          <StdInput
            field="projectId"
            fieldLabel="projectId"
            label="Project Id"
            type="dropdown"
            value={this.state.dataToFetch.projectId}
            options={this.state.settings.FieldSettings.ProjectId.options}
            allowEmpty={true}
            onChange={this.onChange}
            enabled={true}
          />
        </div>
        {this.state.result ? (
          <>
            <DonationBarChart donations={this.state.monetary} />
            <div className="card w-56 flex flex-col items-stretch basis-1/4 gap-4">
              <DonationsReport
                data={this.state.result.data}
                reportData={this.state.dataToFetch}
                FieldSettings={this.state.settings.FieldSettings}
              ></DonationsReport>
            </div>
          </>
        ) : null}
      </>
    );
  };
}

// const DonationsReport = (props) => {

//   const {data, reportData,FieldSettings} = props;

//   const projectName = FieldSettings.ProjectId.options.find((option)=>option.value == reportData.projectId)?.label;

//   let transformedData = []

//   data.forEach((item)=>{
//       let transformedItem = {...item}
//       transformedData.push(transformedItem);
//   })

//   return (
//       <CSVLink className={"btn btn-primary"} data={transformedData} filename={"DonationsReport_"+projectName}>DOWNLOAD REPORT</CSVLink>

//   )
// }

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    margin: 10,
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
  },
  value: {},
});

const DonationsReport = (props) => {
  const { data, reportData, FieldSettings } = props;
  const projectName = FieldSettings.ProjectId.options.find(
    (option) => option.value === reportData.projectId
  )?.label;
  const transformedData = [...data];

  const MyDocument = () => (
    <Document>
      <Page style={styles.section}>
        <Text style={styles.title}>Donations Report for {projectName}</Text>
        {transformedData.map((item) => (
          <Text key={item.id} style={styles.section}>
            <Text style={styles.label}>Total Donations: </Text>
            <Text style={styles.value}>{item.totalDonations}</Text>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
            <Text style={styles.label}>Project Budget: </Text>
            <Text style={styles.value}>{item.projectBudget}</Text>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
            <Text style={styles.label}>Project Remainders: </Text>
            <Text style={styles.value}>{item.projectRemainders}</Text>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
            <Text style={styles.label}>Total Items: </Text>
            <Text style={styles.value}>{item.totalItems}</Text>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
            <Text style={styles.label}>Generated Date: </Text>
            <Text style={styles.value}>{item.generatedDate}</Text>
            <Text>{"\n"}</Text>
            <Text>{"\n"}</Text>
          </Text>
        ))}
      </Page>
    </Document>
  );

  return (
    <PDFDownloadLink
      document={<MyDocument />}
      fileName={`DonationsReport_${projectName}.pdf`}
      className="btn btn-primary"
    >
      DOWNLOAD REPORT PDF
    </PDFDownloadLink>
  );
};
