/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { post, get } from "../api/api";
import { showToastLong } from "../toasts/toastLong";
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
    introduction_fee: null,
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

  const [languageData, setLanguageData] = useState([]);
  const [supportData, setSupportData] = useState([]);
  const [osData, setOsData] = useState([]);
  const [deviceData, setDeviceData] = useState([]);
  const [modulesData, setModulesData] = useState([]);
  const [functionsData, setFunctionsData] = useState([]);
  const [levelsData, setLevelsData] = useState([]);
  const [typesData, setTypesData] = useState([]);

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

  useEffect(() => {
    get
      .SoftwareLangConnect()
      .then((LanguageData) => {
        setLanguageData(LanguageData);
        console.log(LanguageData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    get
      .Support()
      .then((SupportData) => {
        setSupportData(SupportData);
        console.log(SupportData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    get
      .SoftwareOSConnect()
      .then((OsData) => {
        setOsData(OsData);
        console.log(OsData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    get
      .SoftwareCompConnect()
      .then((DeviceData) => {
        setDeviceData(DeviceData);
        console.log(DeviceData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    get
      .GetAllModuls()
      .then((ModulesData) => {
        setModulesData(ModulesData);
        console.log(ModulesData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    get
      .SoftwareFunctions()
      .then((FunctionsData) => {
        setFunctionsData(FunctionsData);
        console.log(FunctionsData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    get
      .GetAllLevels()
      .then((LevelsData) => {
        setLevelsData(LevelsData);
        console.log(LevelsData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    get
      .GetAllTypes()
      .then((TypesData) => {
        setTypesData(TypesData);
        console.log(TypesData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

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
          Új szoftver hozzáadása
        </h1>
        <div className="bg-white shadow-md rounded-md p-8">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Szoftver neve:</label>
              <input
                type="text"
                name="name"
                value={software.name}
                onChange={handleChange}
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label>Leírás:</label>
              <textarea
                name="description"
                value={software.description}
                onChange={handleChange}
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label>Kategória neve:</label>
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
              <label>Kategória csoport neve:</label>
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
              <label>Cég neve:</label>
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
              <label>Cég helyszíne:</label>
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
              <label>Cég telefonszáma:</label>
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
              <label>Cég weboldala:</label>
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
              <label>Cég email-címe:</label>
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
              <label>Bevezetési ár:</label>
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
              <label>Átlag értékelés:</label>
              <input
                type="number"
                name="average_stars"
                value={software.average_stars}
                onChange={handleChange}
                className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label>Nyelvek:</label>
              <CreatableSelect
                isMulti
                options={languageData.map((lang) => ({
                  value: lang,
                  label: lang,
                }))}
                value={software.languages.map((lang) => ({
                  value: lang,
                  label: lang,
                }))}
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
              <label>Támogatás nyelve:</label>
              <CreatableSelect
                isMulti
                options={supportData.map((support) => ({
                  value: support,
                  label: support,
                }))}
                value={software.supports.map((support) => ({
                  value: support,
                  label: support,
                }))}
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
              <label> Operációs rendszerek (OSs):</label>
              <CreatableSelect
                isMulti
                options={osData.map((os) => ({
                  value: os,
                  label: os,
                }))}
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
              <label>Eszközök:</label>
              <CreatableSelect
                isMulti
                options={deviceData.map((device) => ({
                  value: device,
                  label: device,
                }))}
                value={software.devices.map((device) => ({
                  value: device,
                  label: device,
                }))}
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
              <label>Modulok:</label>
              <CreatableSelect
                isMulti
                options={modulesData.map((modules) => ({
                  value: modules,
                  label: modules,
                }))}
                value={software.moduls.map((modules) => ({
                  value: modules,
                  label: modules,
                }))}
                onChange={(selectedOptions) =>
                  setSoftware({
                    ...software,
                    moduls: selectedOptions.map((option) => option.value),
                  })
                }
                onCreateOption={(inputValue) =>
                  handleCreateOption(inputValue, "moduls")
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
              <label>Ár:</label>
              <CreatableSelect
                isMulti
                options={levelsData.map((level) => ({
                  value: level,
                  label: level,
                }))}
                value={software.remunerations
                  .filter((remuneration) => remuneration.level !== "")
                  .map((remuneration) => ({
                    value: remuneration.level,
                    label: remuneration.level,
                  }))}
                onChange={(selectedOptions) =>
                  setSoftware({
                    ...software,
                    remunerations: selectedOptions.map((option, index) => ({
                      ...software.remunerations[index],
                      level: option.value,
                    })),
                  })
                }
                onCreateOption={(inputValue) =>
                  setSoftware({
                    ...software,
                    remunerations: [
                      ...software.remunerations,
                      {
                        remunerationID: software.remunerations.length,
                        level: inputValue,
                        type: "",
                        price: 0,
                      },
                    ],
                  })
                }
              />

              <CreatableSelect
                isMulti
                options={typesData.map((type) => ({
                  value: type,
                  label: type,
                }))}
                value={software.remunerations
                  .filter((remuneration) => remuneration.type !== "")
                  .map((remuneration) => ({
                    value: remuneration.type,
                    label: remuneration.type,
                  }))}
                onChange={(selectedOptions) =>
                  setSoftware({
                    ...software,
                    remunerations: selectedOptions.map((option, index) => ({
                      ...software.remunerations[index],
                      type: option.value,
                    })),
                  })
                }
                onCreateOption={(inputValue) =>
                  setSoftware({
                    ...software,
                    remunerations: [
                      ...software.remunerations,
                      {
                        remunerationID: software.remunerations.length,
                        level: "",
                        type: inputValue,
                        price: 0,
                      },
                    ],
                  })
                }
              />

              <input
                type="number"
                value={software.remunerations[0]?.price || ""}
                onChange={(e) =>
                  setSoftware({
                    ...software,
                    remunerations: software.remunerations.map(
                      (remuneration, index) =>
                        index === 0
                          ? {
                              ...remuneration,
                              price: parseInt(e.target.value, 10),
                            }
                          : remuneration
                    ),
                  })
                }
              />
            </div>
            <div>
              <label>Funkciók:</label>
              <CreatableSelect
                isMulti
                options={functionsData.map((functions) => ({
                  value: functions,
                  label: functions,
                }))}
                value={software.functions
                  .filter((func) => func.functionality !== "")
                  .map((func) => ({
                    value: func.functionality,
                    label: func.functionality,
                  }))}
                onChange={(selectedOptions) =>
                  setSoftware({
                    ...software,
                    functions: selectedOptions.map((option) => ({
                      softwareFunctionID: 0,
                      sfunction: true,
                      functionality: option.value,
                    })),
                  })
                }
                onCreateOption={(inputValue) => {
                  setSoftware((prevState) => ({
                    ...prevState,
                    functions: [
                      ...prevState.functions,
                      {
                        softwareFunctionID: 0,
                        sfunction: true,
                        functionality: inputValue,
                      },
                    ],
                  }));
                }}
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
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
            >
              Szoftver hozzáadása
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddSoftwareForm;
