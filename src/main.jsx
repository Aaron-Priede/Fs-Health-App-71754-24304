import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Pages
import Login from "./Pages/Login.jsx";
import SignUp from "./Pages/SignUp.jsx";
import Layout1 from "./Layout/Layout1.jsx";
import Appointments from "./Pages/Appointments.jsx"; 
import Home from "./Pages/Home.jsx";
import ConfirmedAppointment from "./Pages/ConfirmedAppointment.jsx";

import DoctorDetails from "./Pages/DoctorDetails.jsx";
import CompleteBooking from "./Pages/CompletedBooking.jsx";
import BookedService from "./Pages/BookedService.jsx";
import Layout2 from "./Layout/Layout2.jsx";
import ShowService from "./Pages/ShowService.jsx";
import CreateListing from "./Pages/CreateListing.jsx";
import ShowRequest from "./Pages/ShowRequst.jsx";
import CompleteRequest from "./Pages/CompleteRequest.jsx";
import Admin from "./Pages/Admin.jsx";
import ShowPrescription from "./Pages/ShowPrescription.jsx";
import WritePrescription from "./Pages/WritePrescription.jsx";
import UnfinishedMedications from "./Pages/UnfinishedMedications.jsx";
import FinishedMedications from "./Pages/FinishedMedications.jsx";
import AuthSuccess from "./Pages/AuthSuccess.jsx";
import MedicationPolicy from "./Pages/MedicationPolicy.jsx";



// React Router
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";


// React redux
import { Provider } from "react-redux";
import store from "./Redux/store.js";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/User" element={<Layout1 />}>
            <Route path="home" element={<Home/>} />
            <Route path="appointments" element={<Appointments/>} />
            <Route path="confirmed" element={<ConfirmedAppointment/>} />
            <Route path="doctor" element={<DoctorDetails/>}/>
            <Route path="complete" element={<CompleteBooking/>}/>
            <Route path="booked" element={<BookedService/>}/>
            <Route path="unfinish" element={<UnfinishedMedications/>} />
            <Route path="finish" element={<FinishedMedications/>} />
           
            <Route path="medicationpolicy" element={<MedicationPolicy/>}/>
      </Route>

      <Route path="/Doctor" element={<Layout2/>}>
        <Route path="" element={<ShowService/>}/>
        <Route path="create" element={<CreateListing/>}/>
        <Route path="request" element={<ShowRequest/>}/>
        <Route path="complete" element={<CompleteRequest/>}/>
        <Route path="prescription" element={<ShowPrescription/>}/>
        <Route path="write" element={<WritePrescription/>}/>
     
      </Route>
      <Route path="/auth-success" element={<AuthSuccess />} />
      <Route path="/Admin" element={<Admin/>}/>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
