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
  const [categoryGroups, setCategoryGroups] = useState([]);
  const [categories, setCategories] = useState([]);
  const [companyData, setCompanyData] = useState([]);

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
  
    // Clone the software state and add missing fields
    const softwareData = {
      softwareID: software.softwareID || 0, // Add softwareID
      name: software.name,
      description: software.description,
      category: {
        categoryID: software.category.categoryID,
        name: software.category.name,
        categoryGroup: {
          categoryGroupID: software.category.categoryGroup.categoryGroupID,
          name: software.category.categoryGroup.name,
        },
      },
      company: {
        companyID: software.company.companyID,
        name: software.company.name,
        location: software.company.location,
        phone: software.company.phone,
        website: software.company.website,
        logo_link: software.company.logo_link,
        email: software.company.email,
      },
      introduction_fee: software.introduction_fee !== null ? Number(software.introduction_fee) : null, // Convert to number or keep null
      logo_link: software.logo_link,
      average_stars: Number(software.average_stars), // Convert to number
      languages: software.languages,
      supports: software.supports,
      oSs: software.oSs,
      devices: software.devices,
      moduls: software.moduls,
      remunerations: software.remunerations.map((remuneration) => ({
        remunerationID: remuneration.remunerationID,
        level: remuneration.level,
        type: remuneration.type,
        price: Number(remuneration.price), // Convert to number
      })),
      functions: software.functions.map((func) => ({
        softwareFunctionID: func.softwareFunctionID,
        sfunction: func.sfunction,
        functionality: func.functionality,
      })),
    };
  
    console.log(softwareData);
  
    try {
      await post.AddNewSoftware(softwareData);
      showToastLong("Szoftver hozzáadása sikeres!", "success");
    } catch (error) {
      showToastLong("Error adding software: " + error.message, "error");
      console.log(error);
    }
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

    get
      .GetAllCategoryGroups()
      .then((CategoryGroups) => {
        setCategoryGroups(CategoryGroups);
        console.log(CategoryGroups);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    get
      .GetAllCategories()
      .then((Categories) => {
        setCategories(Categories);
        console.log(Categories);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    get
      .Company()
      .then((CompanyData) => {
        setCompanyData(CompanyData);
        console.log(CompanyData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleSelectChange = (index, field, selectedOption) => {
    const newRemunerations = [...software.remunerations];
    newRemunerations[index][field] = selectedOption ? selectedOption.value : "";
    setSoftware({ ...software, remunerations: newRemunerations });
  };

  const handleRemoveRemuneration = (index) => {
    const newRemunerations = [...software.remunerations];
    newRemunerations.splice(index, 1);
    setSoftware({ ...software, remunerations: newRemunerations });
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
              <CreatableSelect
                options={categories.map((category) => ({
                  value: category.categoryID,
                  label: category.name,
                }))}
                value={
                  software.category.name
                    ? {
                        value: software.category.categoryID,
                        label: software.category.name,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  setSoftware({
                    ...software,
                    category: {
                      ...software.category,
                      categoryID: selectedOption.value,
                      name: selectedOption.label,
                    },
                  })
                }
                onCreateOption={(inputValue) =>
                  setSoftware({
                    ...software,
                    category: {
                      categoryID: categories.length + 1,
                      name: inputValue,
                    },
                  })
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
              <label>Kategória csoport neve:</label>
              <CreatableSelect
                options={categoryGroups.map((group) => ({
                  value: group.categoryGroupID,
                  label: group.name,
                }))}
                value={
                  software.category.categoryGroup.name
                    ? {
                        value: software.category.categoryGroup.categoryGroupID,
                        label: software.category.categoryGroup.name,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  setSoftware({
                    ...software,
                    category: {
                      ...software.category,
                      categoryGroup: {
                        categoryGroupID: selectedOption.value,
                        name: selectedOption.label,
                      },
                    },
                  })
                }
                onCreateOption={(inputValue) =>
                  setSoftware({
                    ...software,
                    category: {
                      ...software.category,
                      categoryGroup: {
                        categoryGroupID: categoryGroups.length + 1,
                        name: inputValue,
                      },
                    },
                  })
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
              <label>Cég neve:</label>
              <CreatableSelect
                options={companyData.map((company) => ({
                  value: company.companyID,
                  label: company.name,
                }))}
                value={
                  software.company.name
                    ? {
                        value: software.company.companyID,
                        label: software.company.name,
                      }
                    : null
                }
                onChange={(selectedOption) => {
                  const selectedCompany = companyData.find(
                    (company) => company.companyID === selectedOption.value
                  );
                  setSoftware({
                    ...software,
                    company: {
                      companyID: selectedCompany.companyID,
                      name: selectedCompany.name,
                      location: selectedCompany.location,
                      phone: selectedCompany.phone,
                      website: selectedCompany.website,
                      logo_link: selectedCompany.logo_link,
                      email: selectedCompany.email,
                    },
                  });
                }}
                onCreateOption={(inputValue) =>
                  setSoftware({
                    ...software,
                    company: {
                      companyID: companyData.length + 1,
                      name: inputValue,
                      location: "",
                      phone: "",
                      website: "",
                      logo_link: "",
                      email: "",
                    },
                  })
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
              {" "}
              <div>
                <label>Díjazás:</label>
                {software.remunerations.map((remuneration, index) => (
                  <div key={index} className="mb-4">
                    <CreatableSelect
                      options={levelsData.map((level) => ({
                        value: level,
                        label: level,
                      }))}
                      value={
                        remuneration.level
                          ? {
                              value: remuneration.level,
                              label: remuneration.level,
                            }
                          : null
                      }
                      onChange={(selectedOption) =>
                        handleSelectChange(index, "level", selectedOption)
                      }
                      placeholder="Szint"
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
                    <CreatableSelect
                      options={typesData.map((type) => ({
                        value: type,
                        label: type,
                      }))}
                      value={
                        remuneration.type
                          ? {
                              value: remuneration.type,
                              label: remuneration.type,
                            }
                          : null
                      }
                      onChange={(selectedOption) =>
                        handleSelectChange(index, "type", selectedOption)
                      }
                      placeholder="Típus"
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
                      placeholder="Ár"
                      className="mb-4 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveRemuneration(index)}
                      className="bg-red-500 text-white py-2 px-3 rounded-md mb-4"
                    >
                      Díjazás törlése
                    </button>
                  </div>
                ))}
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      setSoftware({
                        ...software,
                        remunerations: [
                          ...software.remunerations,
                          {
                            remunerationID: software.remunerations.length,
                            level: "",
                            type: "",
                            price: 0,
                          },
                        ],
                      })
                    }
                    className="bg-gray-500 text-white py-2 px-3 rounded-md mt-2 mb-2"
                  >
                    Díjazás hozzáadása
                  </button>
                </div>
              </div>{" "}
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
