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
import { StdButton } from "../../Components/common";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import DatapageLayoutEmpty from "../PageLayoutEmpty";




function DrawerExample({
  selectedOption1,
  selectedOption2,
  onOptionChange1,
  onOptionChange2,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  const reset = () => {
    onOptionChange1({ target: { value: "" } });
    onOptionChange2({ target: { value: "" } });
    onClose();
  };

  return (
    <>
      <Button
        ref={btnRef}
        onClick={onOpen}
        style={{
          backgroundColor: "#1c2c5b",
          color: "white",
          marginLeft: "20px",
        }}
      >
        Filter
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter Option</DrawerHeader>

          <DrawerBody>
            Choose a Filter Option:
            <br />
            <br />
            <br />
            <br />
            Resource Type
            <br />
            <br />
            <Select
              placeholder="- Select a Resource Type -"
              size="sm"
              value={selectedOption1}
              onChange={onOptionChange1}
            >
              <option value="option1">Time</option>
              <option value="option2">Space</option>
              <option value="option3">Money</option>
              <option value="option4">Donor</option>
              <option value="option5">Volunteer</option>
            </Select>
            <br />
            <br />
            Status
            <br />
            <br />
            <Select
              placeholder="- Select a Status -"
              size="sm"
              value={selectedOption2}
              onChange={onOptionChange2}
            >
              <option value="option1_pending">Pending</option>
              <option value="option2_read">Read</option>
            </Select>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              style={{ backgroundColor: "#1c2c5b", color: "white" }}
              onClick={() => {
                onClose();
                reset();
              }}
            >
              Reset
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default class Request extends React.Component {
  // manually added the table
  state = {
    content: null,
    headers: [],
    loading: true,
    settings: {},
    error: "",
    selectedOption1: "",
    selectedOption2: "",

    columnSettings: {
      RequestID: { displayHeader: "Request ID" },
      ProjectName: { displayHeader: "Project Name" },
      ResourceType: { displayHeader: "Resource Type" },
      DateTime: { displayHeader: "Date Time" },
      SubmittedBy: { displayHeader: "Submitted By" },
      Status: { displayHeader: "Status" },
    },
    data: [
      {
        RequestID: "83ec00e3-3b3e-4a56-b7c9",
        ProjectName: "Lion City Leap",
        ResourceType: "Time",
        DateTime: "13/03/2023 08:45:23",
        SubmittedBy: "testEmployee",
        Status: "Pending",
        TimeAmount: "3 More Days",
        SpaceAmount: "Enter an Amount",
        MoneyAmount: "Enter an Amount",
        DonorAmount: "Enter an Amount",
        VolunteerAmount: "Enter an Amount",
        Description:
          "This project requires more time as there has been a delay of importing the materials in, thus the workers is not able to start it.",
      },
      {
        RequestID: "83ec00e3-3b3e-4a56-b7c9",
        ProjectName: "Garden State Growth",
        ResourceType: "Space",
        DateTime: "14/03/2023 08:45:23",
        SubmittedBy: "testEmployee",
        Status: "Pending",
        TimeAmount: "Enter an Amount",
        SpaceAmount: "Need 2 more Room",
        MoneyAmount: "Enter an Amount",
        DonorAmount: "Enter an Amount",
        VolunteerAmount: "Enter an Amount",
        Description:
          "This project requires more space as there has been a delay of importing the materials in, thus the workers is not able to start it.",
      },
      {
        RequestID: "83ec00e3-3b3e-4a56-b7c9",
        ProjectName: "Marina Milestone",
        ResourceType: "Donor",
        DateTime: "15/03/2023 08:45:23",
        SubmittedBy: "testEmployee",
        Status: "Pending",
        TimeAmount: "Enter an Amount",
        SpaceAmount: "Enter an Amount",
        MoneyAmount: "Enter an Amount",
        DonorAmount: "4 more is needed",
        VolunteerAmount: "Enter an Amount",
        Description:
          "This project requires more donor as there has been a delay of importing the materials in, thus the workers is not able to start it.",
      },
      {
        RequestID: "83ec00e3-3b3e-4a56-b7c9",
        ProjectName: "Island Innovation",
        ResourceType: "Money",
        DateTime: "16/03/2023 08:45:23",
        SubmittedBy: "testEmployee",
        Status: "Read",
        TimeAmount: "Enter an Amount",
        SpaceAmount: "Enter an Amount",
        MoneyAmount: "$5500 more is needed",
        DonorAmount: "Enter an Amount",
        VolunteerAmount: "Enter an Amount",
        Description:
          "This project requires more money as there has been a delay of importing the materials in, thus the workers is not able to start it.",
      },
      {
        RequestID: "83ec00e3-3b3e-4a56-b7c9",
        ProjectName: "Merlion Momentum",
        ResourceType: "Volunteer",
        DateTime: "17/03/2023 08:45:23",
        SubmittedBy: "testEmployee",
        Status: "Read",
        TimeAmount: "Enter an Amount",
        SpaceAmount: "Enter an Amount",
        MoneyAmount: "Enter an Amount",
        DonorAmount: "Enter an Amount",
        VolunteerAmount: "10 more volunteers is needed",
        Description:
          "This project requires more volunteer as there has been a delay of importing the materials in, thus the workers is not able to start it.",
      },
    ],
    fieldSettings: {
      RequestID: {
        type: "text",
        displayLabel: "RequestID",
        editable: "false",
        primaryKey: "false",
        tooltip: "null",
      },
      ProjectName: {
        type: "text",
        displayLabel: "ProjectName",
        editable: "false",
        primaryKey: "false",
        tooltip: "null",
      },
      ResourceType: {
        type: "text",
        displayLabel: "ResourceType",
        editable: "false",
        primaryKey: "false",
        tooltip: "null",
      },
      DateTime: {
        type: "text",
        displayLabel: "DateTime",
        editable: "false",
        primaryKey: "false",
        tooltip: "null",
      },
      SubmittedBy: {
        type: "text",
        displayLabel: "SubmittedBy",
        editable: "false",
        primaryKey: "false",
        tooltip: "null",
      },
      Status: {
        type: "text",
        displayLabel: "Status",
        editable: "false",
        primaryKey: "false",
        tooltip: "null",
      },
      TimeAmount: {
        type: "text",
        displayLabel: "TimeAmount",
        editable: "false",
        primaryKey: "false",
        tooltip: "null",
      },
      SpaceAmount: {
        type: "text",
        displayLabel: "SpaceAmount",
        editable: "false",
        primaryKey: "false",
        tooltip: "null",
      },
      MoneyAmount: {
        type: "text",
        displayLabel: "MoneyAmount",
        editable: "false",
        primaryKey: "false",
        tooltip: "null",
      },
      DonorAmount: {
        type: "text",
        displayLabel: "DonorAmount",
        editable: "false",
        primaryKey: "false",
        tooltip: "null",
      },
      VolunteerAmount: {
        type: "text",
        displayLabel: "VolunteerAmount",
        editable: "false",
        primaryKey: "false",
        tooltip: "null",
      },
      Description: {
        type: "text",
        displayLabel: "Description",
        editable: "false",
        primaryKey: "false",
        tooltip: "null",
      },
    },
  };

  handleOptionChange1 = (event) => {
    this.setState({ selectedOption1: event.target.value });
  };

  handleOptionChange2 = (event) => {
    this.setState({ selectedOption2: event.target.value });
  };

  renderTextbox = () => {
    const {
      activeButton,
      columnSettings,
      data,
      fieldSettings,
      selectedOption1,
      selectedOption2,
    } = this.state;
    if (this.state.loading) {
      return <loading></loading>;
    } else {
      if (selectedOption1 == "option1" && selectedOption2 != "option2_read") {
        return (
          <>

            <Heading
              as="h3"
              size="lg"
              style={{ marginTop: "10px", marginBottom: "20px" }}
            >
              Filter Option: 
              <DrawerExample
                style={{ position: "absolute", right: 0 }}
                selectedOption1={this.state.selectedOption1}
                selectedOption2={this.state.selectedOption2}
                onOptionChange1={this.handleOptionChange1}
                onOptionChange2={this.handleOptionChange2}
              />
            </Heading>

            <DatapageLayoutEmpty
              settings={this.settings}
              //fieldSettings={this.state.settings.data.FieldSettings}
              requestRefresh={this.requestRefresh}
              error={this.state.error}
              permissions={this.props.permissions}
              handleSearchCallBack={this.searchCallBack}
            >
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton style={{ backgroundColor: "#E8E8E8" }}>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          textColor: "black",
                          fontWeight: "bold",
                          backgroundColor: "#E8E8E8",
                        }}
                      >
                        <SimpleGrid columns={6} spacing={0}>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Request ID
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Project Name
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Resource Type
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Date Time
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Submitted By
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Status
                          </Box>
                        </SimpleGrid>
                      </Box>
                    </AccordionButton>
                  </h2>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton
                      style={{
                        backgroundColor:
                          activeButton === "button1" ? "#1c2c5b" : "white",
                        color: activeButton === "button1" ? "white" : "black",
                      }}
                      onClick={() => this.handleButtonClick("button1")}
                    >
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          backgroundColor:
                            activeButton === "button1" ? "#1c2c5b" : "white",
                        }}
                      >
                        <SimpleGrid columns={6} spacing={0}>
                          <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                          <Box>Lion City Leap</Box>
                          <Box>Time</Box>
                          <Box>13/03/2023 08:45:23</Box>
                          <Box>testEmployee</Box>
                          <Box>Pending</Box>
                        </SimpleGrid>
                      </Box>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    style={{
                      backgroundColor: "white",
                      padding: "20px",
                      border: "1px solid #E8E8E8",
                    }}
                  >
                    Project Name: Lion City Leap
                    <br />
                    <br />
                    <br />
                    Type
                    <br />
                    <br />
                    <SimpleGrid columns={2} spacing={20}>
                      <Box height="200px">
                        <Checkbox
                          colorScheme="green"
                          defaultChecked
                          style={{ marginTop: "5px" }}
                        >
                          Time
                        </Checkbox>
                        <Input
                          placeholder="3 More Days"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Space
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Money
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Donor
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Volunteer
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <br />
                      </Box>
                      <Box height="200px">
                        Description:
                        <br />
                        <br />
                        <Textarea placeholder="This project requires more time as there has been a delay of importing the materials in, thus the workers is not able to start it." />
                        <br />
                        <br />
                        <br />
                        <br />
                      </Box>
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </DatapageLayoutEmpty>
          </>
        );
      } else if (
        selectedOption1 == "option2" &&
        selectedOption2 != "option2_read"
      ) {
        return (
          <>
            <Heading
              as="h3"
              size="lg"
              style={{ marginTop: "10px", marginBottom: "20px" }}
            >
              Filter Option: 
              <DrawerExample
                style={{ position: "absolute", right: 0 }}
                selectedOption1={this.state.selectedOption1}
                selectedOption2={this.state.selectedOption2}
                onOptionChange1={this.handleOptionChange1}
                onOptionChange2={this.handleOptionChange2}
              />
            </Heading>

            <DatapageLayoutEmpty
              settings={this.settings}
              //fieldSettings={this.state.settings.data.FieldSettings}
              requestRefresh={this.requestRefresh}
              error={this.state.error}
              permissions={this.props.permissions}
              handleSearchCallBack={this.searchCallBack}
            >
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton style={{ backgroundColor: "#E8E8E8" }}>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          textColor: "black",
                          fontWeight: "bold",
                          backgroundColor: "#E8E8E8",
                        }}
                      >
                        <SimpleGrid columns={6} spacing={0}>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Request ID
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Project Name
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Resource Type
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Date Time
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Submitted By
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Status
                          </Box>
                        </SimpleGrid>
                      </Box>
                    </AccordionButton>
                  </h2>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton
                      style={{
                        backgroundColor:
                          activeButton === "button1" ? "#1c2c5b" : "white",
                        color: activeButton === "button1" ? "white" : "black",
                      }}
                      onClick={() => this.handleButtonClick("button1")}
                    >
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          backgroundColor:
                            activeButton === "button1" ? "#1c2c5b" : "white",
                        }}
                      >
                        <SimpleGrid columns={6} spacing={0}>
                          <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                          <Box>Garden State Growth</Box>
                          <Box>Space</Box>
                          <Box>14/03/2023 08:45:23</Box>
                          <Box>testEmployee</Box>
                          <Box>Pending</Box>
                        </SimpleGrid>
                      </Box>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    style={{
                      backgroundColor: "white",
                      padding: "20px",
                      border: "1px solid #E8E8E8",
                    }}
                  >
                    Project Name: Garden State Growth
                    <br />
                    <br />
                    <br />
                    Type
                    <br />
                    <br />
                    <SimpleGrid columns={2} spacing={20}>
                      <Box height="200px">
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Time
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultChecked
                          style={{ marginTop: "5px" }}
                        >
                          Space
                        </Checkbox>
                        <Input
                          placeholder="Need 2 more Room"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Money
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Donor
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Volunteer
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <br />
                      </Box>
                      <Box height="200px">
                        Description:
                        <br />
                        <br />
                        <Textarea placeholder="This project requires more space as there has been a delay of importing the materials in, thus the workers is not able to start it." />
                        <br />
                        <br />
                        <br />
                        <br />
                      </Box>
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </DatapageLayoutEmpty>
          </>
        );
      } else if (
        selectedOption1 == "option3" &&
        selectedOption2 != "option1_pending"
      ) {
        return (
          <>
            <Heading
              as="h3"
              size="lg"
              style={{ marginTop: "10px", marginBottom: "20px" }}
            >
              Filter Option: 
              <DrawerExample
                style={{ position: "absolute", right: 0 }}
                selectedOption1={this.state.selectedOption1}
                selectedOption2={this.state.selectedOption2}
                onOptionChange1={this.handleOptionChange1}
                onOptionChange2={this.handleOptionChange2}
              />
            </Heading>

            <DatapageLayoutEmpty
              settings={this.settings}
              //fieldSettings={this.state.settings.data.FieldSettings}
              requestRefresh={this.requestRefresh}
              error={this.state.error}
              permissions={this.props.permissions}
              handleSearchCallBack={this.searchCallBack}
            >
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton style={{ backgroundColor: "#E8E8E8" }}>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          textColor: "black",
                          fontWeight: "bold",
                          backgroundColor: "#E8E8E8",
                        }}
                      >
                        <SimpleGrid columns={6} spacing={0}>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Request ID
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Project Name
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Resource Type
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Date Time
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Submitted By
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Status
                          </Box>
                        </SimpleGrid>
                      </Box>
                    </AccordionButton>
                  </h2>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton
                      style={{
                        backgroundColor:
                          activeButton === "button1" ? "#1c2c5b" : "white",
                        color: activeButton === "button1" ? "white" : "black",
                      }}
                      onClick={() => this.handleButtonClick("button1")}
                    >
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          backgroundColor:
                            activeButton === "button1" ? "#1c2c5b" : "white",
                        }}
                      >
                        <SimpleGrid columns={6} spacing={0}>
                          <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                          <Box>Island Innovation</Box>
                          <Box>Money</Box>
                          <Box>16/03/2023 08:45:23</Box>
                          <Box>testEmployee</Box>
                          <Box>Read</Box>
                        </SimpleGrid>
                      </Box>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    style={{
                      backgroundColor: "white",
                      padding: "20px",
                      border: "1px solid #E8E8E8",
                    }}
                  >
                    Project Name: Island Innovation
                    <br />
                    <br />
                    <br />
                    Type
                    <br />
                    <br />
                    <SimpleGrid columns={2} spacing={20}>
                      <Box height="200px">
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Time
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Space
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Money
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultChecked
                          style={{ marginTop: "5px" }}
                        >
                          Donor
                        </Checkbox>
                        <Input
                          placeholder="$5500 more is needed"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Volunteer
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <br />
                      </Box>
                      <Box height="200px">
                        Description:
                        <br />
                        <br />
                        <Textarea placeholder="This project requires more money as there has been a delay of importing the materials in, thus the workers is not able to start it." />
                        <br />
                        <br />
                        <br />
                        <br />
                      </Box>
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </DatapageLayoutEmpty>
          </>
        );
      } else if (
        selectedOption1 == "option4" &&
        selectedOption2 != "option2_read"
      ) {
        return (
          <>
            <Heading
              as="h3"
              size="lg"
              style={{ marginTop: "10px", marginBottom: "20px" }}
            >
              Filter Option: 
              <DrawerExample
                style={{ position: "absolute", right: 0 }}
                selectedOption1={this.state.selectedOption1}
                selectedOption2={this.state.selectedOption2}
                onOptionChange1={this.handleOptionChange1}
                onOptionChange2={this.handleOptionChange2}
              />
            </Heading>

            <DatapageLayoutEmpty
              settings={this.settings}
              //fieldSettings={this.state.settings.data.FieldSettings}
              requestRefresh={this.requestRefresh}
              error={this.state.error}
              permissions={this.props.permissions}
              handleSearchCallBack={this.searchCallBack}
            >
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton style={{ backgroundColor: "#E8E8E8" }}>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          textColor: "black",
                          fontWeight: "bold",
                          backgroundColor: "#E8E8E8",
                        }}
                      >
                        <SimpleGrid columns={6} spacing={0}>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Request ID
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Project Name
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Resource Type
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Date Time
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Submitted By
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Status
                          </Box>
                        </SimpleGrid>
                      </Box>
                    </AccordionButton>
                  </h2>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton
                      style={{
                        backgroundColor:
                          activeButton === "button1" ? "#1c2c5b" : "white",
                        color: activeButton === "button1" ? "white" : "black",
                      }}
                      onClick={() => this.handleButtonClick("button1")}
                    >
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          backgroundColor:
                            activeButton === "button1" ? "#1c2c5b" : "white",
                        }}
                      >
                        <SimpleGrid columns={6} spacing={0}>
                          <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                          <Box>Marina Milestone</Box>
                          <Box>Donor</Box>
                          <Box>15/03/2023 08:45:23</Box>
                          <Box>testEmployee</Box>
                          <Box>Pending</Box>
                        </SimpleGrid>
                      </Box>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    style={{
                      backgroundColor: "white",
                      padding: "20px",
                      border: "1px solid #E8E8E8",
                    }}
                  >
                    Project Name: Marina Milestone
                    <br />
                    <br />
                    <br />
                    Type
                    <br />
                    <br />
                    <SimpleGrid columns={2} spacing={20}>
                      <Box height="200px">
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Time
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Space
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultChecked
                          style={{ marginTop: "5px" }}
                        >
                          Money
                        </Checkbox>
                        <Input
                          placeholder="4 more is needed"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Donor
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Volunteer
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <br />
                      </Box>
                      <Box height="200px">
                        Description:
                        <br />
                        <br />
                        <Textarea placeholder="This project requires more donor as there has been a delay of importing the materials in, thus the workers is not able to start it." />
                        <br />
                        <br />
                        <br />
                        <br />
                      </Box>
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </DatapageLayoutEmpty>
          </>
        );
      } else if (
        selectedOption1 == "option5" &&
        selectedOption2 != "option1_pending"
      ) {
        return (
          <>
            <Heading
              as="h3"
              size="lg"
              style={{ marginTop: "10px", marginBottom: "20px" }}
            >
              Filter Option: 
              <DrawerExample
                style={{ position: "absolute", right: 0 }}
                selectedOption1={this.state.selectedOption1}
                selectedOption2={this.state.selectedOption2}
                onOptionChange1={this.handleOptionChange1}
                onOptionChange2={this.handleOptionChange2}
              />
            </Heading>

            <DatapageLayoutEmpty
              settings={this.settings}
              //fieldSettings={this.state.settings.data.FieldSettings}
              requestRefresh={this.requestRefresh}
              error={this.state.error}
              permissions={this.props.permissions}
              handleSearchCallBack={this.searchCallBack}
            >
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton style={{ backgroundColor: "#E8E8E8" }}>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          textColor: "black",
                          fontWeight: "bold",
                          backgroundColor: "#E8E8E8",
                        }}
                      >
                        <SimpleGrid columns={6} spacing={0}>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Request ID
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Project Name
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Resource Type
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Date Time
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Submitted By
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Status
                          </Box>
                        </SimpleGrid>
                      </Box>
                    </AccordionButton>
                  </h2>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton
                      style={{
                        backgroundColor:
                          activeButton === "button1" ? "#1c2c5b" : "white",
                        color: activeButton === "button1" ? "white" : "black",
                      }}
                      onClick={() => this.handleButtonClick("button1")}
                    >
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          backgroundColor:
                            activeButton === "button1" ? "#1c2c5b" : "white",
                        }}
                      >
                        <SimpleGrid columns={6} spacing={0}>
                          <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                          <Box>Merlion Momentum</Box>
                          <Box>Volunteer</Box>
                          <Box>17/03/2023 08:45:23</Box>
                          <Box>testEmployee</Box>
                          <Box>Read</Box>
                        </SimpleGrid>
                      </Box>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    style={{
                      backgroundColor: "white",
                      padding: "20px",
                      border: "1px solid #E8E8E8",
                    }}
                  >
                    Project Name: Merlion Momentum
                    <br />
                    <br />
                    <br />
                    Type
                    <br />
                    <br />
                    <SimpleGrid columns={2} spacing={20}>
                      <Box height="200px">
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Time
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Space
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Money
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Donor
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultChecked
                          style={{ marginTop: "5px" }}
                        >
                          Volunteer
                        </Checkbox>
                        <Input
                          placeholder="10 more volunteers is needed"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <br />
                      </Box>
                      <Box height="200px">
                        Description:
                        <br />
                        <br />
                        <Textarea placeholder="This project requires more volunteer as there has been a delay of importing the materials in, thus the workers is not able to start it." />
                        <br />
                        <br />
                        <br />
                        <br />
                      </Box>
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </DatapageLayoutEmpty>
          </>
        );
      } else if (
        selectedOption2 == "option1_pending" &&
        selectedOption1 != "option3" &&
        selectedOption1 != "option5"
      ) {
        return (
          <>
            <Heading
              as="h3"
              size="lg"
              style={{ marginTop: "10px", marginBottom: "20px" }}
            >
              Filter Option: 
              <DrawerExample
                style={{ position: "absolute", right: 0 }}
                selectedOption1={this.state.selectedOption1}
                selectedOption2={this.state.selectedOption2}
                onOptionChange1={this.handleOptionChange1}
                onOptionChange2={this.handleOptionChange2}
              />
            </Heading>
            <DatapageLayoutEmpty
              settings={this.settings}
              //fieldSettings={this.state.settings.data.FieldSettings}
              requestRefresh={this.requestRefresh}
              error={this.state.error}
              permissions={this.props.permissions}
              handleSearchCallBack={this.searchCallBack}
            >
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton style={{ backgroundColor: "#E8E8E8" }}>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          textColor: "black",
                          fontWeight: "bold",
                          backgroundColor: "#E8E8E8",
                        }}
                      >
                        <SimpleGrid columns={6} spacing={0}>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Request ID
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Project Name
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Resource Type
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Date Time
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Submitted By
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Status
                          </Box>
                        </SimpleGrid>
                      </Box>
                    </AccordionButton>
                  </h2>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton
                      style={{
                        backgroundColor:
                          activeButton === "button1" ? "#1c2c5b" : "white",
                        color: activeButton === "button1" ? "white" : "black",
                      }}
                      onClick={() => this.handleButtonClick("button1")}
                    >
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          backgroundColor:
                            activeButton === "button1" ? "#1c2c5b" : "white",
                        }}
                      >
                        <SimpleGrid columns={6} spacing={0}>
                          <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                          <Box>Lion City Leap</Box>
                          <Box>Time</Box>
                          <Box>13/03/2023 08:45:23</Box>
                          <Box>testEmployee</Box>
                          <Box>Pending</Box>
                        </SimpleGrid>
                      </Box>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    style={{
                      backgroundColor: "white",
                      padding: "20px",
                      border: "1px solid #E8E8E8",
                    }}
                  >
                    Project Name: Lion City Leap
                    <br />
                    <br />
                    <br />
                    Type
                    <br />
                    <br />
                    <SimpleGrid columns={2} spacing={20}>
                      <Box height="200px">
                        <Checkbox
                          colorScheme="green"
                          defaultChecked
                          style={{ marginTop: "5px" }}
                        >
                          Time
                        </Checkbox>
                        <Input
                          placeholder="3 More Days"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Space
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Money
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Donor
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Volunteer
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <br />
                      </Box>
                      <Box height="200px">
                        Description:
                        <br />
                        <br />
                        <Textarea placeholder="This project requires more time as there has been a delay of importing the materials in, thus the workers is not able to start it." />
                        <br />
                        <br />
                        <br />
                        <br />
                      </Box>
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton
                      style={{
                        backgroundColor:
                          activeButton === "button2" ? "#1c2c5b" : "white",
                        color: activeButton === "button2" ? "white" : "black",
                      }}
                      onClick={() => this.handleButtonClick("button2")}
                    >
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          backgroundColor:
                            activeButton === "button2" ? "#1c2c5b" : "white",
                        }}
                      >
                        <SimpleGrid columns={6} spacing={0}>
                          <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                          <Box>Garden State Growth</Box>
                          <Box>Space</Box>
                          <Box>14/03/2023 08:45:23</Box>
                          <Box>testEmployee</Box>
                          <Box>Pending</Box>
                        </SimpleGrid>
                      </Box>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    style={{
                      backgroundColor: "white",
                      padding: "20px",
                      border: "1px solid #E8E8E8",
                    }}
                  >
                    Project Name: Garden State Growth
                    <br />
                    <br />
                    <br />
                    Type
                    <br />
                    <br />
                    <SimpleGrid columns={2} spacing={20}>
                      <Box height="200px">
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Time
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultChecked
                          style={{ marginTop: "5px" }}
                        >
                          Space
                        </Checkbox>
                        <Input
                          placeholder="Need 2 more Room"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Money
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Donor
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Volunteer
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <br />
                      </Box>
                      <Box height="200px">
                        Description:
                        <br />
                        <br />
                        <Textarea placeholder="This project requires more space as there has been a delay of importing the materials in, thus the workers is not able to start it." />
                        <br />
                        <br />
                        <br />
                        <br />
                      </Box>
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton
                      style={{
                        backgroundColor:
                          activeButton === "button3" ? "#1c2c5b" : "white",
                        color: activeButton === "button3" ? "white" : "black",
                      }}
                      onClick={() => this.handleButtonClick("button3")}
                    >
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          backgroundColor:
                            activeButton === "button3" ? "#1c2c5b" : "white",
                        }}
                      >
                        <SimpleGrid columns={6} spacing={0}>
                          <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                          <Box>Marina Milestone</Box>
                          <Box>Donor</Box>
                          <Box>15/03/2023 08:45:23</Box>
                          <Box>testEmployee</Box>
                          <Box>Pending</Box>
                        </SimpleGrid>
                      </Box>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    style={{
                      backgroundColor: "white",
                      padding: "20px",
                      border: "1px solid #E8E8E8",
                    }}
                  >
                    Project Name: Marina Milestone
                    <br />
                    <br />
                    <br />
                    Type
                    <br />
                    <br />
                    <SimpleGrid columns={2} spacing={20}>
                      <Box height="200px">
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Time
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Space
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultChecked
                          style={{ marginTop: "5px" }}
                        >
                          Money
                        </Checkbox>
                        <Input
                          placeholder="4 more is needed"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Donor
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Volunteer
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <br />
                      </Box>
                      <Box height="200px">
                        Description:
                        <br />
                        <br />
                        <Textarea placeholder="This project requires more donor as there has been a delay of importing the materials in, thus the workers is not able to start it." />
                        <br />
                        <br />
                        <br />
                        <br />
                      </Box>
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </DatapageLayoutEmpty>
          </>
        );
      } else if (
        selectedOption2 == "option2_read" &&
        selectedOption1 != "option1" &&
        selectedOption1 != "option2" &&
        selectedOption1 != "option4"
      ) {
        return (
          <>
            <Heading
              as="h3"
              size="lg"
              style={{ marginTop: "10px", marginBottom: "20px" }}
            >
              Filter Option: 
              <DrawerExample
                style={{ position: "absolute", right: 0 }}
                selectedOption1={this.state.selectedOption1}
                selectedOption2={this.state.selectedOption2}
                onOptionChange1={this.handleOptionChange1}
                onOptionChange2={this.handleOptionChange2}
              />
            </Heading>
            <DatapageLayoutEmpty
              settings={this.settings}
              //fieldSettings={this.state.settings.data.FieldSettings}
              requestRefresh={this.requestRefresh}
              error={this.state.error}
              permissions={this.props.permissions}
              handleSearchCallBack={this.searchCallBack}
            >
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton style={{ backgroundColor: "#E8E8E8" }}>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          textColor: "black",
                          fontWeight: "bold",
                          backgroundColor: "#E8E8E8",
                        }}
                      >
                        <SimpleGrid columns={6} spacing={0}>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Request ID
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Project Name
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Resource Type
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Date Time
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Submitted By
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Status
                          </Box>
                        </SimpleGrid>
                      </Box>
                    </AccordionButton>
                  </h2>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton
                      style={{
                        backgroundColor:
                          activeButton === "button1" ? "#1c2c5b" : "white",
                        color: activeButton === "button1" ? "white" : "black",
                      }}
                      onClick={() => this.handleButtonClick("button1")}
                    >
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          backgroundColor:
                            activeButton === "button1" ? "#1c2c5b" : "white",
                        }}
                      >
                        <SimpleGrid columns={6} spacing={0}>
                          <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                          <Box>Island Innovation</Box>
                          <Box>Money</Box>
                          <Box>16/03/2023 08:45:23</Box>
                          <Box>testEmployee</Box>
                          <Box>Read</Box>
                        </SimpleGrid>
                      </Box>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    style={{
                      backgroundColor: "white",
                      padding: "20px",
                      border: "1px solid #E8E8E8",
                    }}
                  >
                    Project Name: Island Innovation
                    <br />
                    <br />
                    <br />
                    Type
                    <br />
                    <br />
                    <SimpleGrid columns={2} spacing={20}>
                      <Box height="200px">
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Time
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Space
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Money
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultChecked
                          style={{ marginTop: "5px" }}
                        >
                          Donor
                        </Checkbox>
                        <Input
                          placeholder="$5500 more is needed"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Volunteer
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <br />
                      </Box>
                      <Box height="200px">
                        Description:
                        <br />
                        <br />
                        <Textarea placeholder="This project requires more money as there has been a delay of importing the materials in, thus the workers is not able to start it." />
                        <br />
                        <br />
                        <br />
                        <br />
                      </Box>
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <h2>
                    <AccordionButton
                      style={{
                        backgroundColor:
                          activeButton === "button2" ? "#1c2c5b" : "white",
                        color: activeButton === "button2" ? "white" : "black",
                      }}
                      onClick={() => this.handleButtonClick("button2")}
                    >
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          backgroundColor:
                            activeButton === "button2" ? "#1c2c5b" : "white",
                        }}
                      >
                        <SimpleGrid columns={6} spacing={0}>
                          <Box>83ec00e3-3b3e-4a56-b7c9</Box>
                          <Box>Merlion Momentum</Box>
                          <Box>Volunteer</Box>
                          <Box>17/03/2023 08:45:23</Box>
                          <Box>testEmployee</Box>
                          <Box>Read</Box>
                        </SimpleGrid>
                      </Box>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    style={{
                      backgroundColor: "white",
                      padding: "20px",
                      border: "1px solid #E8E8E8",
                    }}
                  >
                    Project Name: Merlion Momentum
                    <br />
                    <br />
                    <br />
                    Type
                    <br />
                    <br />
                    <SimpleGrid columns={2} spacing={20}>
                      <Box height="200px">
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Time
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Space
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Money
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Donor
                        </Checkbox>
                        <Input
                          placeholder="Enter an Amount"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultChecked
                          style={{ marginTop: "5px" }}
                        >
                          Volunteer
                        </Checkbox>
                        <Input
                          placeholder="10 more volunteers is needed"
                          size="sm"
                          style={{ marginLeft: "20px", width: "80%" }}
                        />
                        <br />
                        <br />
                        <br />
                      </Box>
                      <Box height="200px">
                        Description:
                        <br />
                        <br />
                        <Textarea placeholder="This project requires more volunteer as there has been a delay of importing the materials in, thus the workers is not able to start it." />
                        <br />
                        <br />
                        <br />
                        <br />
                      </Box>
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </DatapageLayoutEmpty>
          </>
        );
      } else if (selectedOption1 == "" && selectedOption2 == "") {
        return (
          <>

            <Heading as="h3" size="lg" style={{ marginBottom: "20px" }}>
              Filter Option: 
              <DrawerExample
                style={{ position: "absolute", right: 0 }}
                selectedOption1={this.state.selectedOption1}
                selectedOption2={this.state.selectedOption2}
                onOptionChange1={this.handleOptionChange1}
                onOptionChange2={this.handleOptionChange2}
              />
            </Heading>

            <DatapageLayout
              settings={this.settings}
              fieldSettings={fieldSettings}
              headers={columnSettings}
              data={data}
              hasFields={false}
              updateHandle={this.handleUpdate}
              requestRefresh={this.requestRefresh}
              error={this.state.error}
              permissions={this.props.permissions}
              requestError={this.requestError}
            >
              {this.state.content.data.map((item, index) => {
                return (
                  <div className="volunteer-extended">
                    Project Name: {data[index].ProjectName}
                    <br />
                    <br />
                    <br />
                    Type
                    <br />
                    <br />
                    <SimpleGrid columns={2} spacing={20}>
                      <Box height="200px">
                        <Checkbox
                          colorScheme="green"
                          defaultChecked
                          style={{ marginTop: "5px" }}
                        >
                          Time
                        </Checkbox>
                        <Input
                          placeholder={data[index].TimeAmount}
                          size="sm"
                          style={{ marginLeft: "20px", width: "75%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Space
                        </Checkbox>
                        <Input
                          placeholder={data[index].SpaceAmount}
                          size="sm"
                          style={{ marginLeft: "20px", width: "75%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Money
                        </Checkbox>
                        <Input
                          placeholder={data[index].MoneyAmount}
                          size="sm"
                          style={{ marginLeft: "20px", width: "75%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Donor
                        </Checkbox>
                        <Input
                          placeholder={data[index].DonorAmount}
                          size="sm"
                          style={{ marginLeft: "20px", width: "75%" }}
                        />
                        <br />
                        <br />
                        <Checkbox
                          colorScheme="green"
                          defaultIsChecked
                          style={{ marginTop: "5px" }}
                        >
                          Volunteer
                        </Checkbox>
                        <Input
                          placeholder={data[index].VolunteerAmount}
                          size="sm"
                          style={{ marginLeft: "20px", width: "75%" }}
                        />
                        <br />
                        <br />
                        <br />
                      </Box>
                      <Box height="200px">
                        Description:
                        <br />
                        <br />
                        <Textarea placeholder={data[index].Description} />
                        <br />
                        <br />
                        <br />
                        <br />
                      </Box>
                    </SimpleGrid>
                  </div>
                );
              })}
            </DatapageLayout>
          </>
        );
      } else {
        return (
          <>
            <Heading
              as="h3"
              size="lg"
              style={{ marginTop: "10px", marginBottom: "20px" }}
            >
              Filter Option: 
              <DrawerExample
                style={{ position: "absolute", right: 0 }}
                selectedOption1={this.state.selectedOption1}
                selectedOption2={this.state.selectedOption2}
                onOptionChange1={this.handleOptionChange1}
                onOptionChange2={this.handleOptionChange2}
              />
            </Heading>
            <DatapageLayoutEmpty
              settings={this.settings}
              //fieldSettings={this.state.settings.data.FieldSettings}
              requestRefresh={this.requestRefresh}
              error={this.state.error}
              permissions={this.props.permissions}
              handleSearchCallBack={this.searchCallBack}
            >
              <Accordion allowToggle>
                <AccordionItem>
                  <h2>
                    <AccordionButton style={{ backgroundColor: "#E8E8E8" }}>
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        style={{
                          marginTop: "10px",
                          marginBottom: "10px",
                          textColor: "black",
                          fontWeight: "bold",
                          backgroundColor: "#E8E8E8",
                        }}
                      >
                        <SimpleGrid columns={6} spacing={0}>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Request ID
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Project Name
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Resource Type
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Date Time
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Submitted By
                          </Box>
                          <Box
                            style={{
                              textColor: "black",
                              fontWeight: "bold",
                              textTransform: "uppercase",
                            }}
                          >
                            Status
                          </Box>
                        </SimpleGrid>
                      </Box>
                    </AccordionButton>
                  </h2>
                </AccordionItem>
              </Accordion>
            </DatapageLayoutEmpty>
          </>
        );
      }
    }
  };

  settings = {
    title: "View All Request Form",
    primaryColor: "#a6192e",
    accentColor: "#94795d",
    textColor: "#ffffff",
    textColorInvert: "#606060",
    api: "/api/Request/",
  };

  // accordian function
  handleButtonClick(buttonName) {
    this.setState((prevState) => ({
      activeButton: prevState.activeButton === buttonName ? null : buttonName,
    }));
  }

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
    const { columnSettings, data, fieldSettings } = this.state;
    if (this.state.loading) {
      return <loading></loading>;
    } else {
      console.log(data);

      return (
        <ChakraProvider>
          {/* <StdButton className={"secondary"}>Filter Option</StdButton> */}

          <div style={{ marginTop: "0px", marginBottom: "30px", width: "94%" }}>
            <br />
            <br />
            <br />
            <br />
            {this.renderTextbox()}
            <br />
            <br />
            <br />
            <br />
          </div>
        </ChakraProvider>
      );
    }
  }
}
