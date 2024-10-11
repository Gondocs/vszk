/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/softwareList.css";
import "../../css/Navbar.css";
import "../../css/dropDown.css";
import { useParams } from "react-router-dom";
import { transliterate } from "../api/transliteration";
import { get } from "../api/api";
import { showToast } from "../toasts/toast";
// import Pagination from "../Pagination/pagination";
import CompareSvg from "../assets/CompareSvg";

const Compare = () => {
  const { Maincategory, Subcategory } = useParams();

  const [currentMainCategoryName, setCurrentMainCategoryName] = useState("");
  const [currentSubCategoryName, setCurrentSubCategoryName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  // const [ClickedSearch, setClickedSearch] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [filteredSoftwareData, setFilteredSoftwareData] = useState([]);
  const [selectedSoftwares, setselectedSoftwares] = useState([]);
  const [selectedSoftwareFunctions, setselectedSoftwareFunctions] = useState(
    []
  );
  const [isCompareSoftwares, setIsCompareSoftwares] = useState(false);

  const [SoftwareData, setSoftwareData] = useState([]);
  const [FunctionsData, setFunctionsData] = useState([]);
  const [CompatibilityData, setCompatibilityData] = useState([]);
  const [LanguageData, setLanguageData] = useState([]);
  const [OsData, setOsData] = useState([]);
  const [SupportData, setSupportData] = useState([]);

  const [selectedFunctions, setSelectedFunctions] = useState([]);
  const [selectedCompatibility, setSelectedCompatibility] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedOs, setSelectedOs] = useState([]);
  const [selectedSupport, setSelectedSupport] = useState([]);
  const searchnavigate = useNavigate();
  const [MainCategoryData, setMainCategoryData] = useState([]);

  const [loading, setLoading] = useState(true);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    if (!isSearchFocused) {
      setIsSearchFocused(true);
    }
  };
  const handleClickIn = (e) => {
    setSearchQuery(e.target.value);
    if (!isSearchFocused) {
      setIsSearchFocused(true);
    }
  };
  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };
  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 250); // Delay for 250 milliseconds (0.25 seconds) NEEDS IN ORDER TO CLICK ON THE LINKS
  };
  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      // Redirect to the SoftwareList component with the search query
      searchnavigate(`/szoftverek?search=${searchQuery}`);
      setIsSearchFocused(false);
    }
  };

  const handleChooseSoftware = (id) => {
    const isContanin = selectedSoftwares.some((element) => {
      if (element === id) {
        return true;
      } else {
        return false;
      }
    });

    //------------------Compare functions-----------------------
    if (selectedSoftwares.length >= 4) {
      showToast("Egyszerre csak 4 szoftvert lehet összehasonlítani!", "error");
    } else if (!isContanin) {
      setselectedSoftwares((current) => [...current, id]);
    
      const newFunctions = SoftwareData[id].functions.filter((func) => 
        !selectedSoftwareFunctions.includes(func)
      );
    
      if (newFunctions.length > 0) {
        setselectedSoftwareFunctions((current) => [...current, ...newFunctions]);
      }
    
      console.log("funkciók: ", selectedSoftwareFunctions);
    } else {
      showToast("Ez a szoftver már ki lett választva!", "error");
    }
    
    setSearchQuery(""); // Clear the search query on link click
  };

  
  const removeSelectedSoftware = (id) => {
    setselectedSoftwares((current) =>
      current.filter((thisId) => {
        return thisId !== id;
      })
    );
    setSearchQuery(""); // Clear the search query on link click
  };
  const handleClickOnCompare = () => {
    setIsCompareSoftwares(!isCompareSoftwares);
  };
  const handleClickOnCompareList = () => {
    if (isCompareSoftwares) {
      setIsCompareSoftwares(!isCompareSoftwares);
    }
  };

  const filterSoftwareData = () => {
    if (searchQuery.trim().length === 0) {
      setFilteredSoftwareData(SoftwareData);
      return;
    }

    const filteredData = SoftwareData.filter((software) => {
      return software.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setFilteredSoftwareData(filteredData);
  };
  useEffect(() => {
    get
      .GettAllInfos()
      .then((data) => {
        setSoftwareData(data);
        filterSoftwareData();
      })
      .catch((error) => {
        showToast("Hiba történt az adatok lekérése közben", "error");
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterSoftwareData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const handleSearchClick = () => {
    // Filter the software data when the search input is clicked
    filterSoftwareData(searchQuery);
  };

  useEffect(() => {
    get
      .SoftwareAll()
      .then((data) => {
        setSoftwareData(data);
        setLoading(false);
      })
      .catch((error) => {
        showToast("Hiba történt az adatok lekérése közben", "error");
        console.log(error);
        setLoading(false);
      });

    get
      .GetAllWithFunctions()
      .then((functionsData) => {
        setFunctionsData(functionsData);
      })
      .catch((error) => {
        showToast(
          "Hiba történt az adatok lekérése közben (AllFunctions)",
          "error"
        );
        console.log(error);
      });

    get
      .SoftwareCompConnect()
      .then((compatibiliyData) => {
        setCompatibilityData(compatibiliyData);
      })
      .catch((error) => {
        showToast("Hiba történt az adatok lekérése közben", "error");
        console.log(error);
      });

    get
      .SoftwareLangConnect()
      .then((LanguageData) => {
        setLanguageData(LanguageData);
      })
      .catch((error) => {
        showToast("Hiba történt az adatok lekérése közben", "error");
        console.log(error);
      });

    get
      .SoftwareOSConnect()
      .then((OsData) => {
        setOsData(OsData);
      })
      .catch((error) => {
        showToast("Hiba történt az adatok lekérése közben", "error");
        console.log(error);
      });

    get
      .Support()
      .then((SupportData) => {
        setSupportData(SupportData);
      })
      .catch((error) => {
        showToast("Hiba történt az adatok lekérése közben", "error");
        console.log(error);
      });
  }, []);

  useEffect(() => {
    get
      .Category()
      .then((data) => {
        setMainCategoryData(data);
      })
      .catch((error) => {
        showToast("Hiba történt az adatok lekérése közben", "error");
        console.log(error);
      });

  }, []);

  return (
    <div className="flex min-h-screen bg-gray-200 py-8 px-8 FadeInSmall">
      <div
        className="w-1/4 bg-white p-10 rounded-lg mr-4 ml-4 shadow-lg border border-gray-400"
        style={{ height: "100%", marginTop: "6.3%", minWidth: "300px" }}
      >
        <h2 className="text-3xl font-semibold mb-4 hover-scale-element:hover hover-scale-element">
          Szoftver kategóriák
        </h2>
        <ul>
          {MainCategoryData.map((mainCategory, index) => (
            <h1 key={index}>
              <button
                onClick={() => [
                  setCurrentMainCategoryName(mainCategory.name),
                  handleClickOnCompareList(),
                ]}
                className={`text-xl text-white my-1 p-3 rounded-xl text-center effect effect-5 hover:bg-gray-700 bg-gray-600 transition-class ${
                  currentMainCategoryName === mainCategory.name
                    ? "bg-gray-800 opacity-100 text-white"
                    : ""
                }`}
              >
                {mainCategory.name}
              </button>
            </h1>
          ))}
        </ul>
      </div>

      {!currentMainCategoryName ? (
        <div className="m-auto">
          <div className="flex flex-col align-center p-5 pt-10 bg-white rounded-lg mr-4 ml-4 shadow-lg border border-gray-400">
            <div className="mb-20 text-center text-white bg-gray-800 py-6 mt-0 rounded-lg hover-scale-small:hover">
              <p className="p-2 text-2xl px-16">
                Használja a szoftver összehasonlító modulunkat és találja meg
                számára a legmegefelőbbet.<br></br> <br></br> Hasonlítsa össze a
                szoftvereinket funkció, kompabilitás, nyelv, operációs rendszer
                és még sok más szempont alapján.
              </p>
            </div>
            <div className="m-auto w-auto">
              <CompareSvg />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full">
          <div className="">
            {!isCompareSoftwares ? (
              <div className="p-4 bg-gray-200 rounded-40 flex-col">
                <h1 className="text-2xl text-black  font-semibold mb-8 mt-2 ml-12 hover-scale-element:hover hover-scale-element">
                  {currentMainCategoryName}
                </h1>
                <div className="w-full  relative float-left">
                  <div className="relative mb-3 ">
                    <input
                      type="text"
                      placeholder="Keresés"
                      className="py-3 pl-4 rounded-lg text-xl bg-gray-700 text-white focus:outline-none w-full"
                      value={searchQuery}
                      onChange={handleInputChange}
                      onFocus={handleSearchFocus}
                      onBlur={handleSearchBlur}
                      onKeyDown={handleSearchEnter}
                      onClick={handleSearchClick}
                    />
                  </div>
                  {isSearchFocused && searchQuery.length >= 0 && (
                    <div
                      className="absolute mt-2 z-10 bg-white rounded-lg shadow-md max-h-96 overflow-y-auto p-4"
                      style={{
                        width: "100%",
                        maxHeight: "32rem",
                      }}
                    >
                      {filteredSoftwareData
                        .filter(
                          (category) =>
                            category.category.name === currentMainCategoryName
                        )
                        .map((software) => (
                          <button
                            key={software.softwareID}
                            className="flex w-full items-center px-4 py-2 hover:bg-gray-200 text-gray-800 hover:text-black hover:rounded-lg"
                            onClick={() =>
                              handleChooseSoftware(software.softwareID - 1)
                            }
                            style={{ height: "130px" }}
                          >
                            <div className="w-1/3">
                              <div className="flex items-center justify-center">
                                <img
                                  src={software.logo_link}
                                  alt={software.name}
                                  className=""
                                  style={{
                                    width: "auto",
                                    height: "auto",
                                    maxHeight: "80px",
                                    paddingLeft: "30%",
                                  }}
                                />
                              </div>
                            </div>
                            <div
                              className="w-2/3 text-2xl font-semibold"
                              style={{ paddingLeft: "20%" }}
                            >
                              {software.name}
                              <br />
                              <div className="text-base mt-1">
                                {software.category.name}
                              </div>
                            </div>
                          </button>
                        ))}
                    </div>
                  )}
                </div>
                <div className="w-full px-8 relative float-left">
                  {selectedSoftwares.map((id) => (
                    <div
                      onClick={() => removeSelectedSoftware(id)}
                      className="shadow-custom bg-white px-3 py-2 my-5 w-full cursor-pointer rounded-lg flex items-center justify-center text-center hover-scale-small:hover hover-scale-small"
                      style={{ height: "100px" }}
                    >
                      <div className="w-1/3 flex items-center justify-center">
                        <img
                          src={SoftwareData[id].logo_link}
                          alt="Software Logo"
                          className="h-full object-contain p-8"
                        />
                      </div>
                      <div className="w-1/3 flex items-center justify-center">
                        <span className="text-2xl">
                          {SoftwareData[id].name}
                        </span>
                      </div>
                      <div className="w-1/3 flex items-center justify-center">
                        <button className="text-2xl rounded-lg text-red-500 font-bold">
                          X
                        </button>
                      </div>
                    </div>
                  ))}
                  {selectedSoftwares.length >= 2 ? (
                    <div className="flex justify-center mt-8">
                      <button
                        onClick={handleClickOnCompare}
                        className="bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-500 hover:text-black text-2xl hover-scale-small:hover hover-scale-small"
                      >
                        Összehasonlítás
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              <div>
                {isCompareSoftwares && !(selectedSoftwares === null) ? (
                  <div className="">
                    <div className="flex justify-center">
                      <button
                        onClick={handleClickOnCompare}
                        className=" bg-yellow-400 text-black px-6 py-3 rounded-lg hover:bg-yellow-500 hover:text-black mt-8 text-2xl hover-scale-small:hover hover-scale-small"
                      >
                        Vissza
                      </button>
                    </div>
                    <table className="container">
                      <thead className="mb-5">
                        {selectedSoftwares.map((id) => (
                          <th className="text-3xl">{SoftwareData[id].name}</th>
                        ))}
                        <th></th>
                      </thead>
                      <b className="text-2xl">Funkciók: </b>
                      
                      <tbody>
                        {selectedSoftwares.map((id) => (
                          <td className="p-3 align-top">
                            <div>console.log(SoftwareData[id].functions)</div>
                            {SoftwareData[id].functions.map((func, index) => {
                              const allSame = selectedSoftwares.every(
                                (sid) =>
                                  SoftwareData[sid].functions[index]
                                    ?.sfunction ===
                                  SoftwareData[id].functions[index]?.sfunction
                              );
                              const isUnique = selectedSoftwares.some(
                                (sid) =>
                                  SoftwareData[sid].functions[index]
                                    ?.sfunction !==
                                  SoftwareData[id].functions[index]?.sfunction
                              );

                              return (
                                <tr
                                  key={index}
                                  className={`shadow-custom p-2 my-1.5 w-full rounded-lg flex text-xl text-black font-semibold flex-col items-center justify-center text-center ${
                                    allSame
                                      ? "bg-gray-200"
                                      : isUnique
                                      ? "bg-green-200"
                                      : ""
                                  }`}
                                  style={{ height: "80px" }}
                                >
                                  {func.functionality}
                                </tr>
                              );
                            })}
                          </td>
                        ))}
                      </tbody>
                      <b className="text-2xl">Kompabilitás: </b>
                      <tbody>
                        {selectedSoftwares.map((id) => (
                          <td className="p-3">
                            {CompatibilityData.map((comp, index) => {
                              const allSame = selectedSoftwares.every(
                                (sid) =>
                                  SoftwareData[sid].devices.includes(comp) ===
                                  SoftwareData[id].devices.includes(comp)
                              );
                              const isUnique = selectedSoftwares.some(
                                (sid) =>
                                  SoftwareData[sid].devices.includes(comp) !==
                                  SoftwareData[id].devices.includes(comp)
                              );

                              return (
                                <tr
                                  key={index}
                                  className={`shadow-custom p-2 my-1.5 rounded-lg text-xl text-black font-semibold flex flex-col items-center justify-center text-center ${
                                    allSame
                                      ? "bg-gray-200"
                                      : isUnique
                                      ? "bg-green-200"
                                      : ""
                                  }`}
                                  style={{ height: "80px" }}
                                >
                                  {comp}
                                </tr>
                              );
                            })}
                          </td>
                        ))}
                      </tbody>
                      <b className="text-2xl">Szoftver nyelve: </b>
                      <tbody>
                        {selectedSoftwares.map((id) => (
                          <td className="p-3">
                            {LanguageData.map((lang, index) => {
                              const allSame = selectedSoftwares.every(
                                (sid) =>
                                  SoftwareData[sid].languages.includes(lang) ===
                                  SoftwareData[id].languages.includes(lang)
                              );
                              const isUnique = selectedSoftwares.some(
                                (sid) =>
                                  SoftwareData[sid].languages.includes(lang) !==
                                  SoftwareData[id].languages.includes(lang)
                              );

                              return (
                                <tr
                                  key={index}
                                  className={`shadow-custom p-2 my-1.5 rounded-lg flex text-xl text-black font-semibold flex-col items-center justify-center text-center ${
                                    allSame
                                      ? "bg-gray-200"
                                      : isUnique
                                      ? "bg-green-200"
                                      : ""
                                  }`}
                                  style={{ height: "80px" }}
                                >
                                  {lang}
                                </tr>
                              );
                            })}
                          </td>
                        ))}
                      </tbody>
                      <b className="text-2xl">Operációs rendszerek: </b>
                      <tbody>
                        {selectedSoftwares.map((id) => (
                          <td className="p-3">
                            {OsData.map((os, index) => {
                              const allSame = selectedSoftwares.every(
                                (sid) =>
                                  SoftwareData[sid].oSs.includes(os) ===
                                  SoftwareData[id].oSs.includes(os)
                              );
                              const isUnique = selectedSoftwares.some(
                                (sid) =>
                                  SoftwareData[sid].oSs.includes(os) !==
                                  SoftwareData[id].oSs.includes(os)
                              );

                              return (
                                <tr
                                  key={index}
                                  className={`shadow-custom p-2 my-1.5 rounded-lg flex text-xl text-black font-semibold flex-col items-center justify-center text-center ${
                                    allSame
                                      ? "bg-gray-200"
                                      : isUnique
                                      ? "bg-green-200"
                                      : ""
                                  }`}
                                  style={{ height: "80px" }}
                                >
                                  {os}
                                </tr>
                              );
                            })}
                          </td>
                        ))}
                      </tbody>
                      <b className="text-2xl">Támogatás nyelve: </b>
                      <tbody>
                        {selectedSoftwares.map(
                          (id) => (
                            console.log("SELECTED: ", selectedSoftwares),
                            (
                              <td className="p-3">
                                {SupportData.map((supp, index) => {
                                  const allSame = selectedSoftwares.every(
                                    (sid) =>
                                      SoftwareData[sid].supports.includes(
                                        supp
                                      ) ===
                                      SoftwareData[id].supports.includes(supp)
                                  );
                                  const isUnique = selectedSoftwares.some(
                                    (sid) =>
                                      SoftwareData[sid].supports.includes(
                                        supp
                                      ) !==
                                      SoftwareData[id].supports.includes(supp)
                                  );

                                  return (
                                    <tr
                                      key={index}
                                      className={`shadow-custom p-2 my-1.5 rounded-lg flex text-xl text-black font-semibold flex-col items-center justify-center text-center ${
                                        allSame
                                          ? "bg-gray-200"
                                          : isUnique
                                          ? "bg-green-200"
                                          : ""
                                      }`}
                                      style={{ height: "80px" }}
                                    >
                                      {supp}
                                    </tr>
                                  );
                                })}
                              </td>
                            )
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Compare;
