import React, { useState, useEffect } from "react";
import "../css/softwareList.css";
import "../css/Navbar.css";
import "../css/dropDown.css";
import { useParams } from "react-router-dom";
import { transliterate } from "./api/transliteration";
import { get } from "./api/api";
import { showToast } from "./toasts/toast";
import Pagination from "./pagination";
import CompareSvg from "./assets/CompareSvg";

const Compare = () => {
  const { Maincategory, Subcategory } = useParams();

  const [currentMainCategoryName, setCurrentMainCategoryName] = useState("");
  const [currentSubCategoryName, setCurrentSubCategoryName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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

  const filterSoftwareData = () => {
    const filteredData = SoftwareData.filter((software) =>
      software.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // Limit to the top 5 results
    const top5Results = filteredData.slice(0, 5);
    setFilteredSoftwareData(top5Results);
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
        className="w-1/5 bg-white px-8 py-10 rounded-40 mr-4 ml-4 shadow-lg border border-gray-400"
        style={{ height: "100%", marginTop: "6.3%" }}
      >
        <h2 className="text-lg font-semibold mb-4 hover-scale-element:hover hover-scale-element">
          Szoftver kategóriák
        </h2>
        <ul>
          {MainCategoryData.map((mainCategory, index) => (
            <h1 key={index}>
              <button
                onClick={() => setCurrentMainCategoryName(mainCategory.name)}
                className={`w-full block text-left pl-6 pr-4 my-1 py-3 text-black hover:text-white rounded-25 hover:bg-gray-600 hover:opacity-100 ${
                  currentMainCategoryName === mainCategory.name
                    ? "bg-gray-600 opacity-100 text-white"
                    : ""
                }`}
              >
                {mainCategory.name}
              </button>
            </h1>
          ))}
        </ul>
      </div>
      <div>
        {!currentMainCategoryName ? (
          <div className="flex FadeInSmall" style={{ marginLeft: "8%" }}>
            <CompareSvg />
          </div>
        ) : (
          <div>
            {!isCompareSoftwares ? (
              <div className="w-4/5 p-4 bg-gray-200 rounded-40">
                <h1 className="text-2xl text-black font-semibold mb-8 mt-2 ml-12 hover-scale-element:hover hover-scale-element">
                  {currentMainCategoryName}
                </h1>
                <div className="flex-grow px-8 relative">
                  <div className="relative mb-3 ">
                    <input
                      type="text"
                      placeholder="Keresés"
                      className="pl-5 pr-5 pt-2 pb-2 rounded-lg bg-gray-700 text-white focus:outline-none w-4/5 hover-scale-small hover-scale-small:hover"
                      value={searchQuery}
                      onChange={handleInputChange}
                    />
                  </div>
                  {searchQuery && (
                    <div className="absolute left-0 mt-2 z-10 bg-white rounded-lg shadow-md w-full">
                      {filteredSoftwareData
                        .filter(
                          (category) =>
                            category.category.name === currentMainCategoryName
                        )
                        .map((software) => (
                          <button
                            key={software.softwareID}
                            className="block w-full px-4 py-2 hover:bg-gray-200 text-gray-800 hover:text-black hover:rounded-lg"
                            onClick={() =>
                              handleChooseSoftware(software.softwareID - 1)
                            }
                          >
                            {software.name}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
                {selectedSoftwares.map((id) => (
                  <div
                    onClick={() => removeSelectedSoftware(id)}
                    className="shadow-custom px-3 py-2 my-1 w-4/5 cursor-pointer rounded-25 flex flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small"
                  >
                    <button className="text-lg rounded-25">
                      {SoftwareData[id].name}{" "}
                      <i class="bi bi-x-circle text-xl text-red-600"></i>
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
            ) : (
              <div>
                {isCompareSoftwares ? (
                  <button
                    onClick={handleClickOnCompare}
                    className="bg-yellow-400 text-black px-6 py-3 mr-5  rounded-full hover:bg-yellow-500 hover:text-black mt-8 text-lg hover-scale-small:hover hover-scale-small"
                  >
                    Vissza
                  </button>
                ) : null}
              </div>
            )}
          </div>
        )}
      </div>

      {isCompareSoftwares && !(selectedSoftwares === null) ? (
        <table class="container ">
          <thead>
            {selectedSoftwares.map((id) => (
              <th className="text-xl">{SoftwareData[id].name}</th>
            ))}
            <th></th>
          </thead>
          <b>Funkciók: </b>
          <tbody>
            {selectedSoftwares.map((id) => (
              <td className="">
                {SoftwareData[id].functions.map((func) => (
                  <tr
                    className={`"shadow-custom p-2 my-0.5 rounded-25 flex  flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small ${
                      func.sfunction ? "bg-green-200" : "bg-red-400"
                    }`}
                  >
                    {func.functionality}
                  </tr>
                ))}
              </td>
            ))}
          </tbody>
          <b>Kompabilitás: </b>
          <tbody>
            {selectedSoftwares.map((id) => (
              <td>
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
          <b>Szoftver nyelve: </b>
          <tbody>
            {selectedSoftwares.map((id) => (
              <td>
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
          <b>Operációs rendszerek: </b>
          <tbody>
            {selectedSoftwares.map((id) => (
              <td>
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
          <b>Támogatás nyelve: </b>
          <tbody>
            {selectedSoftwares.map((id) => (
              <td>
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
