import React from "react";
import { useState } from "react";
import { useAuth } from "../Auth/Auth";
import { json } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });

  const handleChangePassword = () => {
    // Handle password change logic here
    console.log("Change password clicked");
  };
  
  const { token, role } = useAuth(); // Get role from useAuth

  console.log("Current role: ", role); // Log the current role
  console.log("Current token: ", token); // Log the current token

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Role: {role}</p>
      {/* Display more user data here */}
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
}

export default ProfilePage;