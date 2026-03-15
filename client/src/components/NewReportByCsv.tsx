import axios, { AxiosError } from "axios";
import React, { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import "../css/NewReportByCsv.css";

export default function NewReportByCsv(): JSX.Element {
  const [seccess, setSeccess] = useState<string | boolean>(false);
  const [csv, setCsv] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  async function sendCsv(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setSeccess(false);
      const token = localStorage.getItem("token");
      const formData = new FormData();
      if (csv) {
        formData.append("csv", csv);
      }
      const res = await axios.post(
        "http://localhost:3000/reports/csv",
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSeccess(res.data.reports);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      setError(error.response?.data.error || "field to send csv file");
    }
  }
  function back() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    navigate(`/${user.role}/dashboard`);
  }
  return (
    <div className="new-report-by-csv">
      <button className="back" onClick={back}>
        Back
      </button>
      <form className="report-csv" onSubmit={sendCsv}>
        <label className="csv" id="csv">
          load csv file
        </label>
        <input
          className="csv"
          type="file"
          id="csv"
          onChange={(
            e: React.ChangeEvent<HTMLInputElement, HTMLIFrameElement>
          ) => {
            if (e.target.files) {
              setCsv(e.target.files[0]);
            }
          }}
        />
        <button className="bth3" type="submit">
          Send CSV
        </button>
      </form>
      {error && <div>{error}</div>}
      {/* {seccess && (
        <div>
          {Array.isArray(seccess) &&
            seccess.map((report: any, index: number) => {
              return (
                <div key={index}>
                  <p>{report.id}</p>
                  <p>{report.message}</p>
                </div>
              );
            })}
        </div>
      )} */}
    </div>
  );
}
