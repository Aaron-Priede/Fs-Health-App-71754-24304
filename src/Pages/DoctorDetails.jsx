import React,{useEffect,useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DoctorDetails.css';
import { useSelector } from 'react-redux';
export default function DoctorDetails() {
  // const { id } = useParams(); // Get the doctor ID from the URL
  const navigate = useNavigate();
  const id=useSelector((state)=>state.slice.id);
  const email = useSelector((state) => state.slice.email);

  console.log(id);
  console.log(email);
  const [doctor, setDoctor] = useState(null);
  const getData = async () => { 
    let result=await fetch("http://localhost:5188/api/ServiceListing/"+id+"/");
    let data=await result.json();
    return data;
  }
  useEffect(()=>{
    getData().then((data)=>{
      console.log("in details section");
      console.log(data);
      setDoctor(data);
    })

  },[])


  // Sample data for doctors (this would typically come from a database or API)

const method=async()=>{
 let result=await fetch("http://localhost:5188/api/ServiceListing/"+id+"/",{
  method:"PUT",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify(
    doctor
  )
 }) 
}


  const handleBookNow = () => {
    doctor.booking=true;
    doctor.availability=false;
    doctor.customer=email;
    console.log(doctor);
    console.log("in book now section");
    method().then((data)=>{
      console.log(data);
    
      

    alert(`You have successfully booked an appointment with ${doctor.name}`);
    navigate('/User/home'); // Redirect to the home page after booking

    })


  };

  return (
    <div className="doctor-details-container">
      <h1 style={
        {
          color:"black"
        }
      }>Doctor</h1>
    {doctor? 
   <div>  <h2> {doctor.name}</h2>
      <p><strong>Description:</strong> {doctor.description || "description undefined"}</p>
      <p><strong>Location:</strong> {doctor.location || "location not defined"}</p>
      <p><strong>Price:</strong> {doctor.charges|| "charges not given"}</p>
      <p><strong>Contact:</strong> {doctor.contact || "contact not given"}</p>
      <p><strong>Availability:</strong> {doctor.availability || "availabity not known" }</p>
   </div>:null  
     }
      {/*
    
      <p><strong>Availability:</strong> {doctor.availability || "availabity not known" }</p>
      */}
     
      <button className="book-now-button" onClick={handleBookNow}>
        Book Now
      </button>
    </div>
  );
}