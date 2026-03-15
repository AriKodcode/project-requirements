import axios, { AxiosError } from "axios";
import React, { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import "../css/GetReportById.css";
interface Report {
  id: string;
  userId: string;
  category: string;
  urgency: string;
  message: string;
  imgPath: string;
  sourceType: string;
  createAt: string;
}
export default function GetReportsById(): JSX.Element {
  const navigate = useNavigate();
  const [idReport, setIdReport] = useState<string>("");
  const [report, setReport] = useState<Report | null>(null);
  const [succes, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:3000/reports/${idReport}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReport(res.data.report);
      setSuccess("success");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      setError(error.response?.data.error || "not found report!");
    }
  }
  function back() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    navigate(`/${user.role}/dashboard`);
  }

  return (
    <div>
      <button className="back" onClick={back}>
        Back
      </button>
      <form className="search-by-id" onSubmit={handleSubmit}>
        <label htmlFor="report-by-id">Enter ID</label>
        <input
          type="text"
          id="eport-by-id"
          placeholder="ID"
          onChange={(e) => setIdReport(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
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
          {report ? (
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
          ) : (
            <p>Enter ID</p>
          )}
        </tbody>
      </table>
      {succes && <div>{succes}</div>}
      {error && <div>{error}</div>}
    </div>
  );
}
