
import React, { useEffect } from "react"
import { Loading } from "../../Components/appCommon"
import DatapageLayout from "../PageLayout"
import { Pie } from 'react-chartjs-2'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer} from '@chakra-ui/react'
import "../../styles/userDashboard.css";


// for the pie chart
const data= {
    labels: ['Employee', 'Volunteer', 'Donor'],
    datasets: [
        {
            data: [2, 2, 1],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }
    ]
};
// for legend
const options = {
    responsive: false,
    maintainAspectRatio: false,
     plugins: {
        legend: {
            position: 'right'
        }
    }
};


export default class Employees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: null,
            myEmployeeList: [],
            myDonorList: [],
            myVolunteerList: [],
            headers: [],
            loading: true,
            settings: {},
            error: ""
        }
        this.settings = {
            title: "Employees",
            primaryColor: "#a6192e",
            accentColor: "#94795d",
            textColor: "#ffffff",
            textColorInvert: "#606060",
            apiEmployee: "/api/Employee/",
            apiDonor: "/api/Donor/",
            apiVolunteer: "/api/Volunteer/"
        }
    }

    async componentDidMount() {
        await this.getEmployeeContent().then((content) => {
            console.log(content.data);
            this.setState({
                content: content,
                myEmployeeList: content.data
            });
        })

        await this.getDonorContent().then((content) => {
            console.log(content.data);
            this.setState({
                content: content,
                myDonorList: content.data
            });
        })

        await this.getVolunteerContent().then((content) => {
            console.log(content.data);
            this.setState({
                content: content,
                myVolunteerList: content.data
            });
        })

        await this.getSettings().then((settings) => {
            //console.log(settings);
            this.setState({
                settings: settings,
            });
        })

        this.setState({
            loading: false,
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.myEmployeeList !== nextState.myEmployeeList || this.state.myDonorList !== nextState.myDonorList ||
            this.state.myVolunteerList !== nextState.myVolunteerList
    }

    getEmployeeContent = async () => {
        return fetch(this.settings.apiEmployee + "All", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            console.log(res);
            //Res = {success: true, message: "Success", data: Array(3)}
            return res.json();
        });
    }

    getDonorContent = async () => {
        return fetch(this.settings.apiDonor + "All", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            console.log(res);
            //Res = {success: true, message: "Success", data: Array(3)}
            return res.json();
        });
    }

    getVolunteerContent = async () => {
        return fetch(this.settings.apiVolunteer + "All", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            console.log(res);
            //Res = {success: true, message: "Success", data: Array(3)}
            return res.json();
        });
    }

    getSettings = async () => {
        // fetches http://...:5001/api/User/Settings
        return fetch(this.settings.apiEmployee + "Settings", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => {
            //console.log(res);
            return res.json();
        })
    }

    update = async (data) => {
        //console.log(data);
        return fetch(this.settings.apiEmployee + "UpdateAndFetch/" + data.UserId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then(async res => {
            return res.json();
        });
    }

    handleUpdate = async (data) => {
        await this.update(data).then((content) => {
            if (content.success) {
                this.setState({
                    error: "",
                })
                return true;
            } else {
                this.setState({
                    error: content.message,
                })
                return false;
            }
        })
    }

    requestRefresh = async () => {
        this.setState({
            loading: true,
        })
        await this.getContent().then((content) => {
            console.log(content);
            this.setState({
                content: content,
                loading: false,
            });
        })
    }

    requestError = async (error) => {
        this.setState({
            error: error,
        })
    }   

    render() {
        const { myEmployeeList, myDonorList, myVolunteerList } = this.state;
        return (
              <div className="Users">
                  <div className="pie-chart">
                      <Pie data={data} options={options} />
                  </div>
                  <div className="userTable">
                      <TableContainer>
                      <Table>
                          <Thead>
                              <Tr>
                                  <Th>
                                      User Id
                                  </Th>
                                  <Th>
                                      Employee Name
                                  </Th>
                                  <Th>
                                      Employee Email
                                  </Th>
                                  <Th>
                                      Employee Type
                                  </Th>
                                  <Th>
                                      Address
                                  </Th>
                                  <Th>
                                      Role
                                  </Th>
                              </Tr>
                          </Thead>
                            <Tbody>
                                {console.log(myEmployeeList)}
                                {myEmployeeList.map(item => 
                                      <Tr key={item.UserId}>
                                        <Td>{item.UserId}</Td>
                                        <Td>{item.username}</Td>
                                        <Td>{item.Email}</Td>
                                        <Td>{item.EmployeeType}</Td>
                                        <Td>{item.address}</Td>
                                        <Td>{item.Role}</Td>
                                      </Tr>
                                  )}
                          </Tbody>
                          </Table>
                          </TableContainer>
                </div>
                <div className="userTable">
                    <TableContainer>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>
                                        User Id
                                    </Th>
                                    <Th>
                                        Donor Name
                                    </Th>
                                    <Th>
                                        Donor Type
                                    </Th>
                                    <Th>
                                        Donor Email
                                    </Th>
                                    <Th>
                                        Donor Phone Number
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {console.log(myDonorList)}
                                {myDonorList.map(item =>
                                    <Tr key={item.UserId}>
                                        <Td>{item.UserId}</Td>
                                        <Td>{item.donorName}</Td>
                                        <Td>{item.donorType}</Td>
                                        <Td>{item.Email}</Td>
                                        <Td>{item.phoneNumber}</Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>
                <div className="userTable">
                    <TableContainer>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>
                                        User Id
                                    </Th>
                                    <Th>
                                        Volunteer Username 
                                    </Th>
                                    <Th>
                                        Qualifications
                                    </Th>
                                    <Th>
                                        Volunteer Email
                                    </Th>
                                    <Th>
                                        Volunteer Phone Number
                                    </Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {console.log(myVolunteerList)}
                                {myVolunteerList.map(item =>
                                    <Tr key={item.UserId}>
                                        <Td>{item.UserId}</Td>
                                        <Td>{item.username}</Td>
                                        <Td>{item.Qualifications}</Td>
                                        <Td>{item.Email}</Td>
                                        <Td>{item.phoneNumber}</Td>
                                    </Tr>
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </div>
                  {/**
                    <DatapageLayout 
                        settings={this.settings}
                        fieldSettings={this.state.settings.data.FieldSettings} 
                        headers={this.state.settings.data.ColumnSettings} 
                        data={this.state.content.data}
                        updateHandle = {this.handleUpdate}
                        requestRefresh = {this.requestRefresh}
                        error={this.state.error}
                        permissions={this.props.permissions}
                        requestError={this.requestError}
                        >
                  </DatapageLayout>
                  */}
                    
                </div >
            )
        }
    
}