import React from "react";
import { Route, Routes } from "react-router";
import SignUp from "../Pages/SignUp";
import LayoutsWithHeaderFooter from "../components/LayoutsWithHeaderFooter";
import Home from "../Pages/Home";
import Signup2 from "../Pages/Signup2";
import ForgetPassword from "../Pages/forget_password";
import Projects from "../Pages/Projects";
import AddProject from "../Pages/AddProject";
import EditProfileForm from "../Pages/EditProfileForm";
import EditExtraInfoForm from "../Pages/EditExtraInfoForm";
import ProfilePage from "../Pages/ProfilePage";
import Search from "../Pages/Search";
import ProjectDetail from "../Pages/ProjectDetail"; 

function RouteList() {
  return (
    <>
      <Routes>
        <Route element={<LayoutsWithHeaderFooter />}>
          <Route path="/home" element={<Home />} />
          <Route path="/addproject" element={<AddProject />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/forget_password" element={<ForgetPassword />} />
          <Route path="/search" element={<Search />} />
          <Route path="/project/:id" element={<ProjectDetail />} /> 
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfileForm />} />
          <Route path="/edit-extra-info" element={<EditExtraInfoForm />} />
        </Route>
        <Route path="/" element={<Signup2 />} />
      </Routes>
    </>
  );
}

export default RouteList;
