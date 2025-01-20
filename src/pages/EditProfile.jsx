import React, { useState, useEffect } from "react";
import api from "../api";
import { NavLink } from "react-router-dom";

const EditProfile = () => {
  const [profile, setProfile] = useState({
    bio: "",
    profile_pic: null,
    title: "",
    website_url: "",
    linkedin_url: "",
    id: null, // Added id for profile identification
  });

  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    api
      .get("/api/profile/") // Fetch the profile data
      .then((res) => {
        if (res.data.length > 0) {
          setProfile(res.data[0]); // Assuming only one profile per user
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profile_pic") {
      setProfile((prevProfile) => ({ ...prevProfile, profile_pic: files[0] }));
    } else {
      setProfile((prevProfile) => ({ ...prevProfile, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bio", profile.bio);
    formData.append("profile_pic", profile.profile_pic);
    formData.append("title", profile.title);
    formData.append("website_url", profile.website_url);
    formData.append("linkedin_url", profile.linkedin_url);

    if (profile.id) {
      // Update existing profile
      api
        .patch(`/api/profile/update/${profile.id}/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          setSuccessMessage("Profile updated successfully!");
          setErrorMessage("");
        })
        .catch((err) => {
          console.error(err);
          setErrorMessage("Failed to update profile. Please try again.");
          setSuccessMessage("");
        });
    } else {
      // Create new profile
      api
        .post(`/api/profile/`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          setSuccessMessage("Profile created successfully!");
          setErrorMessage("");
          // Optionally, you can fetch the newly created profile to update the state
          fetchProfile();
        })
        .catch((err) => {
          console.error(err);
          setErrorMessage("Failed to create profile. Please try again.");
          setSuccessMessage("");
        });
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded">
      <h2 className="text-2xl font-bold mb-6">{profile.id ? "Edit Profile" : "Create Profile"}</h2>
      {successMessage && <p className="text-green-600">{successMessage}</p>}
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <input
            type="file"
            name="profile_pic"
            accept="image/*"
            onChange={handleChange}
            className="block w-full mt-2 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            rows="4"
            placeholder="Write something about yourself..."
          />
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={profile.title}
            onChange={handleChange}
            className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Enter your title"
          />
        </div>

        {/* Website URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Website URL</label>
          <input
            type="url"
            name="website_url"
            value={profile.website_url}
            onChange={handleChange}
            className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Enter your website URL"
          />
        </div>

        {/* LinkedIn URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
          <input
            type="url"
            name="linkedin_url"
            value={profile.linkedin_url}
            onChange={handleChange}
            className="w-full mt-2 p-3 border rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="Enter your LinkedIn URL"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
          >
            {profile.id ? "Update Profile" : "Create Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
