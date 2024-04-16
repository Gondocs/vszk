import React, { useState } from "react";
import { useAuth } from "../Auth/Auth";
import { json } from "react-router-dom";
import { get, put, post } from "../api/api";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { showToastLong } from "../toasts/toastLong";
import { ClipLoader } from "react-spinners";

function ProfilePage() {
  const { token, role } = useAuth(); // Get role from useAuth
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState({
    userID: "",
    firstName: "",
    lastName: "",
    email: "",
    settlement: "",
    country: "",
  });

  const [passwordChange, setPasswordChange] = useState({
    userID: "",
    oldPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    get
      .GetUserDataById(jwtDecode(token).nameid)
      .then((data) => {
        setUser(data);
        setLoading(false);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    post.ChangePassword(passwordChange)
      .then((data) => {
        setPasswordChange(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form Data:", user);

    try {
      await put.UpdateUserData(user);
      showToastLong("Sikeres adatváltoztatás!", "success");
    } catch (error) {
      showToastLong(
        "Hiba történt az adatváltoztatás közben: " + error.message,
        "error"
      );
      console.log(error);
    }
    setEditing(false); // Close editing mode after submission
  };

  const [editing, setEditing] = useState(false); // State to manage editing mode

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  return (
    
    <div className="bg-gray-200">
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-semibold text-center mb-8">
        Fiókbeállítások
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {loading ? (
          <div className="fixed inset-0 flex justify-center items-center bg-gray-200">
            <ClipLoader color={"#B5B4B4"} loading={loading} size={250} />
          </div>
        ) : (
          <>
            <div className="bg-white shadow-md rounded-md p-8 flex flex-col justify-between">
              {!editing ? (
                <>
                  <h2 className="text-2xl font-semibold mb-4">
                    Személyes adatok
                  </h2>
                  <p className="">
                    <strong>Vezetéknév:</strong> {user.firstName}
                  </p>
                  <p className="">
                    <strong>Keresztnév:</strong> {user.lastName}
                  </p>
                  <p className="">
                    <strong>Email cím:</strong> {user.email}
                  </p>
                  <p className="">
                    <strong>Ország:</strong> {user.country}
                  </p>
                  <p className="">
                    <strong>Város:</strong> {user.settlement}
                  </p>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md mt-4"
                    onClick={() => setEditing(true)}
                  >
                    Adatok változtatása
                  </button>
                </>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">
                      Személyes adatok
                    </h2>
                    Vezetékév:
                    <input
                      type="text"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                      className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    Keresztnév
                    <input
                      type="text"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                      className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    Email cím:
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      disabled
                      className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    Ország:
                    <input
                      type="text"
                      name="country"
                      value={user.country}
                      onChange={handleChange}
                      className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    Város:
                    <input
                      type="text"
                      name="settlement"
                      value={user.settlement}
                      onChange={handleChange}
                      className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                    >
                      Mentés
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md ml-4"
                    >
                      Mégse
                    </button>
                  </div>
                </form>
              )}
            </div>
            <div className="bg-white shadow-md rounded-md p-8 flex flex-col justify-between">
              <h2 className="text-2xl font-semibold mb-4">Jelszóváltoztatás</h2>
              <input
                type="password"
                placeholder="Jelenlegi jelszó"
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                autoComplete="new-password"
              />
              <input
                type="password"
                placeholder="Új jelszó"
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                autoComplete="new-password"
              />
              <input
                type="password"
                placeholder="Új jelszó megerősítése"
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                autoComplete="new-password"
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
                Jelszó megváltoztatása
              </button>
            </div>
            <div className="bg-white shadow-md rounded-md p-8 flex flex-col justify-between">
              <h2 className="text-2xl font-bg-white bg-white">Értékelések</h2>
              <p className="mb-4 ">
                Jelenleg nincs értékelésed. Ha vásárolsz, és elégedett vagy a
                termékkel, értékeld a terméket!
              </p>
            </div>

            

          </>
        )}
      </div>
    </div>
  </div>
  );
}

export default ProfilePage;
