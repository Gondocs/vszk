import React, { useEffect, useState } from "react";
import { get, del } from "../api/api";
import { showToast } from "../toasts/toast";

function DeleteSoftwareForm() {
  const [softwareList, setSoftwareList] = useState([]);
  const [selectedSoftware, setSelectedSoftware] = useState({ name: "", softwareID: "" });

  useEffect(() => {
    get.SoftwareAll()
      .then((data) => {
        setSoftwareList(data);
      })
      .catch((error) => {
        console.error("Error fetching software data:", error);
      });
  }, []);

  const handleNameChange = (e) => {
    const selectedName = e.target.value;
    const software = softwareList.find((s) => s.name === selectedName);
    setSelectedSoftware({ name: selectedName, softwareID: software ? software.softwareID : "" });
  };

  const handleIDChange = (e) => {
    const selectedID = e.target.value;
    const software = softwareList.find((s) => s.softwareID === Number(selectedID));
    setSelectedSoftware({ name: software ? software.name : "", softwareID: selectedID });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await del.DeleteSoftwareById(selectedSoftware.softwareID);
      showToast("Szoftver törlése sikeres!", "success");
      setSoftwareList(softwareList.filter(s => s.softwareID !== selectedSoftware.softwareID));
      setSelectedSoftware({ name: "", softwareID: "" });
    } catch (error) {
      showToast("Error deleting software: " + error.message, "error");
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold text-center mb-8">Szoftver törlése</h1>
        <div className="bg-white shadow-md rounded-md p-8">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Szoftver neve:</label>
              <select
                value={selectedSoftware.name}
                onChange={handleNameChange}
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Válasszon szoftvert</option>
                {softwareList.map((software) => (
                  <option key={software.softwareID} value={software.name}>
                    {software.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Szoftver ID:</label>
              <select
                value={selectedSoftware.softwareID}
                onChange={handleIDChange}
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Válasszon szoftver ID-t</option>
                {softwareList.map((software) => (
                  <option key={software.softwareID} value={software.softwareID}>
                    {software.softwareID}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">
              Szoftver törlése
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeleteSoftwareForm;
