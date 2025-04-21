import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addCredentials } from "../Redux/slice.js";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("http://localhost:5188/api/UserProfile/");
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        const userData = await response.json();
        setData(userData);
        console.log("User profiles loaded:", userData);
      } catch (err) {
        console.error("Error fetching user profiles:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfiles();
  }, []);

  const handleProviderAccess = (user) => {
    dispatch(addCredentials({ email: user.email, password: user.password }));
    navigate("/Doctor");
  };

  const handleLogout = () => {
    alert("You have been logged out!");
    navigate("/");
  };

  const serviceProviders = data.filter(user => user.serviceProvider === true);

  return (
    <div style={{
      fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
      padding: "32px",
      maxWidth: "1300px",
      margin: "0 auto",
      backgroundColor: "#f8fafc",
      minHeight: "100vh",
      color: "#334155"
    }}>
      {/* Header */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "36px",
        padding: "20px 30px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
      }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ fontSize: "24px", marginRight: "16px", color: "#3b82f6" }}>🏥</div>
          <h1 style={{
            margin: "0",
            fontSize: "28px",
            fontWeight: "700",
            background: "linear-gradient(135deg, #3b82f6, #1e40af)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-0.5px"
          }}>Hospital Admin Dashboard</h1>
        </div>
        <button
          onClick={handleLogout}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#dc2626"}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#ef4444"}
          style={{
            backgroundColor: "#ef4444",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "10px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            fontWeight: "600",
            fontSize: "15px",
            transition: "all 0.2s ease",
            boxShadow: "0 2px 5px rgba(239, 68, 68, 0.2)"
          }}>
          <span style={{ marginRight: "10px" }}>⏻</span> Logout
        </button>
      </header>

      {/* Welcome */}
      <section style={{
        marginBottom: "36px",
        padding: "24px 30px",
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
        display: "flex",
        alignItems: "flex-start",
        borderLeft: "5px solid #3b82f6"
      }}>
        <div style={{ fontSize: "28px", marginRight: "20px", marginTop: "5px" }}>ℹ️</div>
        <div>
          <h2 style={{
            margin: "0 0 12px 0",
            fontSize: "24px",
            fontWeight: "600",
            color: "#1e293b"
          }}>Welcome, Administrator</h2>
          <p style={{
            margin: "0",
            lineHeight: "1.7",
            fontSize: "16px",
            color: "#64748b"
          }}>
            Manage healthcare providers and ensure the best medical services for all patients.
            Use this dashboard to oversee staff credentials and system access.
          </p>
        </div>
      </section>

      {/* Loader/Error */}
      {isLoading && (
        <div style={{
          padding: "40px 0",
          textAlign: "center",
          fontSize: "18px",
          color: "#3b82f6"
        }}>Loading healthcare providers...</div>
      )}

      {error && (
        <div style={{
          padding: "20px",
          backgroundColor: "#fee2e2",
          borderRadius: "10px",
          color: "#b91c1c",
          marginBottom: "24px",
          textAlign: "center",
          border: "1px solid #fecaca"
        }}>Error: {error}</div>
      )}

      {/* Providers */}
      {!isLoading && !error && (
        <section style={{
          padding: "30px",
          backgroundColor: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)"
        }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
            paddingBottom: "15px",
            borderBottom: "1px solid #e2e8f0"
          }}>
            <h2 style={{
              fontSize: "22px",
              fontWeight: "600",
              color: "#1e293b",
              margin: "0"
            }}>Healthcare Providers</h2>
            <span style={{
              backgroundColor: "#e0f2fe",
              color: "#0369a1",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "14px",
              fontWeight: "600"
            }}>{serviceProviders.length} Providers</span>
          </div>

          {serviceProviders.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "40px 0",
              color: "#64748b"
            }}>No healthcare providers found.</div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "30px"
            }}>
              {serviceProviders.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleProviderAccess(user)}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "translateY(-5px)";
                    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.12)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.08)";
                  }}
                  style={{
                    backgroundColor: "#ffffff",
                    borderRadius: "14px",
                    overflow: "hidden",
                    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                    cursor: "pointer",
                    border: "1px solid #e2e8f0"
                  }}>
                  <div style={{
                    padding: "25px 20px",
                    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                    color: "#ffffff",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}>
                    <div style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: "#ffffff",
                      color: "#2563eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      fontSize: "26px",
                      fontWeight: "bold",
                      marginBottom: "15px",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                    }}>{user.name.charAt(0)}</div>
                    <h3 style={{
                      margin: "0",
                      fontSize: "20px",
                      fontWeight: "600"
                    }}>{user.name}</h3>
                  </div>
                  <div style={{ padding: "20px", borderBottom: "1px solid #e2e8f0" }}>
                    <div style={{ margin: "10px 0", fontSize: "14px", color: "#475569", display: "flex" }}>
                      <span style={{ fontWeight: "600", color: "#334155", width: "90px" }}>Email:</span>
                      <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{user.email}</span>
                    </div>
                    <div style={{ margin: "10px 0", fontSize: "14px", color: "#475569", display: "flex" }}>
                      <span style={{ fontWeight: "600", color: "#334155", width: "90px" }}>Username:</span>
                      <span>{user.username}</span>
                    </div>
                    <div style={{ margin: "10px 0", fontSize: "14px", color: "#475569", display: "flex" }}>
                      <span style={{ fontWeight: "600", color: "#334155", width: "90px" }}>Password:</span>
                      <span>{user.password}</span>
                    </div>
                  </div>
                  <div style={{
                    padding: "15px 20px",
                    textAlign: "center",
                    backgroundColor: "#f1f5f9",
                    fontSize: "14px",
                    color: "#475569"
                  }}>Click to Access</div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Dashboard;
