import React, { useState } from "react";
import { post } from "../api/api";
import { showToastLong } from "../toasts/toastLong";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";

function AddSoftwareForm() {
  const [software, setSoftware] = useState({
    name: "",
    description: "",
    category: {
      categoryID: 0,
      name: "",
      categoryGroup: { categoryGroupID: 0, name: "" },
    },
    company: {
      companyID: 0,
      name: "",
      location: "",
      phone: "",
      website: "",
      logo_link: "",
      email: "",
    },
    introduction_fee: 0,
    logo_link: "",
    average_stars: 0,
    languages: [],
    supports: [],
    oSs: [],
    devices: [],
    moduls: [],
    remunerations: [{ remunerationID: 0, level: "", type: "", price: 0 }],
    functions: [{ softwareFunctionID: 0, sfunction: true, functionality: "" }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSoftware({ ...software, [name]: value });
  };

  const handleNestedChange = (key, nestedKey, value) => {
    setSoftware({
      ...software,
      [key]: { ...software[key], [nestedKey]: value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(software);

    /*
    try {
      await post.AddSoftware(software);
      showToastLong("Software added successfully!", "success");
    } catch (error) {
      showToastLong("Error adding software: " + error.message, "error");
      console.log(error);
    }
    */
  };

  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Spanish", label: "Spanish" },
    // Add more language options here
  ];

  const supportOptions = [
    { value: "Email", label: "Email" },
    { value: "Phone", label: "Phone" },
    // Add more support options here
  ];

  const osOptions = [
    { value: "Windows", label: "Windows" },
    { value: "MacOS", label: "MacOS" },
    // Add more OS options here
  ];

  const deviceOptions = [
    { value: "Desktop", label: "Desktop" },
    { value: "Mobile", label: "Mobile" },
    // Add more device options here
  ];

  const handleRemoveRemuneration = (index) => {
    const newRemunerations = [...software.remunerations];
    newRemunerations.splice(index, 1);
    setSoftware({ ...software, remunerations: newRemunerations });
  };

  const handleRemoveFunction = (index) => {
    const newFunctions = [...software.functions];
    newFunctions.splice(index, 1);
    setSoftware({ ...software, functions: newFunctions });
  };

  const handleCreateOption = (inputValue, key) => {
    setSoftware({
      ...software,
      [key]: [...software[key], inputValue],
    });
  };

  return (
    <div className="bg-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-semibold text-center mb-8">
          Add New Software
        </h1>
        <div className="bg-white shadow-md rounded-md p-8">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={software.name}
                onChange={handleChange}
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={software.description}
                onChange={handleChange}
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label>Category Name:</label>
              <input
                type="text"
                name="category.name"
                value={software.category.name}
                onChange={(e) =>
                  handleNestedChange("category", "name", e.target.value)
                }
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label>Category Group Name:</label>
              <input
                type="text"
                name="categoryGroup.name"
                value={software.category.categoryGroup.name}
                onChange={(e) =>
                  setSoftware({
                    ...software,
                    category: {
                      ...software.category,
                      categoryGroup: {
                        ...software.category.categoryGroup,
                        name: e.target.value,
                      },
                    },
                  })
                }
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label>Company Name:</label>
              <input
                type="text"
                name="company.name"
                value={software.company.name}
                onChange={(e) =>
                  handleNestedChange("company", "name", e.target.value)
                }
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label>Company Location:</label>
              <input
                type="text"
                name="company.location"
                value={software.company.location}
                onChange={(e) =>
                  handleNestedChange("company", "location", e.target.value)
                }
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label>Company Phone:</label>
              <input
                type="text"
                name="company.phone"
                value={software.company.phone}
                onChange={(e) =>
                  handleNestedChange("company", "phone", e.target.value)
                }
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label>Company Website:</label>
              <input
                type="text"
                name="company.website"
                value={software.company.website}
                onChange={(e) =>
                  handleNestedChange("company", "website", e.target.value)
                }
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label>Company Email:</label>
              <input
                type="email"
                name="company.email"
                value={software.company.email}
                onChange={(e) =>
                  handleNestedChange("company", "email", e.target.value)
                }
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label>Introduction Fee:</label>
              <input
                type="number"
                name="introduction_fee"
                value={software.introduction_fee}
                onChange={handleChange}
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label>Logo Link:</label>
              <input
                type="text"
                name="logo_link"
                value={software.logo_link}
                onChange={handleChange}
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label>Average Stars:</label>
              <input
                type="number"
                name="average_stars"
                value={software.average_stars}
                onChange={handleChange}
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label>Languages:</label>
              <CreatableSelect
                isMulti
                options={languageOptions}
                value={software.languages.map((lang) => ({ value: lang, label: lang }))}
                onChange={(selectedOptions) =>
                  setSoftware({
                    ...software,
                    languages: selectedOptions.map((option) => option.value),
                  })
                }
                onCreateOption={(inputValue) =>
                  handleCreateOption(inputValue, "languages")
                }
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
            <div>
              <label>Supports:</label>
              <CreatableSelect
                isMulti
                options={supportOptions}
                value={software.supports.map((support) => ({ value: support, label: support }))}
                onChange={(selectedOptions) =>
                  setSoftware({
                    ...software,
                    supports: selectedOptions.map((option) => option.value),
                  })
                }
                onCreateOption={(inputValue) =>
                  handleCreateOption(inputValue, "supports")
                }
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
            <div>
              <label>Operating Systems (OSs):</label>
              <CreatableSelect
                isMulti
                options={osOptions}
                value={software.oSs.map((os) => ({ value: os, label: os }))}
                onChange={(selectedOptions) =>
                  setSoftware({
                    ...software,
                    oSs: selectedOptions.map((option) => option.value),
                  })
                }
                onCreateOption={(inputValue) =>
                  handleCreateOption(inputValue, "oSs")
                }
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
            <div>
              <label>Devices:</label>
              <CreatableSelect
                isMulti
                options={deviceOptions}
                value={software.devices.map((device) => ({ value: device, label: device }))}
                onChange={(selectedOptions) =>
                  setSoftware({
                    ...software,
                    devices: selectedOptions.map((option) => option.value),
                  })
                }
                onCreateOption={(inputValue) =>
                  handleCreateOption(inputValue, "devices")
                }
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
            <div>
              <label>Modules:</label>
              <input
                type="text"
                name="moduls"
                value={software.moduls.join(", ")}
                onChange={(e) =>
                  setSoftware({
                    ...software,
                    moduls: e.target.value.split(",").map((mod) => mod.trim()),
                  })
                }
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                placeholder="Comma-separated list"
              />
            </div>
            <div>
              <label>Remunerations:</label>
              {software.remunerations.map((remuneration, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    name={`remunerations[${index}].level`}
                    value={remuneration.level}
                    onChange={(e) => {
                      const newRemunerations = [...software.remunerations];
                      newRemunerations[index].level = e.target.value;
                      setSoftware({
                        ...software,
                        remunerations: newRemunerations,
                      });
                    }}
                    placeholder="Level"
                    className="mb-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="text"
                    name={`remunerations[${index}].type`}
                    value={remuneration.type}
                    onChange={(e) => {
                      const newRemunerations = [...software.remunerations];
                      newRemunerations[index].type = e.target.value;
                      setSoftware({
                        ...software,
                        remunerations: newRemunerations,
                      });
                    }}
                    placeholder="Type"
                    className="mb-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="number"
                    name={`remunerations[${index}].price`}
                    value={remuneration.price}
                    onChange={(e) => {
                      const newRemunerations = [...software.remunerations];
                      newRemunerations[index].price = e.target.value;
                      setSoftware({
                        ...software,
                        remunerations: newRemunerations,
                      });
                    }}
                    placeholder="Price"
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveRemuneration(index)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md mt-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setSoftware({
                    ...software,
                    remunerations: [
                      ...software.remunerations,
                      { remunerationID: 0, level: "", type: "", price: 0 },
                    ],
                  })
                }
                className="bg-gray-500 text-white py-1 px-3 rounded-md"
              >
                Add Remuneration
              </button>
            </div>
            <div>
              <label>Functions:</label>
              {software.functions.map((func, index) => (
                <div key={index} className="mb-4">
                  <input
                    type="text"
                    name={`functions[${index}].functionality`}
                    value={func.functionality}
                    onChange={(e) => {
                      const newFunctions = [...software.functions];
                      newFunctions[index].functionality = e.target.value;
                      setSoftware({ ...software, functions: newFunctions });
                    }}
                    placeholder="Functionality"
                    className="mb-2 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  />
                  <label>
                    <input
                      type="checkbox"
                      name={`functions[${index}].sfunction`}
                      checked={func.sfunction}
                      onChange={(e) => {
                        const newFunctions = [...software.functions];
                        newFunctions[index].sfunction = e.target.checked;
                        setSoftware({ ...software, functions: newFunctions });
                      }}
                      className="mr-2"
                    />
                    Software Function
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveFunction(index)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md mt-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  setSoftware({
                    ...software,
                    functions: [
                      ...software.functions,
                      {
                        softwareFunctionID: 0,
                        sfunction: true,
                        functionality: "",
                      },
                    ],
                  })
                }
                className="bg-gray-500 text-white py-1 px-3 rounded-md"
              >
                Add Function
              </button>
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Add Software
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSoftwareForm;
