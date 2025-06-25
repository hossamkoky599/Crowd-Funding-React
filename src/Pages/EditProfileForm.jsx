import React, { useState } from "react";
import axios from "axios";
import instance from '../apis/config';
import { useNavigate } from "react-router-dom";

export default function EditProfileForm() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_phone: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.new_password && formData.new_password !== formData.confirm_password) {
      setError("New password and confirm password do not match.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("User is not authenticated.");
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== "") {
        data.append(key, value);
      }
    });

    if (file) data.append("profile_picture", file);

    try {
      setSubmitting(true);
      const response = await instance.patch("/update-profile/", data, {
        headers: {
          "Authorization": `Token ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
     if (err.response?.data) {
      const data = err.response.data;
      const messages = Object.entries(data)
      .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
      .join(' | ');
      setError(messages);
      } else {
        setError("Error updating profile");
      }
    } finally {
      console.log("Submitting form data:");
for (let [key, value] of data.entries()) {
  console.log(`${key}: ${value}`);
}
      setSubmitting(false);
      setFormData((prev) => ({
        ...prev,
        current_password: "",
        new_password: "",
        confirm_password: "",
      }));
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="first_name" placeholder="First Name" onChange={handleChange} />
      <input name="last_name" placeholder="Last Name" onChange={handleChange} />
      <input name="email" placeholder="Email" onChange={handleChange} />
      <input name="mobile_phone" placeholder="Mobile Phone" onChange={handleChange} />
      <input name="current_password" placeholder="Current Password" type="password" onChange={handleChange} />
      <input name="new_password" placeholder="New Password" type="password" onChange={handleChange} />
      <input name="confirm_password" placeholder="Confirm Password" type="password" onChange={handleChange} />
      <input type="file" onChange={handleFileChange} />
      
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" disabled={submitting}   className={`px-6 py-2 rounded-md text-white font-medium transition-all duration-200
    ${submitting
      ? 'bg-gray-400 cursor-not-allowed'
      : 'bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-purple-400 focus:outline-none'}
  `}>
        {submitting ? "Updating..." : "Update Profile"}
      </button>
    </form>
  );
}
