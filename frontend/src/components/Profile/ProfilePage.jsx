import React, { useState } from "react";
import { useAuth } from "../Auth/Auth";
import { get, put, post } from "../api/api";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { showToastLong } from "../toasts/toastLong";
import { ClipLoader } from "react-spinners";
import { validatePassword } from "../Register/PasswordValidation";
import Select from "react-select";
import { options } from "../Register/CountryConst";

function ProfilePage() {
  const { token } = useAuth(); // Get role from useAuth
  const [loading, setLoading] = useState(true);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [selectedSection, setSelectedSection] = useState("personalData"); // State to track selected section

  const [user, setUser] = useState({
    userID: "",
    firstName: "",
    lastName: "",
    email: "",
    settlement: "",
    country: "",
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
  }, [token]);

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();

    const userID = jwtDecode(token).nameid;

    const passwordErrors = validatePassword(
      newPassword,
      newPasswordConfirmation
    );
    setPasswordErrors(passwordErrors);

    if (passwordErrors.length === 0) {
      const passwordChangeData = {
        userID: userID,
        oldPassword: oldPassword,
        newPassword: newPassword,
      };

      try {
        await post.ChangePassword(passwordChangeData);
        showToastLong("Sikeres jelszóváltoztatás!", "success");
      } catch (error) {
        showToastLong(
          "Hiba történt a jelszóváltoztatás közben: " + error.response.data,
          "error"
        );
        console.log(error);
      }
    }
  };

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
    <div className="bg-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold text-center mb-8">
          Fiókbeállítások
        </h1>
        <div className="flex justify-center mb-4">
          <button
            className={`mx-2 p-2 w-1/3 rounded-xl py-4 ${
              selectedSection === "personalData" ? "bg-gray-500" : "bg-gray-700"
            } text-white`}
            onClick={() => setSelectedSection("personalData")}
            style={{ transition: "background-color 1s ease-in-out" }}
          >
            Személyes adatok
          </button>
          <button
            className={`mx-2 p-2 w-1/3 rounded-xl py-4 ${
              selectedSection === "passwordChange" ? "bg-gray-500" : "bg-gray-700"
            } text-white`}
            onClick={() => setSelectedSection("passwordChange")}
            style={{ transition: "background-color 1s ease-in-out" }}
          >
            Jelszóváltoztatás
          </button>
        </div>
        <div className="gap-8">
          {loading ? (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-200">
              <ClipLoader color={"#B5B4B4"} loading={loading} size={250} />
            </div>
          ) : (
            <>
              {selectedSection === "personalData" && (
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
                        <strong> Település:</strong> {user.settlement}
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
                        <Select
                          id="country"
                          name="country"
                          options={options}
                          className="mb-4 mt-2 text-lg z-5"
                          onChange={(option) =>
                            handleChange({
                              target: { name: "country", value: option.value },
                            })
                          }
                          value={options.find(
                            (option) => option.value === user.country
                          )}
                          placeholder="Ország"
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              fontSize: "1rem",
                              paddingLeft: "6px",
                            }),
                            option: (provided) => ({
                              ...provided,
                              fontSize: "1rem", // adjust this value to your needs
                            }),
                          }}
                          noOptionsMessage={() => "Nincs találat"}
                        />
                        Település:
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
              )}
              {selectedSection === "passwordChange" && (
                <div className="bg-white shadow-md rounded-md p-8 flex flex-col justify-between">
                  <h2 className="text-2xl font-semibold mb-4">
                    Jelszóváltoztatás
                  </h2>
                  <input
                    type="password"
                    placeholder="Jelenlegi jelszó"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    autoComplete="new-password"
                  />
                  <input
                    type="password"
                    placeholder="Új jelszó"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    autoComplete="new-password"
                  />

                  <input
                    type="password"
                    placeholder="Új jelszó megerősítése"
                    value={newPasswordConfirmation}
                    onChange={(e) => setNewPasswordConfirmation(e.target.value)}
                    className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    autoComplete="new-password"
                  />
                  {passwordErrors.length > 0 && (
                    <div className="w-full text-red-500 mb-3">
                      {passwordErrors.map((error, index) => (
                        <p key={index}>{error}</p>
                      ))}
                    </div>
                  )}
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                    onClick={handlePasswordChangeSubmit}
                  >
                    Jelszó megváltoztatása
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
