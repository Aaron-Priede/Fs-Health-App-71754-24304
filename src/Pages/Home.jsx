import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useSelector,useDispatch } from 'react-redux';
import { addId } from '../Redux/slice';

export default function Home() {

const email = useSelector((state) => state.slice.email);
const password = useSelector((state) => state.slice.password);
// const id = useSelector((state) => state.id);
console.log(email);
console.log(password);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState(null);
  let getData = async () => { 
    let result=await fetch("http://localhost:5188/api/ServiceListing/");
    let data=await result.json();
    return data;
  }
  
  useEffect(()=>{
    getData().then((data)=>{
      console.log(data);
      setDoctors(data);
    })

  },[])


  // Sample data for doctors (this would typically come from a database or API)


  const handleViewDetails = (id) => {
    
    dispatch(addId({id:id}));
    navigate("/User/doctor/");

  };

  return (
    <div className="show-doctors-container" style={{marginTop:"35vh",
      background:"transparent"
    }}>
      <h2>Availability</h2>
      <div className="doctor-tiles">
      {doctors &&
  doctors
    .filter((doctor) => doctor.availability === true && doctor.confirmation!==true) // Filter doctors with availability set to true
    .map((doctor) => (
      <div key={doctor.id} className="doctor-tile" style={{marginTop:"0",
        background:"lightgreen"

      }}>
        <div className="doctor-info">
          <h3>{doctor.name}</h3>
          <p>
            <strong>Description:</strong> {doctor.description || "no servicecare provider"}
          </p>
          <p>
            <strong>Location:</strong> {doctor.location || "location not found"}
          </p>
          <p>
            <strong>Price:</strong> {doctor.charges || "charges not found"}
          </p>
        </div>
        <div className="doctor-actions">
          <button
            className="view-details-button"
            onClick={() => handleViewDetails(doctor.id)}
          >
            View Details
          </button>
        </div>
      </div>
    ))}
      </div>
    </div>
  );
}