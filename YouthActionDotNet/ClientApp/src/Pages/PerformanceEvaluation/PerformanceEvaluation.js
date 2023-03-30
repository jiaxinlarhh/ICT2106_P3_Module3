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
import { Link } from "react-router-dom";
import { useState } from "react";
import { Collapse } from "@chakra-ui/react";
import DatapageLayoutEmpty from "../PageLayoutEmpty";

export default class PerformanceEvaluation extends React.Component {
  // manually added the table
  state = {
    content: null,
    headers: [],
    loading: true,
    settings: {},
    error: "",
    columnSettings: {
      Id: { displayHeader: "Id" },
      Password: { displayHeader: "Password" },
    },
    data: [{ id: "1", Password: "password" }],
    fieldSettings: {
      id: {
        type: "text",
        displayLabel: "Id",
        editable: "false",
        primaryKey: "false",
        tooltip: "null",
      },
      id: {
        type: "text",
        displayLabel: "Password",
        editable: "false",
        primaryKey: "false",
        tooltip: "null",
      },
    },
  };

  settings = {
    title: "Performance Evaluation Form",
    primaryColor: "#a6192e",
    accentColor: "#94795d",
    textColor: "#ffffff",
    textColorInvert: "#606060",
    api: "/api/Feedback/",
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
    return fetch(this.settings.api + "UpdateAndFetch/" + data.FeedbackId, {
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
    return (
      <ChakraProvider>
        <div style={{ marginTop: "40px", marginBottom: "30px", width: "90%" }}>
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
              style={{ marginTop: "10px", marginBottom: "20px" }}
            >
              
            </Heading>

            <SimpleGrid columns={2} spacing={20}>
              <Box height="500px">
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
                <br />
                Performance
                <br />
                <br />
                <Select placeholder="- Select a Performance Level -" size="sm">
                  <option value="option1">Excellent</option>
                  <option value="option2">Good</option>
                  <option value="option3">Fair</option>
                  <option value="option4">Poor</option>
                  <option value="option5">Bad</option>
                </Select>
                <br />
                <br />
                <br />
                Areas Done Well:
                <br />
                <br />
                <Textarea placeholder="Enter here . . ." />
                <br />
                <br />
                <br />
                Areas of Improve:
                <br />
                <br />
                <Textarea placeholder="Enter here . . ." />
              </Box>
              <Box height="500px">
                <div
                  style={{
                    backgroundColor: "white",
                    border: "1px solid grey",
                    padding: "20px",
                  }}
                >
                  <Heading
                    as="h6"
                    size="md"
                    style={{ marginTop: "10px", marginBottom: "20px" }}
                  >
                    Status
                  </Heading>
                  Expenses (Out): <u>$3000</u>
                  <br />
                  <br />
                  Donation (In): <u>$500</u>
                  <br />
                  <br />
                  Man Hour: <u>30h</u>
                  <br />
                  <br />
                  Progress: 40% - 45%
                </div>

                <br />
                <br />
                <br />
                <br />
                <Link to="/ViewFeedback">
                  <Button
                    style={{ backgroundColor: "#1c2c5b", color: "white" }}
                  >
                    Submit
                  </Button>
                </Link>
              </Box>
            </SimpleGrid>

            <br />
            <br />
            <br />
            <br />

            <br />
            <br />
            <br />
            <br />
          </DatapageLayoutEmpty>
        </div>
      </ChakraProvider>
    );
  }
}
