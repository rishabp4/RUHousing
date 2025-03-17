import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Changed URL to match the server's port
      const res = await axios.post("http://localhost:5001/login", { email, password });
      alert(res.data.message);

      // Store the token in localStorage upon successful login
      localStorage.setItem("token", res.data.token);

      // Optionally, you can redirect to another page after successful login
      // window.location.href = '/dashboard'; // Example: Redirect to dashboard

    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
