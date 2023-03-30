import React from "react";
import { Button } from "reactstrap";
import { Loading } from "../../Components/appCommon";
import { ReactNotifications, Store } from "react-notifications-component";
import DatapageLayout from "../PageLayout";
import MyComponent from "../NotificationComponent";

function deepEqual(obj1, obj2) {
    if (obj1 === obj2) {
        return true;
    }
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
        return false;
    }

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }

    return true;
}

export default class ServiceCenters extends React.Component {
    state = {
        content: null,
        headers: [],
        loading: true,
        settings: {},
        error: "",
        employeeNameList: [],
        fieldSettings: {},
        columnSettings: {},
        dataContent: []
    };


    settings = {
        title: "Service Center",
        primaryColor: "#a6192e",
        accentColor: "#94795d",
        textColor: "#ffffff",
        textColorInvert: "#606060",
        api: "/api/ServiceCenter/",
        apiEmployee: "/api/Employee/",
    };

    async componentDidMount() {
        await this.getContent().then((content) => {
            console.log(content);
            this.setState({
                content: content,
                dataContent: content.data
            });
        });

        await this.getSettings().then((settings) => {
            console.log(settings)
            this.setState({
                settings: settings,
                fieldSettings: settings.data.FieldSettings,
                columnSettings: settings.data.ColumnSettings
            });
        });

        await this.getEmployeeContent();
        //await this.filterEmployee();

        this.setState({
            loading: false,
        });

    }

    async componentDidUpdate(prevProps, prevState) {
        if (
            !deepEqual(this.state.fieldSettings, prevState.fieldSettings) ||
            !deepEqual(this.state.columnSettings, prevState.columnSettings) ||
            !deepEqual(this.state.dataContent, prevState.dataContent) ||
            !deepEqual(this.state.employeeNameList, prevState.employeeNameList)
        ) {
            await this.filterEmployee();
        }
    }

    filterEmployee = async () => {
        const initialFieldSettings = this.state.fieldSettings;
        //console.log(initialFieldSettings)
        initialFieldSettings["Employee"] = { type: "text", displayLabel: "Employee", editable: "false", primaryKey: "false", tooltip: "null" }
        //console.log(initialFieldSettings)

        const initialColumnSettings = this.state.columnSettings;
        initialColumnSettings["Employee"] = { displayHeader: 'Employee' }

        const employeeNameMap = this.state.employeeNameList.reduce((map, employee) => {
            if (!map[employee.serviceCenterName]) {
                map[employee.serviceCenterName] = [];
            }
            map[employee.serviceCenterName].push(employee.username);
            return map;
        }, {});

        const initialSCData = this.state.dataContent;

        if (initialSCData) {
            const updatedSCData = initialSCData.map(obj => {
                const employeeNamesForServiceCenter = employeeNameMap[obj.ServiceCenterName]?.join(", ") || "";

                return {
                    ...obj,
                    Employee: [employeeNamesForServiceCenter]
                };
            });

            console.log(initialColumnSettings, initialFieldSettings, initialSCData)
            this.setState({
                fieldSettings: initialFieldSettings,
                columnSettings: initialColumnSettings,
                dataContent: updatedSCData
            });
        }
    };

    formatNames = (namesString, nameList) => {
        console.log(nameList)
        if (!namesString) {
            return "";
        }
        const names = namesString.split(",");
        const formattedNames = names.map((name) => {
            const trimmedName = name.trim();
            const index = nameList.indexOf(trimmedName);
            if (index !== -1) {
                return ` ${nameList[index]} `;
            }
            return ` ${trimmedName} `;
        });
        return formattedNames.join(", ");
    };

    test = (abc, def) => { };

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
            return res.json();
        });
    };

    getEmployeeContent = async () => {
        return fetch(this.settings.apiEmployee + "All", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            return res.json();
        }).then((content) => {
            const employeeNames = content.data.map((employee) => ({
                username: employee.username,
                serviceCenterName: employee.ServiceCenterName
            }));
            this.setState({
                employeeNameList: employeeNames
            });
        });
    };

    update = async (data) => {
        console.log(data);
        return fetch(this.settings.api + "UpdateAndFetch/" + data.ServiceCenterId, {
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
        const { fieldSettings, columnSettings, dataContent } = this.state
        if (this.state.loading) {
            return <Loading></Loading>;
        } else {
            return (
                <div style={{ width: "100%" }}>
                    <ReactNotifications />
                    <div style={{ width: "2em" }}>
                        <MyComponent></MyComponent>
                    </div>

                    <DatapageLayout
                        settings={this.settings}
                        fieldSettings={fieldSettings}
                        headers={columnSettings}
                        data={dataContent}
                        updateHandle={this.handleUpdate}
                        requestRefresh={this.requestRefresh}
                        error={this.state.error}
                        permissions={this.props.permissions}
                        requestError={this.requestError}
                    ></DatapageLayout>
                </div>
            );
        }
    }
}
