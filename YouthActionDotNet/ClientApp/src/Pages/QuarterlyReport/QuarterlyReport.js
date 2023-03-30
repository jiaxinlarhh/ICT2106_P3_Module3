import React from "react";
import { Loading } from "../../Components/appCommon";
import DatapageLayout from "../PageLayout";
import { Box } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react";
import { Select } from "@chakra-ui/react";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import html2pdf from "html2pdf.js";
import DatapageLayoutEmpty from "../PageLayoutEmpty";
import { useState } from "react";
import { Collapse } from "@chakra-ui/react";

function MyComponent() {
  const [showContent, setShowContent] = useState(false);

  const handleButtonClick = () => {
    setShowContent(!showContent);
  };

  return (
    <div>
      <Button
        onClick={handleButtonClick}
        style={{ width: "100%", marginTop: "20px", marginBottom: "30px" }}
      >
        Generate Graph
      </Button>
      <Collapse in={showContent}>
        <div>
          {/* Content to be hidden or shown */}
          <SimpleGrid columns={4} spacing={10}>
            <Box height="300px">
              <Pie data={data} options={options} width={300} height={300} />
            </Box>
            <Box height="300px"></Box>
            <Box height="300px">
              <Bar data={data33} options={options33} width={300} height={300} />
            </Box>
            <Box height="300px"></Box>

            <Button
              style={{
                backgroundColor: "#1c2c5b",
                color: "white",
                width: "100%",
              }}
              onClick={downloadPDF}
            >
              Download Report
            </Button>
          </SimpleGrid>
        </div>
      </Collapse>
    </div>
  );
}

// for the pie chart
const data = {
  labels: ["Time", "Space", "Donor", "Money", "Volunteer"],
  datasets: [
    {
      data: [8, 3, 2, 2, 10],
      backgroundColor: ["#ED5564", "#FFCE54", "#A0D568", "#4FC1E8", "#AC92EB"],
      hoverBackgroundColor: [
        "#ED5564",
        "#FFCE54",
        "#A0D568",
        "#4FC1E8",
        "#AC92EB",
      ],
    },
  ],
};
// for legend
const options = {
  responsive: false,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: "Total Request Form",
    },
    legend: {
      position: "left",
    },
  },
};

// bar graph
const data33 = {
  labels: ["SC1", "SC2", "SC3", "SC4", "SC5", "SC6", "SC7", "SC8"],
  datasets: [
    {
      label: "Total Projects in Service Center (SC)",
      data: [8, 3, 2, 2, 10, 5, 7, 6],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(255, 159, 64, 0.2)",
        "rgba(255, 205, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(201, 203, 207, 0.2)",
        "rgba(204, 153, 102, 0.5)",
      ],
      borderColor: [
        "rgb(255, 99, 132)",
        "rgb(255, 159, 64)",
        "rgb(255, 205, 86)",
        "rgb(75, 192, 192)",
        "rgb(54, 162, 235)",
        "rgb(153, 102, 255)",
        "rgb(201, 203, 207)",
        "rgba(101, 67, 33, 1.0)",
      ],
      borderWidth: 1,
    },
  ],
};

const options33 = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

// download pdf
function downloadPDF() {
  const element = document.getElementById("report-container");
  html2pdf().from(element).save("quarterly-report.pdf");
}

export default class QuarterlyReport extends React.Component {
  state = {
    content: null,
    headers: [],
    loading: true,
    settings: {},
    error: "",
  };

  settings = {
    title: "Quarterly Report",
    primaryColor: "#a6192e",
    accentColor: "#94795d",
    textColor: "#ffffff",
    textColorInvert: "#606060",
    api: "/api/Request/",
  };

  async componentDidMount() {
    await this.getContent().then((content) => {
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
    return fetch(this.settings.api + "UpdateAndFetch/" + data.RequestId, {
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
    var updateData = data;
    var fileUploadFields = [];
    const fieldSettings = this.state.settings.data.FieldSettings;
    for (const field of Object.keys(fieldSettings)) {
      if (fieldSettings[field].type === "file") {
        fileUploadFields.push(field);
      }
    }
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
    return (
      <ChakraProvider>
        <div
          id="report-container"
          style={{
            marginTop: "40px",
            marginBottom: "150px",
            marginLeft: "50px",
            marginRight: "50px",
            width: "90%",
          }}
        >
          <DatapageLayoutEmpty
            settings={this.settings}
            //fieldSettings={this.state.settings.data.FieldSettings}
            requestRefresh={this.requestRefresh}
            error={this.state.error}
            permissions={this.props.permissions}
            handleSearchCallBack={this.searchCallBack}
          >
            <Heading
              as="h3"
              size="lg"
              style={{ marginTop: "0px", marginBottom: "40px" }}
            >
            </Heading>
            Service Center
            <br />
            <br />
            <Select placeholder="- Select a Service Center -" size="sm">
              <option value="option1">1</option>
              <option value="option2">2</option>
              <option value="option3">3</option>
              <option value="option4">4</option>
              <option value="option5">5</option>
              <option value="option6">6</option>
              <option value="option7">7</option>
              <option value="option8">8</option>
            </Select>
            <br />
            <br />
            Quarter
            <br />
            <br />
            <Select placeholder="- Select a Quarter -" size="sm">
              <option value="Q1">Q1</option>
              <option value="Q2">Q2</option>
              <option value="Q3">Q3</option>
              <option value="Q4">Q4</option>
            </Select>
            <br />
            <br />
            Year
            <br />
            <br />
            <Select placeholder="- Select a Year -" size="sm">
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
            </Select>
            <br />
            <br />
            <div className="App">
              <MyComponent />
            </div>
          </DatapageLayoutEmpty>
        </div>
      </ChakraProvider>
    );
  }
}
