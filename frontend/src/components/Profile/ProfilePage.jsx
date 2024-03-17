import React from "react";
import { useState } from "react";

function ProfilePage() {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
  });

  const handleChangePassword = () => {
    // Handle password change logic here
    console.log("Change password clicked");
  };

  return (
    <div>
      <h1>Profile Page</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      {/* Display more user data here */}
      <button onClick={handleChangePassword}>Change Password</button>
    </div>
  );
}

export default ProfilePage;
