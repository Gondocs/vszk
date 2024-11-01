import React, { useState, useEffect } from "react";
import { get, post } from "../api/api";
import { showToastLong } from "../toasts/toastLong";
import Select from "react-select";

function SendNewsletterForm() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [sendToAll, setSendToAll] = useState(true);

  useEffect(() => {
    get.GetAllUsers()
      .then((data) => {
        setAllUsers(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newsletterData = { subject, message };
    try {
      if (sendToAll) {
        await post.SendEmailToAllUsers(newsletterData);
        showToastLong("Hírlevél sikeresen elküldve minden felhasználónak!", "success");
      } else if (selectedUser) {
        await post.SendEmailToUser({ ...newsletterData, email: selectedUser.value });
        showToastLong("Hírlevél sikeresen elküldve a kiválasztott felhasználónak!", "success");
      } else {
        showToastLong("Kérjük, válasszon egy felhasználót.", "error");
        return;
      }
      setSubject("");
      setMessage("");
      setSelectedUser(null);
    } catch (error) {
      if (error.response.data.includes("recipient is suppressed")) {
        showToastLong("Hírlevél sikeresen elküldve, de néhány címzett el van nyomva.", "success");
      } else {
        showToastLong("Hiba történt a hírlevél küldésekor: " + error.message, "error");
      }
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="">
        <h1 className="text-3xl font-semibold text-center mb-8 mt-8">Hírlevél küldése</h1>
        <div className="flex justify-center mb-4">
          <button
            className={`mx-2 p-2 w-1/3 rounded-xl py-4 ${sendToAll ? "bg-gray-500" : "bg-gray-700"} text-white`}
            onClick={() => setSendToAll(true)}
            style={{ transition: "background-color 1s ease-in-out" }}
          >
            Küldés mindenkinek
          </button>
          <button
            className={`mx-2 p-2 w-1/3 rounded-xl py-4 ${!sendToAll ? "bg-gray-500" : "bg-gray-700"} text-white`}
            onClick={() => setSendToAll(false)}
            style={{ transition: "background-color 1s ease-in-out" }}
          >
            Küldés egy felhasználónak
          </button>
        </div>
        <div className="">
          <form onSubmit={handleSubmit}>
            {!sendToAll && (
              <div>
                <label>Email címzett:</label>
                <Select
                  options={allUsers.map((user) => ({ value: user.email, label: user.email }))}
                  value={selectedUser}
                  onChange={setSelectedUser}
                  isClearable
                  placeholder="Válasszon egy felhasználót"
                  className="mb-4"
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
                />
              </div>
            )}
            <div>
              <label>Tárgy:</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label>Üzenet:</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
              Hírlevél küldése
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SendNewsletterForm;