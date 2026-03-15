import axios, { AxiosError } from "axios";
import React, { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import "../css/GetReports.css";
interface Reports {
  id: string;
  userId: string;
  category: string;
  urgency: string;
  message: string;
  imgPath: string;
  sourceType: string;
  createAt: string;
}
export default function GetReports(): JSX.Element {
  const [reports, setReports] = useState<Reports[]>([]);
  const [agentCode, setAgentCode] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [urgency, setUrgency] = useState<string>("");
  const [admin, setAdmin] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [seccess, setSeccess] = useState<string | any>("");

  const navigate = useNavigate();
  async function fetchReports(params?: {
    agentCode?: string;
    category?: string;
    urgency?: string;
  }) {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get<{ reports: Reports[] }>(
        `http://localhost:3000/reports`,
        {
          params,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReports(res.data.reports);
      setSeccess("seccess");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      setError(error.response?.data.error || "not found reports");
    }
  }
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role === "admin") {
      setAdmin(true);
    } else {
      fetchReports();
    }
  }, []);
  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSeccess("");
    const params: {
      agentCode?: string;
      category?: string;
      urgency?: string;
    } = {};
    if (agentCode) {
      params.agentCode = agentCode;
    }
    if (category) {
      params.category = category;
    }
    if (urgency) {
      params.urgency = urgency;
    }
    fetchReports(params);
  }
  function back() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role === "agent") {
      navigate("/agent/dashboard");
    } else {
      navigate("/admin/dashboard");
    }
  }

  return (
    <div className="get-reports">
      <button className="back" onClick={back}>
        Back
      </button>
      {admin && (
        <form className="query" onSubmit={handleSubmit}>
          <label htmlFor="report-agent-code" id="report-agent-code-label">
            Agent Code
          </label>
          <input
            type="text"
            id="report-agent-code"
            name="agentCode"
            onChange={(e) => setAgentCode(e.target.value)}
          />
          <label htmlFor="category-report" id="category-report-label">
            Category
          </label>
          <select
            id="category-report"
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            <option value="intelligence">Intelligence</option>
            <option value="logistics">Logistics</option>
            <option value="alert">Alert</option>
          </select>
          <label htmlFor="urgency-report" id="urgency-report-label">
            Urgency
          </label>
          <select
            name="urgency"
            id="urgency-report"
            onChange={(e) => setUrgency(e.target.value)}
          >
            <option value="">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button className="submit-report" type="submit">
            Search
          </button>
        </form>
      )}
      <table className="reports-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>USER ID</th>
            <th>CATEGORY</th>
            <th>URGENCY</th>
            <th>MESSAGE</th>
            <th>IMAGE PATH</th>
            <th>SOURCE TYPE</th>
            <th>CREATE AT</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.userId}</td>
              <td>{report.category}</td>
              <td>{report.urgency}</td>
              <td>{report.message}</td>
              <td>
                <img src={report.imgPath} alt="image" />
              </td>
              <td>{report.sourceType}</td>
              <td>{report.createAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {seccess && <div>{seccess}</div>}
      {error && <div>{error}</div>}
    </div>
  );
}
