import React from "react";
import { Routes, Route } from "react-router-dom";
import MyLayout from "./components/configuration/MyLayout";
import MyLayout2 from "./components/configuration/MyLayout2";
import MyLayout3 from "./components/configuration/MyLayout3";
import MyParticipant from "./components/configuration/MyLayoutParticipant";
import MylayoutPubForm from "./components/configuration/MyLayoutPubForm";
import Landing from "./components/Landing";
import Login from "./components/Login";
 
export default function Router() {
  return (
    <div>
      <Routes>
        
        <Route path="/" element={< Landing/>} />
        <Route path="/login" element={< Login/>} />
        <Route path="/mail-template" element={< MyLayout/>} />
        <Route path="/email-account" element={< MyLayout2/>} />
        <Route path="/publisher" element={< MyLayout3/>} />
        <Route path="/publisher/form" element={< MylayoutPubForm/>} />
        <Route path="/publisher/form/:id" element={< MyParticipant/>} />
      </Routes>
    </div>
  );
}