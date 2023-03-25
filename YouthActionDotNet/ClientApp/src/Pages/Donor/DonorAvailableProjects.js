import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Loading } from "../../Components/appCommon";
import "../../styles/donorDashboard.css";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";

function DonorAvailableProjects() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function getProjects() {
      try {
        const response = await fetch("/api/DonorDashboard/GetProjects", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.success) {
          console.log("availabel projects", data);
          setProjects(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getProjects();
  }, []);

  const handleProjectClick = (projectId) => {
    navigate(`/donate/${projectId}`);
  };

  if (loading) {
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
                  <span className="tableTitle">Available Projects</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardBody>
              <table className="table-responsive ">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Project Description</th>
                    <th>Project Budget</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.ProjectId}>
                      <td>{project.ProjectName}</td>
                      <td>{project.ProjectDescription}</td>
                      <td>$ {project.ProjectBudget}</td>

                      <td>
                        {project.ProjectStartDate
                          ? project.ProjectStartDate.substring(0, 10)
                          : ""}
                      </td>

                      <td>
                        {project.ProjectStartDate
                          ? project.ProjectEndDate.substring(0, 10)
                          : ""}
                      </td>
                      <td>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleProjectClick(project.ProjectId)}
                        >
                          Donate
                        </button>
                      </td>
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

export default DonorAvailableProjects;
