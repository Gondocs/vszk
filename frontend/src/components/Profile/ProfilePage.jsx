import React, { useState } from "react";
import { useAuth } from "../Auth/Auth";
import { json } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    dateOfBirth: "01/01/1990",
    Settlement: "Budapest",
    // Add more user data as needed
  });

  const { token, role } = useAuth(); // Get role from useAuth

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold text-center mb-8">
        Fiókbeállítások
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-md p-8">
          <h2 className="text-2xl font-semibold mb-4">Személyes adatok</h2>
          <p className="text-lg">
            <strong>Vezetéknév</strong> {user.firstName}
          </p>
          <p className="text-lg">
            <strong>Keresztnév</strong> {user.lastName}
          </p>
          <p className="text-lg">
            <strong>Email cím:</strong> {user.email}
          </p>
          <p className="text-lg">
            <strong>Ország</strong> {user.dateOfBirth}
          </p>
          <p className="text-lg">
            <strong>Város</strong> {user.Settlement}
          </p>
        </div>
        <div className="bg-white shadow-md rounded-md p-8">
          <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
          <input
            type="password"
            placeholder="Current Password"
            className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            autoComplete="new-password"
          />
          <input
            type="password"
            placeholder="New Password"
            className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            autoComplete="new-password"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            autoComplete="new-password"
          />
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
            Change Password
          </button>
        </div>
        <div className="bg-white shadow-md rounded-md p-8 lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
          {/* Add billing information here */}
        </div>
        <div className="bg-white shadow-md rounded-md p-8 lg:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Preferences</h2>
          {/* Add user preferences here */}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
