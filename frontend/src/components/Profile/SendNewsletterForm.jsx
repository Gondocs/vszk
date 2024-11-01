import React, { useState } from "react";
import { post } from "../api/api";
import { showToastLong } from "../toasts/toastLong";

function SendNewsletterForm() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newsletterData = { subject, message };
    try {
      await post.SendEmailToAllUsers(newsletterData);
      showToastLong("Hírlevél sikeresen elküldve!", "success");
      setSubject("");
      setMessage("");
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
        <div className="">
          <form onSubmit={handleSubmit}>
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