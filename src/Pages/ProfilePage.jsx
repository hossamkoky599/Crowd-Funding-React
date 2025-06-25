import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import instance from '../apis/config';
function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [extraInfo, setExtraInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [extraLoading, setExtraLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    instance
      .get("/profile/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setUserData(res.data))
      .catch(() => setError("Failed to load profile."))
      .finally(() => setLoading(false));

    instance
      .get("/extra-info/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => setExtraInfo(res.data))
      .catch(() => setExtraInfo(null))
      .finally(() => setExtraLoading(false));
  }, [navigate, token]);

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to permanently delete your account?");
    if (!confirmDelete) return;

    const password = prompt("Enter your password to confirm deletion:");
    if (!password?.trim()) {
      alert("Password is required to delete the account.");
      return;
    }

    try {
      await instance.post(
        "/delete-account/",
        { password },
        { headers: { Authorization: `Token ${token}` } }
      );
      alert("Account deleted successfully.");
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete account.");
    }
  };

  if (loading) return <div className="text-center mt-10 text-lg">Loading profile...</div>;
  if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;

  const {
    profile_picture,
    first_name,
    last_name,
    email,
    mobile_phone,
    projects = [],
    donations = [],
  } = userData;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gradient-to-b from-pink-500 to-purple-700 text-white p-6 flex flex-col items-center">
        <img
          src={profile_picture ? `https://hossam599.pythonanywhere.com${profile_picture}` : "/default-profile.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover mb-4"
        />
        <h2 className="text-xl font-bold mb-1">{first_name} {last_name}</h2>
        <p className="text-sm">{email}</p>
        <div className="flex gap-4 my-4">
          <i className="fab fa-twitter" />
          <i className="fab fa-facebook" />
          <i className="fab fa-instagram" />
        </div>
        <button onClick={() => navigate("/edit-profile")} className="bg-white text-purple-700 w-full py-2 rounded mb-2 font-semibold">Edit Profile</button>
        <button onClick={() => navigate("/edit-extra-info")} className="bg-white text-purple-700 w-full py-2 rounded mb-2 font-semibold">Edit Extra Info</button>
        <button onClick={() => navigate("/AddProject")} className="bg-white text-purple-700 w-full py-2 rounded mb-2 font-semibold">Create Project</button>
        <button onClick={handleDeleteAccount} className="bg-white text-red-600 w-full py-2 rounded font-semibold">Delete Account</button>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-8">
        {extraLoading ? (
          <p className="text-gray-500 mb-6">Loading extra info...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div><strong>First Name:</strong> {first_name}</div>
            <div><strong>Last Name:</strong> {last_name}</div>
            <div><strong>Country:</strong> {extraInfo?.country || "N/A"}</div>
            <div><strong>Mobile:</strong> {mobile_phone || "N/A"}</div>
            <div><strong>Birthday:</strong> {extraInfo?.birthdate ? new Date(extraInfo.birthdate).toLocaleDateString() : "N/A"}</div>
            <div>
              <strong>Facebook:</strong>{" "}
              {extraInfo?.facebook_account ? (
                <a href={extraInfo.facebook_account} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  View
                </a>
              ) : "N/A"}
            </div>
          </div>
        )}

        <div className="flex gap-4 mb-8">
          <div className="bg-pink-500 text-white px-4 py-2 rounded font-bold text-center">
            {donations.length} Donations
          </div>
          <div className="bg-purple-700 text-white px-4 py-2 rounded font-bold text-center">
            {projects.length} Projects
          </div>
        </div>

        {donations.length > 0 && (
          <div className="bg-white shadow rounded p-6 mb-8">
            <h3 className="text-lg font-bold mb-4">Donations</h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="text-gray-600 border-b">
                  <th className="pb-2">Title</th>
                  <th className="pb-2">Donation</th>
                  <th className="pb-2">Created at</th>
                </tr>
              </thead>
              <tbody>
                {donations.map((don) => (
                  <tr key={don.id} className="border-t">
                    <td className="py-2">{don.project?.title || "N/A"}</td>
                    <td className="py-2">{don.amount} LE</td>
                    <td className="py-2">{new Date(don.created_at).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {projects.length > 0 && (
          <div className="bg-white shadow rounded p-6">
            <h3 className="text-lg font-bold mb-4">Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projects.map((proj) => (
                <div key={proj.id} className="border rounded shadow p-4 text-center">
                  {proj.images?.[0]?.image ? (
                    <img
                      src={`https://hossam599.pythonanywhere.com${proj.images[0].image}`}
                      alt={proj.title}
                      className="h-20 w-20 rounded-full mx-auto mb-3 object-cover"
                    />
                  ) : (
                    <div className="h-20 w-20 bg-gray-200 flex items-center justify-center rounded-full mx-auto mb-3">
                      <span className="text-sm text-gray-500">No image</span>
                    </div>
                  )}
                  <h4 className="text-lg font-bold">{proj.title}</h4>
                  <p className="text-sm">{proj.totalTarget} L.E</p>
                  <p className="text-xs text-gray-500">{proj.details?.slice(0, 40)}...</p>
                  <Link
                    to={`/project/${proj.id}`}
                    className="inline-block mt-3 px-4 py-2 bg-purple-700 text-white rounded-md text-sm hover:bg-purple-800 transition"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ProfilePage;
