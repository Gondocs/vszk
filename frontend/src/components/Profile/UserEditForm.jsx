import React, { useState, useEffect } from "react";
import Select from "react-select";
import { get, put, del } from "../api/api";
import { showToastLong } from "../toasts/toastLong";
import { options } from "../Register/CountryConst";

const Roleoptions = [
  { value: "user", label: "user" },
  { value: "admin", label: "admin" },
];

function UserEditForm() {
  const [loading, setLoading] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [editing, setEditing] = useState(false);
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
    setEditing(false);
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
      setEditing(false);
    }
  };

  return (
    <>
      <h3 className="text-3xl font-semibold text-center mb-8 mt-8">
        Felhasználó keresése email alapján
      </h3>
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
        noOptionsMessage={() => "Nincs találat."}
      />
      <h2 className="text-2xl font-semibold mb-4">Felhasználó adatai</h2>
      <form onSubmit={handleSubmit}>
        Vezetékév:
        <input
          type="text"
          name="firstName"
          value={user.firstName}
          onChange={handleChange}
          className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          disabled={!editing}
        />
        Keresztnév:
        <input
          type="text"
          name="lastName"
          value={user.lastName}
          onChange={handleChange}
          className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          disabled={!editing}
        />
        Email cím:
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          disabled={!editing}
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
          noOptionsMessage={() => "Nincs találat."}
          isDisabled={!editing}
        />
        Település:
        <input
          type="text"
          name="settlement"
          value={user.settlement}
          onChange={handleChange}
          className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          disabled={!editing}
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
          noOptionsMessage={() => "Nincs találat."}
          isDisabled={!editing}
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
        onClick={() => setEditing(!editing)}
      >
        {editing ? "Mégse" : "Szerkesztés"}
      </button>
    </>
  );
}

export default UserEditForm;
