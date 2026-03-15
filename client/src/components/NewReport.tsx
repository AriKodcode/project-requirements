import axios, { AxiosError } from "axios";
import React, { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import "../css/NewReport.css";
interface Report {
  category: string;
  urgency: string;
  message: string;
}
interface resReport {
  id: string;
  userId: string;
  category: string;
  urgency: string;
  message: string;
  imgPath: string;
  sourceType: string;
  createAt: string;
}
export default function NewReport(): JSX.Element {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>("");
  const [urgency, setUrgency] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [seccess, setSeccess] = useState<string | any>("");
  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSeccess("");
    try {
      const report: Report = {
        category: category,
        urgency: urgency,
        message: message,
      };
      const token = localStorage.getItem("token");
      const formData = new FormData();
      if (image) {
        formData.append("image", image);
      }
      formData.append("report", JSON.stringify(report));
      const res = await axios.post<resReport>(
        "http://localhost:3000/reports",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSeccess("success to created new report ");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      setError(error.response?.data.error || "field send report!");
    }
  }
  function back() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    navigate(`/${user.role}/dashboard`);
  }

  return (
    <div className="new-report">
      <button className="back" onClick={back}>
        Back
      </button>
      <h1 className="logo">New Report</h1>
      <form className="report" onSubmit={handleSubmit}>
        <label className="label" id="category">
          Category
        </label>
        <select
          name="category"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="intelligence">Intelligence</option>
          <option value="logistics">Logistics</option>
          <option value="alert">Alert</option>
        </select>
        <label className="label" id="urgency">
          Urgency
        </label>
        <select
          name="urgency"
          id="urgency"
          onChange={(e) => setUrgency(e.target.value)}
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <label className="label" id="messgae">
          Message
        </label>
        <input
          type="text"
          id="message"
          placeholder="Your Message. "
          onChange={(e) => setMessage(e.target.value)}
        />
        <label className="label" id="image">
          Image
        </label>
        <input
          className="image"
          type="file"
          id="image"
          placeholder="chose image"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) {
              setImage(e.target.files[0]);
            }
          }}
        />
        <button className="bth2" type="submit">
          Send report
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      {seccess && <div className="seccess">{seccess}</div>}
    </div>
  );
}
