import axios, { AxiosError } from "axios";
import { useEffect, useState, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import "../css/GetUsers.css";
interface User {
  id: string;
  agentCode: string;
  fullName: string;
  agentPassword: string;
  role: string;
  createAt: string;
}
export default function GetUsers(): JSX.Element {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  async function fetchUsers() {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get<{ users: User[] }>(
        "http://localhost:3000/admin/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(res.data.users);
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      setError(error.response?.data.error || "filed to fetch users");
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);
  function back() {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    navigate(`/${user.role}/dashboard`);
  }
  return (
    <div>
      <button className="back" onClick={back}>
        Back
      </button>
      <h1 className="users-logo">Users</h1>
      <table className="users">
        <thead>
          <tr>
            <th>ID</th>
            <th>AGENT CODE</th>
            <th>FULL NAME</th>
            <th>PASSWORD</th>
            <th>ROLE</th>
            <th>CREATE AT</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.agentCode}</td>
              <td>{user.fullName}</td>
              <td>{user.agentPassword}</td>
              <td>{user.role}</td>
              <td>{user.createAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
