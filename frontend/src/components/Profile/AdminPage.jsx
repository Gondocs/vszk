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
import AddSoftwareForm from "./AddSoftwareForm";
import DeleteSoftwareForm from "./DeleteSoftwareForm";
import SendNewsletterForm from "./SendNewsletterForm";
import UserEditForm from "./UserEditForm"; // Import the new component

function AdminPage() {
  const [selectedAction, setSelectedAction] = useState("userEdit");
  const { token } = useAuth();

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold text-center mb-8">Admin</h1>
        <div className="gap-8">
          <div className="bg-white shadow-md rounded-md p-8 flex flex-col justify-between">
            <div className="flex justify-center mb-4">
              <button
                className={`mx-2 p-2 w-1/3 rounded-xl py-4 ${
                  selectedAction === "userEdit" ? "bg-gray-500" : "bg-gray-700"
                } text-white`}
                onClick={() => setSelectedAction("userEdit")}
                style={{ transition: "background-color 1s ease-in-out" }}
              >
                Felhasználói adatok módosítása
              </button>
              <button
                className={`mx-2 p-2 w-1/3 rounded-xl py-4 ${
                  selectedAction === "addSoftware"
                    ? "bg-gray-500"
                    : "bg-gray-700"
                } text-white`}
                onClick={() => setSelectedAction("addSoftware")}
                style={{ transition: "background-color 1s ease-in-out" }}
              >
                Új szoftver hozzáadása
              </button>
              <button
                className={`mx-2 p-2 w-1/3 rounded-xl py-4 ${
                  selectedAction === "deleteSoftware"
                    ? "bg-gray-500"
                    : "bg-gray-700"
                } text-white`}
                onClick={() => setSelectedAction("deleteSoftware")}
                style={{ transition: "background-color 1s ease-in-out" }}
              >
                Szoftver törlése
              </button>
              <button
                className={`mx-2 p-2 w-1/3 rounded-xl py-4 ${
                  selectedAction === "sendNewsletter" ? "bg-gray-500" : "bg-gray-700"
                } text-white`}
                onClick={() => setSelectedAction("sendNewsletter")}
                style={{ transition: "background-color 1s ease-in-out" }}
              >
                Hírlevél küldése
              </button>
            </div>
            {selectedAction === "userEdit" && <UserEditForm />}
            {selectedAction === "addSoftware" && <AddSoftwareForm />}
            {selectedAction === "deleteSoftware" && <DeleteSoftwareForm />}
            {selectedAction === "sendNewsletter" && <SendNewsletterForm />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
