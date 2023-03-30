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
import { StdButton } from "../../Components/common"
import DatapageLayoutEmpty from "../PageLayoutEmpty";



export default class Request extends React.Component {
  state = {
    content: null,
    headers: [],
    loading: true,
    settings: {},
    error: "",
  };

  settings = {
    title: "Request Form",
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

  // uploadFile = async (file) => {
  //     console.log(file);
  //     const formData = new FormData();
  //     formData.append("file", file.FileUrl);

  //     return await fetch("/api/File/Upload",
  //         {
  //             method: "POST",
  //             body: formData,
  //         }
  //     ).then((res) => {
  //         console.log(res);
  //         return res.json();
  //     }).catch(err => {
  //         console.log(err);
  //     })
  // }

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

    // for(const field of fileUploadFields){
    //     try {
    //         const res = await this.uploadFile(updateData[field]);
    //         if(res.success){
    //             updateData[field] = res.data;
    //         }
    //     }catch(e){
    //         this.props.requestError(e);
    //     }
    // }
    // await this.update(data).then((content)=>{
    //     if(content.success){
    //         this.setState({
    //             error:"",
    //         })
    //         return true;
    //     }else{
    //         this.setState({
    //             error:content.message,
    //         })
    //         return false;
    //     }
    // })
    // try{
    //     const res = await this.update(data);
    //     if(res.success){
    //         this.setState({
    //             error:"",
    //         })
    //         return true;
    //     }else{
    //         this.setState({
    //             error:res.message,
    //         })
    //         return false;
    //     }
    // }catch(e){
    //     this.requestError(e);
    // }
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
              <Box height="200px">
                <Checkbox
                  colorScheme="green"
                  defaultIsChecked
                  style={{ marginTop: "5px" }}
                >
                  Time
                </Checkbox>
                <Input
                  placeholder="Enter a Time"
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
                  placeholder="Enter a Space"
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
                  placeholder="Enter an Amount (Money)"
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
                  placeholder="Enter an Amount (Donor)"
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
                  placeholder="Enter an Amount (Volunteer)"
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
                <Textarea placeholder="Enter your reason here . . ." />
                <br />
                <br />
                <br />
                <br />
                <Link to="/ViewRequest">
                  <Button style={{ backgroundColor: '#1c2c5b', color: 'white' }} >Submit</Button>
                </Link>
              </Box>
            </SimpleGrid>
          </DatapageLayoutEmpty>
        </div>
      </ChakraProvider>
    );
  }
}
