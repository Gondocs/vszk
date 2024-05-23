/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { get, put, post, del } from "../api/api";
import { showToastLong } from "../toasts/toastLong";
import { ClipLoader } from "react-spinners";
import { validatePassword } from "../Register/PasswordValidation";
import Select from "react-select";
import { options } from "../Register/CountryConst";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../Auth/Auth";

function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [newPassword, setNewPassword] = useState("");
  const [editing, setEditing] = useState(false); // Added editing mode state
  const [oldPassword, setOldPassword] = useState("");
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const { token } = useAuth();

  const Roleoptions = [
    { value: "user", label: "user" },
    { value: "admin", label: "admin" },
  ];

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

  const [user, setUser] = useState({
    userID: "",
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    settlement: "",
    country: "",
  });

  useEffect(() => {
    get
      .GetAllUsers()
      .then((data) => {
        setAllUsers(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });
  }, [searchEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await put.UpdateUserDataAdmin(user);
      showToastLong("Felhasználó adatai sikeresen frissítve.", "success");
    } catch (error) {
      showToastLong("Error updating user data: " + error.message, "error");
      console.log(error);
    }
    setEditing(false); // Close editing mode after submission
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm(
      "Biztos, hogy törölni akarod ezt a felhasználót?"
    );
    if (confirmation) {
      const userID = user.userID;
      try {
        await del.DeleteUser(userID);
        showToastLong("Felhasználó sikeresen törölve.", "success");
      } catch (error) {
        showToastLong(
          "A felhasználó törlésekor hiba történt: " + error.message,
          "error"
        );
        console.log(error);
      }
      setEditing(false); // Close editing mode after submission
    }
  };

  return (
    <div className="bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold text-center mb-8">Admin</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-md p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Felhasználó keresése email alapján
              </h2>
              <Select
                id="emailsearch"
                name="emailsearch"
                autofill="false"
                autocomplete="off"
                options={allUsers.map((user) => ({
                  value: user.email,
                  label: user.email,
                }))}
                className="mb-4 mt-2 text-lg z-5"
                onChange={(selectedOption) => {
                  const selectedUser = allUsers.find(
                    (user) => user.email === selectedOption.value
                  );
                  setUser(selectedUser);
                }}
                value={options.find((option) => option.value === user.email)}
                placeholder="Email cím"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    fontSize: "1rem",
                    paddingLeft: "6px",
                  }),
                  option: (provided) => ({
                    ...provided,
                    fontSize: "1rem",
                  }),
                }}
                noOptionsMessage={() => "No options available"}
              />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Felhasználó adatai</h2>
            <form onSubmit={handleSubmit}>
              Vezetékév:
              <input
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={handleChange}
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                disabled={!editing} // Disable input field when not in editing mode
              />
              Keresztnév:
              <input
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                disabled={!editing} // Disable input field when not in editing mode
              />
              Email cím:
              <input
                type="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                disabled={!editing} // Disable input field when not in editing mode
              />
              Ország:
              <Select
                id="country"
                name="country"
                options={options}
                className="mb-4 text-lg z-5"
                onChange={(option) =>
                  handleChange({
                    target: { name: "country", value: option.value },
                  })
                }
                value={options.find((option) => option.value === user.country)}
                placeholder="Országok"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    fontSize: "1rem",
                    paddingLeft: "6px",
                  }),
                  option: (provided) => ({
                    ...provided,
                    fontSize: "1rem",
                  }),
                }}
                noOptionsMessage={() => "No options available"}
                isDisabled={!editing} // Disable select field when not in editing mode
              />
              Település:
              <input
                type="text"
                name="settlement"
                value={user.settlement}
                onChange={handleChange}
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                disabled={!editing} // Disable input field when not in editing mode
              />
              Jogosultság:
              <Select
                value={Roleoptions.find((option) => option.value === user.role)}
                onChange={(selectedOption) =>
                  handleChange({
                    target: { name: "role", value: selectedOption.value },
                  })
                }
                options={Roleoptions}
                className="mb-4 text-lg z-5"
                placeholder="Jogosultságok"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    fontSize: "1rem",
                    paddingLeft: "6px",
                  }),
                  option: (provided) => ({
                    ...provided,
                    fontSize: "1rem",
                  }),
                }}
                noOptionsMessage={() => "No options available"}
                isDisabled={!editing} // Disable select field when not in editing mode
              />
            </form>
            {editing && (
              <>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="bg-blue-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mb-3"
                >
                  Mentés
                </button>
                <button
                  type="submit"
                  onClick={handleDelete}
                  className="bg-blue-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mb-3"
                >
                  Felhasználó törlése
                </button>
              </>
            )}
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              onClick={() => setEditing(!editing)} // Toggle editing mode
            >
              {editing ? "Mégse" : "Szerkesztés"}
            </button>
          </div>
          <div className="bg-white shadow-md rounded-md p-8 flex flex-col justify-between">
            ide
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
