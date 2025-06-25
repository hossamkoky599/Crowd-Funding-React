import React, { useState } from "react";
import * as Components from "../assets/components.js";
import "../assets/css/signup2.css";
import { Link } from "react-router-dom";
import axios from "axios";
import instance from '../apis/config';
import { useNavigate } from "react-router-dom";

function Signup2() {
  const [signIn, toggle] = React.useState(true);  ///Switch Button
  // //// Sign UP Components
   const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    // /// Handle profile
    const handleFileChange = (e) => {
        setProfileImage(e.target.files[0]);
    };
  const handleSignup = async(e) => {
    e.preventDefault();
    if (password != confirmPassword){ alert("Passwords do not match!"); return;}
        const formData = new FormData();
        formData.append('first_name',firstName);
        formData.append('last_name',lastName);
        formData.append('email',email);
        formData.append('password',password);
        formData.append('confirm_password',confirmPassword);
        formData.append('mobile_phone',phone);
        if (profileImage) formData.append('profile_picture',profileImage)
        try{
            const response = await instance.post('/register/',formData,{headers:{'Content-Type':'multipart/form-data'}});
            console.log('Login succussfully',response.data);
            console.log({ firstName, lastName, email, password, confirmPassword, phone, profileImage });
            alert(`Signup successful ,Check ${email} and activate Link`);
        } 
        catch(error){
            if(error.response){
                console.error("Signup failed:", error.response.data)
                alert("Signup error: " + JSON.stringify(error.response.data));
            }else {
                console.error("Network error:", error.message);
            }
        }
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setProfileImage("");
        setPhone("");
        setConfirmPassword("");
  };
  // ////// End Of Sign Up
  // ////// Login components 
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await instance.post("/login/", {
        email: loginEmail,
        password: loginPassword,
      });

      console.log("Login successful:", response.data);
      alert("Login successful!");

      // حفظ التوكن أو البيانات إن وجدت
      localStorage.setItem("token", response.data.token);

      navigate("/home");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(
        "Login failed: " +
          (error.response?.data?.message || "Check your credentials")
      );
    }
  };
  // ///// End Of Login 

  return (
  
     <Components.PageWrapper>
         <Components.Container>
        <Components.SignUpContainer signingIn={signIn}>
          <Components.Form onSubmit={handleSignup}>
            <Components.Title>Create Account</Components.Title>
                <Components.Input type="text" placeholder="First Name" name="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                <Components.Input type="text" placeholder="Last Name" name="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required />
                <Components.Input type="email" placeholder="Email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
                <Components.Input type="password" placeholder="Password" name="password" value={password} onChange={e => setPassword(e.target.value)} required />
                <Components.Input type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                <Components.Input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} name="phone" />
                <Components.Input type="file" accept="image/*" name="profileImage" onChange={handleFileChange} />
            <Components.Button type="submit">Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>

        <Components.SignInContainer signingIn={signIn}>
          <Components.Form onSubmit={handleLogin}>
            <Components.Title>Login</Components.Title>
            <Components.Input
              type="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <Components.Input
              type="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
            {/* <Link to="/forget_password">Forgot your password?</Link> */}
            <Components.Anchor href="/forget_password">Forgot your password?</Components.Anchor>
            <Components.Button type="submit">Login</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signingIn={signIn}>
          <Components.Overlay signingIn={signIn}>
            <Components.LeftOverlayPanel signingIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Login
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signingIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start your journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </Components.PageWrapper>
   
  );
}

export default Signup2;
