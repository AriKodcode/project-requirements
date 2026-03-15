import axios, { AxiosError } from "axios";
import React, { useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import "../css/NewUser.css";
interface User {
  agentCode: string;
  fullName: string;
  role: string;
  password?: string;
}
interface resReport {
  id: string;
  agentCode: string;
  fullName: string;
  role: string;
  initialPasswordHint: string;
}
export default function NewUser(): JSX.Element {
  const navigate = useNavigate();
  const [agentCode, setAgentCode] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [seccess, setSeccess] = useState<string | any>("");
  async function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSeccess("");
    try {
      const user: User = {
        agentCode,
        fullName,
        role,
        password,
      };
      const token = localStorage.getItem("token");
      const res = await axios.post<resReport>(
        "http://localhost:3000/admin/users",
        user,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setSeccess("user created");
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
    <div className="new-user">
      <button className="back" onClick={back}>
        Back
      </button>
      <h1 className="logo">New User</h1>
      <form className="create-user" onSubmit={handleSubmit}>
        <label htmlFor="agent-code">Agent Code</label>
        <input
          type="text"
          id="agent-code"
          onChange={(e) => setAgentCode(e.target.value)}
        />
        <label htmlFor="full-name">Full Name</label>
        <input
          type="text"
          id="full-name"
          onChange={(e) => setFullName(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          placeholder="optional"
          type="text"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="role">Role</label>
        <select name="role" id="role" onChange={(e) => setRole(e.target.value)}>
          <option value="admin">Admin</option>
          <option value="agent">Agent</option>
        </select>
        <button className="bth" type="submit">
          Create User
        </button>
      </form>
      {seccess && <div>{seccess}</div>}
      {error && <div>{error}</div>}
    </div>
  );
}
