import React, { useState, useEffect } from "react";
import "../../css/softwareList.css";
import "../../css/Navbar.css";
import "../../css/dropDown.css";
import { useParams } from "react-router-dom";
import { transliterate } from "../api/transliteration";
import { get } from "../api/api";
import { showToast } from "../toasts/toast";
// import Pagination from "../Pagination/pagination";
import CompareSvg from "../assets/CompareSvg";
import NotFoundSvg from "../assets/NotFoundSvg";

const Compare = () => {
  const { Maincategory, Subcategory } = useParams();

  const [currentMainCategoryName, setCurrentMainCategoryName] = useState("");
  const [currentSubCategoryName, setCurrentSubCategoryName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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
      for (let index = 0; index < SoftwareData[id].functions.length; index++) {
        const isFunctionContanin = selectedSoftwareFunctions.some((element) => {
          if (element === SoftwareData[id].functions[index]) {
            return true;
          } else {
            return false;
          }
        });
        if (!isFunctionContanin) {
          setselectedSoftwareFunctions((current) => [
            ...current,
            SoftwareData[id].functions[index],
          ]);
        }
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
    const filteredData = SoftwareData.filter((software) =>
      software.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Limit to the top 5 results
    // const top5Results = filteredData.slice(0, 5);
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

  useEffect(() => {
    filterSoftwareData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

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
    console.log("softwaare", SoftwareData);
  }, [SoftwareData]);

  const [MainCategoryData, setMainCategoryData] = useState([]);
  useEffect(() => {
    get
      .Category()
      .then((data) => {
        setMainCategoryData(data);
      })
      .catch((error) => {
        showToast("Hiba történt az adatok lekérése közben", "error");
      });
  }, []);

  useEffect(() => {
    setSelectedFunctions([]); // Reset when URL changes
    setSelectedCompatibility([]); // Reset when URL changes
    setSelectedLanguage([]); // Reset when URL changes
    setSelectedOs([]); // Reset when URL changes
    setSelectedSupport([]); // Reset when URL changes
  }, [Maincategory, Subcategory]);

  useEffect(() => {
    console.log(selectedFunctions);
    console.log(selectedCompatibility);
    console.log(selectedLanguage);
    console.log(selectedOs);
  });

  useEffect(() => {
    if (!Maincategory) {
      // If Maincategory is empty, set both CurrentMainCategoryName and CurrentSubCategoryName to empty
      setCurrentMainCategoryName("");
      setCurrentSubCategoryName("");
    } else {
      // Find the matching main category in SoftwareData
      const mainCategoryMatch = SoftwareData.find(
        (software) =>
          transliterate(software.category.categoryGroup.name) ===
          transliterate(Maincategory)
      );

      if (mainCategoryMatch) {
        setCurrentMainCategoryName(
          mainCategoryMatch.category.categoryGroup.name
        );
      }

      if (Subcategory) {
        // Find the matching main category in SoftwareData
        const subCategoryMatch = SoftwareData.find(
          (software) =>
            transliterate(software.category.name) === transliterate(Subcategory)
        );

        if (subCategoryMatch) {
          setCurrentSubCategoryName(subCategoryMatch.category.name);
        }
      }
    }
  }, [Maincategory, Subcategory, SoftwareData]);

  return (
    <div className="flex min-h-screen bg-gray-200 py-8 px-8 FadeInSmall">
      <div
        className="w-1/4 bg-white p-10 rounded-25 mr-4 ml-4 shadow-lg border border-gray-400"
        style={{ height: "100%", marginTop: "6.3%", minWidth: "300px" }}
      >
        <h2 className="text-lg font-semibold mb-4 hover-scale-element:hover hover-scale-element">
          Szoftver kategóriák
        </h2>
        <ul>
          {MainCategoryData.map((mainCategory, index) => (
            <h1 key={index}>
              <button
                onClick={() => [setCurrentMainCategoryName(mainCategory.name), handleClickOnCompareList()]}
                className={`text-lg text-white my-1 p-2 rounded-xl text-center effect effect-5 hover:bg-gray-700 bg-gray-600 transition-class ${
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
          <div className="flex flex-col align-center p-5">
            <div className="mb-20 text-center text-white bg-gray-800 py-6 mt-0 rounded-full hover-scale-small:hover">
              <p className="p-2">
                Használja a szoftver összehasonlító modulunkat és találja meg
                számára a legmegefelőbbet. Hasonlítsa össze a szoftvereinket
                funkció, kompabilitás, nyelv, operációs rendszer és még sok más
                szempont alapján.
              </p>
            </div>
            <div></div>
            <div className="m-auto w-1/2">
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
                <div className="w-3/5 px-8 relative float-left">
                  <div className="relative mb-3 ">
                    <input
                      type="text"
                      placeholder="Keresés"
                      className="pl-5 pr-16 pt-2 pb-2 rounded-lg bg-gray-700 text-white focus:outline-none w-full"
                      value={searchQuery}
                      onChange={handleInputChange}
                      //   onFocus={handleSearchFocus}
                      //   onClick={handleClickIn}
                    />
                  </div>
                  {(searchQuery || !searchQuery) && (
                    <div
                      className="absolute mt-2 z-10 bg-white rounded-lg shadow-md max-h-96 overflow-y-auto p-4"
                      style={{
                        width: "85%",
                        maxHeight: "32rem",
                      }}
                      //   ref={parent}
                    >
                      {filteredSoftwareData.length > 0 ? (
                        filteredSoftwareData
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
                          ))
                      ) : (
                        <div className="text-black text-center text-2xl">
                          Nem található szoftver.
                          <div
                            className="mt-6 items-center"
                            style={{
                              width: "70%",
                              marginLeft: "auto",
                              marginRight: "auto",
                            }}
                          >
                            <NotFoundSvg />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div className="w-2/5 px-8 relative float-left">
                  {selectedSoftwares.map((id) => (
                    <div
                      onClick={() => removeSelectedSoftware(id)}
                      className="shadow-custom  w-full px-3 py-2 my-2 w-4/5 cursor-pointer rounded-25 flex flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small"
                      style={{ height: "100px" }}
                    >
                      <button className="text-lg rounded-25">
                        {SoftwareData[id].name}{" "}
                        {/* <i class="bi bi-x-circle text-xl text-red-600"></i> */}
                        <text className="text-right text-red-500 font-bold">
                          X
                        </text>
                      </button>
                    </div>
                  ))}
                  {selectedSoftwares.length >= 2 ? (
                    <button
                      onClick={handleClickOnCompare}
                      className="bg-yellow-400 text-black px-6 py-3 rounded-full hover:bg-yellow-500 hover:text-black mt-8 text-lg hover-scale-small:hover hover-scale-small"
                    >
                      Összehasonlítás
                    </button>
                  ) : null}
                </div>
              </div>
            ) : (
              <div>
                {isCompareSoftwares ? (
                  <button
                    onClick={handleClickOnCompare}
                    className="bg-yellow-400 text-black px-6 py-3 mr-5   rounded-full hover:bg-yellow-500 hover:text-black mt-8 text-lg hover-scale-small:hover hover-scale-small"
                  >
                    Vissza
                  </button>
                ) : null}
              </div>
            )}
          </div>
        </div>
      )}

      {isCompareSoftwares && !(selectedSoftwares === null) ? (
        <table class="container">
          <thead>
            {selectedSoftwares.map((id) => (
              <th className="text-xl">{SoftwareData[id].name}</th>
            ))}
            <th></th>
          </thead>
          <b className="text-xl">Funkciók: </b>
          <tbody>
            {selectedSoftwares.map((id) => (
              <td className="p-3">
                {SoftwareData[id].functions.map((func) => (
                  <tr
                    className={`"shadow-custom p-2 my-0.5 rounded-25 flex  flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small ${
                      func.sfunction ? "bg-green-200" : "bg-red-400"
                    }`}
                    style={{ height: "50px" }}
                  >
                    {func.functionality}
                  </tr>
                ))}
              </td>
            ))}
          </tbody>
          <b className="text-xl">Kompabilitás: </b>
          <tbody>
            {selectedSoftwares.map((id) => (
              <td className="p-3">
                {CompatibilityData.map((comp) => (
                  <tr
                    className={` "shadow-custom p-2 my-0.5 rounded-25 flex flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small ${
                      SoftwareData[id].devices.includes(comp)
                        ? "bg-green-200"
                        : "bg-red-400"
                    }`}
                  >
                    {comp}
                  </tr>
                ))}
              </td>
            ))}
          </tbody>
          <b className="text-xl">Szoftver nyelve: </b>
          <tbody>
            {selectedSoftwares.map((id) => (
              <td className="p-3">
                {LanguageData.map((lang) => (
                  <tr
                    className={`"shadow-custom p-2 my-0.5 rounded-25 flex flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small ${
                      SoftwareData[id].languages.includes(lang)
                        ? "bg-green-200"
                        : "bg-red-400"
                    }`}
                  >
                    {lang}
                  </tr>
                ))}
              </td>
            ))}
          </tbody>
          <b className="text-xl">Operációs rendszerek: </b>
          <tbody>
            {selectedSoftwares.map((id) => (
              <td className="p-3">
                {OsData.map((os) => (
                  <tr
                    className={`"shadow-custom p-2 my-0.5 rounded-25 flex flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small ${
                      SoftwareData[id].oSs.includes(os)
                        ? "bg-green-200"
                        : "bg-red-400"
                    }`}
                  >
                    {os}
                  </tr>
                ))}
              </td>
            ))}
          </tbody>
          <b className="text-xl">Támogatás nyelve: </b>
          <tbody>
            {selectedSoftwares.map((id) => (
              <td className="p-3">
                {SupportData.map((supp) => (
                  <tr
                    className={`"shadow-custom p-2 my-0.5 rounded-25 flex flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small ${
                      SoftwareData[id].supports.includes(supp)
                        ? "bg-green-200"
                        : "bg-red-400"
                    }`}
                  >
                    {supp}
                  </tr>
                ))}
              </td>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default Compare;
