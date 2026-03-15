import { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import "../css/AgentDashboard.css";
export default function AgentDash(): JSX.Element {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const objUser = JSON.parse(user);
      setName(objUser.fullName);
    }
  }, []);
  function moveToNewReport() {
    navigate("/agent/dashboard/newreport");
  }
  function moveToNewReportByCSV() {
    navigate("/agent/dashboard/newreport/csv");
  }
  function moveToGetReports() {
    navigate("/agent/dashboard/reports");
  }
  function moveToReportById() {
    navigate("/agent/dashboard/reports/id");
  }
  function loginPage() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div className="agent-dashboard">
      <div className="dash-header">
        <button className="logout" onClick={loginPage}>
          Logout
        </button>
      </div>
      <h1 className="name1">Hello {name}</h1>
      <div className="buttons">
        <button className="bth" onClick={moveToNewReport}>
          New Report
        </button>
        <button className="bth" onClick={moveToNewReportByCSV}>
          New Report by CSV
        </button>
        <button className="bth" onClick={moveToGetReports}>
          Get reports
        </button>
        <button className="bth" onClick={moveToReportById}>
          Get reports by ID
        </button>
      </div>
    </div>
  );
}
