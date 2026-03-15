import { useNavigate } from "react-router-dom";

export default function AdminDash() {
  const navigate = useNavigate();
  function moveToNewReport() {
    navigate("/admin/dashboard/newreport");
  }
  function moveToNewReportByCSV() {
    navigate("/admin/dashboard/newreport/csv");
  }
  function moveToGetReports() {
    navigate("/admin/dashboard/reports");
  }
  function moveToReportById() {
    navigate("/admin/dashboard/reports/id");
  }
  function moveToCreateUser() {
    navigate("/admin/dashboard/users/create");
  }
  function moveToGetUsers() {
    navigate("/admin/dashboard/users");
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
      <h1 className="name1">Hello Admin</h1>
      <div className="buttons">
        <button className="bth" onClick={moveToNewReport}>
          New Report
        </button>
        <button className="bth" onClick={moveToNewReportByCSV}>
          New Report by CSV
        </button>
        <button className="bth" onClick={moveToGetReports}>
          Get Reports
        </button>
        <button className="bth" onClick={moveToReportById}>
          Get Reports by ID
        </button>
        <button className="bth" onClick={moveToCreateUser}>
          Create User
        </button>
        <button className="bth" onClick={moveToGetUsers}>
          Get Users
        </button>
      </div>
    </div>
  );
}
