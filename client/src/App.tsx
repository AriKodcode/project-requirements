import { Route, Routes } from "react-router-dom";
import AgentDashboard from "./pages/AgentDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import NewReportPage from "./pages/NewReportPage";
import MyReportsPage from "./pages/MyReportsPage";
import CsvUploadPage from "./pages/CsvUploadPage";
import GetReports from "./components/getReports";
import GetReportsById from "./components/GetReportsById";
import AdminUsersPage from "./pages/AdminUsersPage";
import NewUser from "./components/NewUser";
import GetUsers from "./components/GetUsers";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin";
import ProtectedRouteAgent from "./components/ProtectedRouteAgent";

export default function App() {
  return (
    <div className="app">
      <div className="header">
        <img
          className="img"
          src="https://upload.wikimedia.org/wikipedia/commons/6/68/AmanLogo.svg"
          alt="amanLogo"
        />
        <h1 className="name">YORE YORE</h1>
      </div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route element={<ProtectedRouteAdmin />}>
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/dashboard/newreport" element={<NewReportPage />} />
          <Route
            path="admin/dashboard/newreport/csv"
            element={<CsvUploadPage />}
          />
          <Route path="admin/dashboard/reports" element={<MyReportsPage />}>
            <Route index element={<GetReports />} />
            <Route path="id" element={<GetReportsById />} />
          </Route>
          <Route path="admin/dashboard/users" element={<AdminUsersPage />}>
            <Route index element={<GetUsers />} />
            <Route path="create" element={<NewUser />} />
          </Route>
        </Route>
        <Route element={<ProtectedRouteAgent />}>
          <Route path="agent/dashboard" element={<AgentDashboard />} />
          <Route path="agent/dashboard/newreport" element={<NewReportPage />} />
          <Route
            path="agent/dashboard/newreport/csv"
            element={<CsvUploadPage />}
          />
          <Route path="agent/dashboard/reports" element={<MyReportsPage />}>
            <Route index element={<GetReports />} />
            <Route path="id" element={<GetReportsById />} />
          </Route>
        </Route>
      </Routes>
      <div className="footer">
        <p>© Kodcode Unit</p>
      </div>
    </div>
  );
}
