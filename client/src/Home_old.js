import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.svg"; // uses your existing logo file

function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={logo} alt="RUHousing Logo" style={styles.logo} />

        <h1 style={styles.heading}>Welcome to RUHousing</h1>
        <p style={styles.subtext}>Find student housing with ease.</p>

        <div style={styles.buttonGroup}>
          <Link to="/new-user">
            <button style={styles.primaryBtn}>Create Account</button>
          </Link>
          <Link to="/login">
            <button style={styles.primaryBtn}>Login</button>
          </Link>
          <Link to="/home">
            <button style={styles.secondaryBtn}>Continue as Guest</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    backgroundColor: "#f4f6f9",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "16px",
    padding: "40px",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    width: "90%",
    maxWidth: "420px",
  },
  logo: {
    width: "120px",
    height: "120px",
    marginBottom: "20px",
  },
  heading: {
    fontSize: "28px",
    marginBottom: "10px",
    color: "#333",
  },
  subtext: {
    fontSize: "16px",
    color: "#666",
    marginBottom: "30px",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  primaryBtn: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    backgroundColor: "#00468b",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    backgroundColor: "#e4e4e4",
    color: "#333",
    border: "none",
    cursor: "pointer",
  },
};

export default Home;
