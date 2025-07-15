import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Login } from "./Components/Login.tsx";
import { Unauthorized } from "./Components/Unauthorized.tsx";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext.tsx";
import { Dashboard } from "./Components/Dashboard.tsx";
import { WeeklySchedule } from "./Components/WeekSchedule.tsx";
import { EditUser } from "./Components/EditUser.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "font-awesome/css/font-awesome.min.css";

//import Header from "./Header.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Unauthorized" element={<Unauthorized />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Schedule" element={<WeeklySchedule />} />
          <Route path="/Edit" element={<EditUser />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
