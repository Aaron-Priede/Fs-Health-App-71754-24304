import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function WritePrescription() {
  const location = useLocation();
  const navigate = useNavigate();
  const [prescription, setPrescription] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const id = location.state.id;

  const [formData, setFormData] = useState({
    medicationName: "",
    dosage: "",
    instruction: "",
    issueDate: "",
    expiryDate: "",
    patientName: "",
    status: "pending",
    doctorName: "",
    id: 1,
  });

  const method1 = async (id) => {
    // e.preventDefault();
    let result = await fetch("http://localhost:5188/api/Medication/" + id);
    let resp = await result.json();
    return resp;
  };

  useEffect(() => {
    console.log(id);

    method1(id).then((data4) => {
      console.log(data4);
      setFormData(data4);
    });
  }, []);
  const submission = async () => {
    try {
      const response = await fetch(
        `http://localhost:5188/api/Medication/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to update. Status: ${response.status}`);
      }

      // ✅ Fix: Check if there is any content before parsing
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      alert("Successfully updated the medication!");
      return data;
    } catch (error) {
      console.error("Error updating medication:", error);
      alert("Something went wrong during the update.");
      return null;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form:", formData);
    submission().then((result) => {
      if (result) {
        console.log("Updated data:", result);
        navigate("/Doctor")
      }
    });
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" 
        ,marginTop: "10vh",
    }}>
      <h2
        style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}
      >
        Prescription Details
      </h2>

      {/* Medication Form */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "32px",
          border: "1px solid #ddd",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h3 style={{ fontSize: "20px", marginBottom: "16px" }}>
          Add Medication
        </h3>

        <div style={{ marginBottom: "10px" }}>
          <label>Medication Name:</label>
          <br />
          <input
            type="text"
            name="medicationName"
            value={formData.medicationName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Dosage:</label>
          <br />
          <input
            type="text"
            name="dosage"
            value={formData.dosage}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Instruction:</label>
          <br />
          <textarea
            name="instruction"
            value={formData.instruction}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Issue Date:</label>
          <br />
          <input
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            required
            style={{ padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Expiry Date:</label>
          <br />
          <input
            type="date"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            required
            style={{ padding: "8px" }}
            min={formData.issueDate}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Patient Name:</label>
          <br />
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
            disabled
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Status:</label>
          <br />
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={{ padding: "8px" }}
          >
            <option value="unfinished">unfinished</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Save Medication
        </button>
      </form>
    </div>
  );
}
