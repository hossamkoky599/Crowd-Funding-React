import React, { useState, useEffect } from "react";
import axios from "axios";
import instance from '../apis/config';
import { useNavigate } from "react-router-dom";

function EditExtraInfoForm() {
  const [info, setInfo] = useState({
    country: "",
    facebook_account: "",
    birthdate: "",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const authHeaders = token ? { Authorization: `Token ${token}` } : {};

  useEffect(() => {
    instance.get("/extra-info/", { headers: authHeaders })
      .then(res => setInfo(res.data))
      .catch(() => setError("Failed to load extra info."));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo(prev => ({ ...prev, [name]: value }));
  };

  const validateFacebookURL = (url) => {
    if (!url) return true;
    try {
      const parsed = new URL(url);
      return parsed.hostname.includes("facebook.com");
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!validateFacebookURL(info.facebook_account)) {
      setError("Please enter a valid Facebook URL.");
      return;
    }

    setSubmitting(true);
    instance.put("/extra-info/", info, { headers: authHeaders })
      .then(() => {
        alert("Extra info updated!");
        navigate("/profile");
      })
      .catch(() => setError("Failed to update extra info."))
      .finally(() => setSubmitting(false));
  };

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">Edit Extra Info</h2>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="country"
          placeholder="Country"
          value={info.country}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <input
          name="facebook_account"
          placeholder="Facebook Account URL"
          value={info.facebook_account}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <input
          name="birthdate"
          type="date"
          value={info.birthdate || ""}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className={`w-full sm:w-auto px-6 py-2 rounded-md font-medium text-white transition-all duration-200
              ${submitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-primary hover:bg-pink-600 focus:ring-2 focus:ring-pink-300 focus:outline-none"}
            `}
          disabled={submitting}
          >
          {submitting ? "Updating..." : "Update Extra Info"}
        </button>
      </form>
    </div>
  );
}

export default EditExtraInfoForm;
