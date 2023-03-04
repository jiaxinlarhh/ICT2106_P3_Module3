import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function DonateNow() {
  const { id } = useParams(); // Get the project ID from the URL params
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState(0);
  const [donationConstraint, setDonationConstraint] = useState("");

  useEffect(() => {
    async function getProjects() {
      try {
        const response = await fetch("/api/Project/" + id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (data.success) {
          console.log(data);
          setProject(data.data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getProjects();
  }, [id]);

  const handleDonateNow = () => {
    // get donor ID

    // get project ID
    console.log("project ID " + id);
    // get donation amount
    console.log("Donation Amount " + donationAmount);
    // get donation constraint
    console.log("Donation Constraint " + donationConstraint);
    // send to API
  };

  if (!project) {
    return <p>Loading...</p>;
  }

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

      <div className="row justify-content-center">
        <div className="col-md-6 ">
          <form>
            <div className="form-group row mb-3">
              <label className="col-sm-3 col-form-label">
                Selected Project
              </label>
              <div className="col-sm-9">
                <p className="form-control">{project.ProjectName}</p>
              </div>
            </div>
            <div className="form-group row mb-3">
              <label className="col-sm-3 col-form-label">
                Project Description
              </label>
              <div className="col-sm-9">
                <p className="form-control">{project.ProjectDescription}</p>
              </div>
            </div>
            <div className="form-group row mb-3">
              <label className="col-sm-3 col-form-label">Donation Amount</label>
              <div className="col-sm-9">
                <input
                  type="number"
                  value={donationAmount}
                  className="form-control"
                  onChange={(e) => setDonationAmount(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row mb-3">
              <label className="col-sm-3 col-form-label">
                Donation Constraint
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  value={donationConstraint}
                  className="form-control"
                  onChange={(e) => setDonationConstraint(e.target.value)}
                />
              </div>
            </div>
            <div className="d-flex justify-content-center mt-5">
              <button className="btn btn-primary" onClick={handleDonateNow}>
                Donate Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DonateNow;
