import "../css/Login.css";

import { useState, type JSX } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
interface SendUser {
  agentCode: string;
  password: string;
}
interface ResUser {
  token: string;
  user: {
    id: string;
    agentCode: string;
    fullName: string;
    role: "agent" | "admin";
  };
}
export default function Login(): JSX.Element {
  const [agebtCode, setAgentCode] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  async function hendleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const user: SendUser = {
        agentCode: agebtCode,
        password: password,
      };
      const res = await axios.post<ResUser>(
        "http://localhost:3000/api/auth/login",
        user
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      if (res.data.user.role === "agent") {
        navigate("/agent/dashboard");
      } else if (res.data.user.role === "admin") {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      setError(error.response?.data.error || "login field");
    }
  }
  return (
    <div className="login">
      <h1 className="logo">Login</h1>

      <form className="login-box" onSubmit={hendleSubmit}>
        <label className="label" id="AgentCode">
          AgentCode
        </label>
        <input
          className="in"
          type="text"
          placeholder="AgentCode"
          id="AgentCode"
          name="AgentCode"
          onChange={(e) => setAgentCode(e.target.value)}
        />
        <label className="label" id="password">
          Password
        </label>
        <input
          className="in"
          type="text"
          name="password"
          id="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="sub" type="submit">
          Login
        </button>
      </form>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
