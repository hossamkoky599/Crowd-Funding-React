import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Image, NavDropdown } from "react-bootstrap";
import axios from "axios";
import instance from '../apis/config';
import * as Components from "../assets/components.js";
import "../assets/css/header.css"; // Custom styles here if needed

export default function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    instance
      .get("/profile/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch((err) => console.error("User fetch failed", err));
  }, [navigate, token]);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
       if (token) {
        await instance.post('/logout/', {}, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <Navbar
  expand="lg"
  className="px-4 py-2 custom-navbar"
  style={{
    background: "linear-gradient(to right, #ff4b2b, #ff416c)",
    color: "#fff",
  }}
>
  <Container fluid>
    <Navbar.Brand as={Link} to="/home" className="text-white fw-bold fs-3">
      🎯 CrowdFund
    </Navbar.Brand>

    <Navbar.Toggle aria-controls="navbar-nav" className="bg-white" />
    <Navbar.Collapse id="navbar-nav" className="justify-content-between">
      <Nav className="me-auto">
        <Nav.Link as={Link} to="/home" className="text-white mx-3 nav-link-custom">Home</Nav.Link>
        <Nav.Link as={Link} to="/projects" className="text-white mx-3 nav-link-custom">Projects</Nav.Link>
      </Nav>

      <Nav className="align-items-center">
        {user ? (
          <NavDropdown
            title={
              <div className="d-flex align-items-center gap-2">
                <Components.ProfileWrapper>
                  <Components.Avatar
                    src={user.profile_picture ? `https://hossam599.pythonanywhere.com${user.profile_picture}` : "/default-profile.png"}
                    alt="Profile"
                  />
                </Components.ProfileWrapper>
                <span className="text-white fw-semibold">{user.first_name}</span>
              </div>
            }
            id="user-nav-dropdown"
            align="end"
            menuVariant="dark"
            className="custom-dropdown"
          >
            <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={handleLogout} className="text-danger">
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Nav.Link as={Link} to="/" className="text-white nav-link-custom">Login</Nav.Link>
        )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
  );
}
