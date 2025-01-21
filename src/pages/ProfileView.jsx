import React, { useState, useEffect } from "react";
import api from "..api";

const ProfileView = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = () => {
    api
      .get("https://blogapi-qm9m.onrender.com/api/profile/")
      .then((res) => {
        if (res.data.length > 0) {
          setProfile(res.data[0]); // Assuming only one profile per user
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Failed to load profile. Please try again.");
        setLoading(false);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!profile) {
    return (
      <div className="text-center text-gray-500">
        <p>No profile found.</p>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow rounded">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>
      {errorMessage && <p className="text-red-600">{errorMessage}</p>}

      <div className="space-y-6">
        {/* Profile Picture */}
        <div className="flex items-center space-x-4">
          <div className="w-20 h-20 rounded-full overflow-hidden border">
            {profile.profile_pic ? (
              <img
                src={profile.profile_pic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">
                No Image
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold">{profile.user.username}</h3>
            <p className="text-gray-600">{profile.title || "No title set"}</p>
          </div>
        </div>

        {/* Bio */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800">Bio</h4>
          <p className="text-gray-600 mt-2">
            {profile.bio || "No bio available."}
          </p>
        </div>

        {/* Website URL */}
        {profile.website_url && (
          <div>
            <h4 className="text-lg font-semibold text-gray-800">Website</h4>
            <a
              href={profile.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline mt-2"
            >
              {profile.website_url}
            </a>
          </div>
        )}

        {/* LinkedIn URL */}
        {profile.linkedin_url && (
          <div>
            <h4 className="text-lg font-semibold text-gray-800">LinkedIn</h4>
            <a
              href={profile.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline mt-2"
            >
              {profile.linkedin_url}
            </a>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end space-x-4 mt-6">
          <a
            href="/editprofile"
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Edit Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
