import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateAboutUs.css';
import { useSelector } from 'react-redux';

export default function UpdateAboutUs() {

  const email1 = useSelector((state) => state.slice.email);
  const password1 = useSelector((state) => state.slice.password);
  
  
  const[email,setEmail]=useState(email1);
  const[password,setPassword]=useState(password1);
    const navigate = useNavigate();
    const [data1,setData]=useState(null);
    const getData = async () => {
      const endpoint = `http://127.0.0.1:8000/api/users/?email=${email}&password=${password}`;
      let result=await fetch(endpoint);
      let data=await result.json();
      console.log(data);
      return data;
    }
  
    useEffect(()=>{
      getData().then((data)=>{
        console.log(data);
        setData(data);
        setFormData(data);

      })
  },[])
  
  




  // Pre-filled data (this would typically come from a database or API)
  const [formData, setFormData] = useState({
    name: "rice kha lo",
    username: 'dinesh ganga',
    id: '123 Main Street, Cityville',
    password: '123-456-7890',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const submissionData = async () => {
    let resp=await fetch(`http://127.0.0.1:8000/api/users/${data1.id}/`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
    let data=await resp.json();
    return data;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated Information:', formData);

    


    // alert('About Us Information Updated Successfully!');
    // Navigate back to the About Us page
    submissionData().then((data)=>{
      console.log(data);
      alert("Updated successfully")
      navigate('/service/about');
    })
  
  };

  return (
    <div className="update-about-us-container">
      <h2>Update About Us Information</h2>
      <form className="update-about-us-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">password</label>
          <input
            type="text"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password to change"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Enter your id to change"
            required
          />
        </div>
        <button type="submit" className="submit-button">Update Information</button>
      </form>
    </div>
  );
}