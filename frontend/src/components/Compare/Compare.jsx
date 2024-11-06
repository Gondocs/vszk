/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/softwareList.css";
import "../../css/Navbar.css";
import "../../css/dropDown.css";
import { useParams } from "react-router-dom";
import { transliterate } from "../api/transliteration";
import { get, post } from "../api/api";
import { showToast } from "../toasts/toast";
// import Pagination from "../Pagination/pagination";
import CompareSvg from "../assets/CompareSvg";
import StarIcon from "@mui/icons-material/Star";

const Compare = () => {

  const [currentMainCategoryName, setCurrentMainCategoryName] = useState("");
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
  const [ComparisonData, setComparisonData] = useState([]);

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

  const handleClickOnCompareList = () => {
    setIsCompareSoftwares(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
    const isContain = selectedSoftwares.some((element) => element === id);

    if (selectedSoftwares.length >= 4) {
      showToast("Egyszerre csak 4 szoftvert lehet összehasonlítani!", "error");
    } else if (!isContain) {
      setselectedSoftwares((current) => [...current, id]);

      const newFunctions = SoftwareData.find(
        (software) => software.softwareID === id
      ).functions.filter((func) => !selectedSoftwareFunctions.includes(func));

      if (newFunctions.length > 0) {
        setselectedSoftwareFunctions((current) => [
          ...current,
          ...newFunctions,
        ]);
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
    if (!isCompareSoftwares) {
      post
        .GetSoftwaresByIDs(selectedSoftwares)
        .then((data) => {
          console.log(data);
          setComparisonData(data);
        })
        .catch((error) => {
          showToast("Hiba történt az adatok lekérése közben", "error");
          console.log(error);
        });
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

  const renderStars = (count) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon
            key={i}
            style={{
              color: i <= count ? "rgb(255, 210, 48)" : "#ccc",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-200 py-8 px-8 FadeInSmall">
      {!isCompareSoftwares && (
        <div
          className="w-1/3 bg-white p-10 rounded-lg mr-4 ml-4 shadow-lg border border-gray-400"
          style={{ height: "100%", marginTop: "6.3%", minWidth: "300px" }}
        >
          <h2 className="text-xl font-semibold mb-4 hover-scale-element:hover hover-scale-element">
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
                  className={`text-lg text-white my-1 p-3 rounded-xl text-center effect effect-5 hover:bg-gray-600 bg-gray-700 transition-class ${
                    currentMainCategoryName === mainCategory.name
                      ? "bg-gray-700 opacity-100 text-white"
                      : ""
                  }`}
                >
                  {mainCategory.name}
                </button>
              </h1>
            ))}
          </ul>
        </div>
      )}

      {!currentMainCategoryName ? (
        <div className="m-auto">
          <div className="flex flex-col align-center p-5 pt-10 bg-white rounded-lg mr-4 ml-4 shadow-lg border border-gray-400">
            <div className="mb-20 text-center text-white bg-gray-800 py-6 mt-0 rounded-lg">
              <p className="p-2 text-lg px-16">
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
                              handleChooseSoftware(software.softwareID)
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
                                    maxHeight: "200px",
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
                  {selectedSoftwares.map((id) => {
                    const software = SoftwareData.find(
                      (software) => software.softwareID === id
                    );
                    return (
                      <div
                        key={id}
                        onClick={() => removeSelectedSoftware(id)}
                        className="shadow-custom bg-white px-3 py-2 my-5 w-full cursor-pointer rounded-lg flex items-center justify-center text-center hover-scale-small:hover hover-scale-small"
                        style={{ height: "100px" }}
                      >
                        <div className="w-1/3 flex items-center justify-center">
                          <img
                            style={{
                              width: "auto",
                              height: "auto",
                              maxHeight: "150px",
                            }}
                            src={software.logo_link}
                            alt="Software Logo"
                            className="h-full object-contain p-8"
                          />
                        </div>
                        <div className="w-1/3 flex items-center justify-center">
                          <span className="text-2xl">{software.name}</span>
                        </div>
                        <div className="w-1/3 flex items-center justify-center">
                          <button className="text-2xl rounded-lg text-red-500 font-bold">
                            X
                          </button>
                        </div>
                      </div>
                    );
                  })}
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
                    <div className="flex justify-center"> {/* Add this div */}
                      <table className="container">
                        <thead className="mb-5">
                          <tr>
                            {ComparisonData.map((software) => (
                              <th
                                className="text-3xl text-center"
                                key={software.softwareID}
                              >
                                <div className="flex flex-col items-center mt-8 mb-5">
                                  <span className="mb-10">{software.name}</span>
                                  <img
                                    src={software.logo_link}
                                    alt={`${software.name} logo`}
                                    style={{
                                      width: "auto",
                                      height: "auto",
                                      maxHeight: "150x",
                                      maxWidth: "200px",
                                    }}
                                  />
                                  <div className="mt-2">
                                    {renderStars(software.average_stars)}
                                  </div>
                                </div>
                              </th>
                            ))}
                            <th></th>
                          </tr>
                        </thead>
                        <b className="text-2xl">Funkciók: </b>
                        <tbody>
                          {ComparisonData.map((software) => (
                            <td className="p-3 align-top">
                              {software.functions
                                .filter((func) => func.sfunction)
                                .map((func, index) => {
                                  const countSame = ComparisonData.filter((s) =>
                                    s.functions.some(
                                      (f) =>
                                        f.functionality === func.functionality &&
                                        f.sfunction
                                    )
                                  ).length;
                                  const isUnique = countSame < 2;

                                  return (
                                    <tr
                                      key={index}
                                      className={`shadow-custom p-2 my-1.5 w-full rounded-lg flex text-xl text-black font-semibold flex-col items-center justify-center text-center ${
                                        isUnique
                                          ? "bg-green-200"
                                          : "bg-gray-200"
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
                        <b className="text-2xl ">Kompabilitás: </b>
                        <tbody>
                          {ComparisonData.map((software) => (
                            <td className="p-3 align-top">
                              {software.devices.map((device, index) => {
                                const countSame = ComparisonData.filter(
                                  (s) =>
                                    s.devices.includes(device) ===
                                    software.devices.includes(device)
                                ).length;
                                const isUnique = countSame < 2;

                                return (
                                  <tr
                                    key={index}
                                    className={`shadow-custom p-2 my-1.5 rounded-lg text-xl text-black font-semibold flex flex-col items-center justify-center text-center ${
                                      isUnique ? "bg-green-200" : "bg-gray-200"
                                    }`}
                                    style={{ height: "80px" }}
                                  >
                                    {device}
                                  </tr>
                                );
                              })}
                            </td>
                          ))}
                        </tbody>
                        <b className="text-2xl">Szoftver nyelve: </b>
                        <tbody>
                          {ComparisonData.map((software) => (
                            <td className="p-3 align-top">
                              {software.languages.map((lang, index) => {
                                const countSame = ComparisonData.filter(
                                  (s) =>
                                    s.languages.includes(lang) ===
                                    software.languages.includes(lang)
                                ).length;
                                const isUnique = countSame < 2;

                                return (
                                  <tr
                                    key={index}
                                    className={`shadow-custom p-2 my-1.5 rounded-lg flex text-xl text-black font-semibold flex-col items-center justify-center text-center ${
                                      isUnique ? "bg-green-200" : "bg-gray-200"
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
                          {ComparisonData.map((software) => (
                            <td className="p-3 align-top">
                              {software.oSs.map((os, index) => {
                                const countSame = ComparisonData.filter(
                                  (s) =>
                                    s.oSs.includes(os) ===
                                    software.oSs.includes(os)
                                ).length;
                                const isUnique = countSame < 2;

                                return (
                                  <tr
                                    key={index}
                                    className={`shadow-custom p-2 my-1.5 rounded-lg flex text-xl text-black font-semibold flex-col items-center justify-center text-center ${
                                      isUnique ? "bg-green-200" : "bg-gray-200"
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
                          {ComparisonData.map((software) => (
                            <td className="p-3 align-top">
                              {software.supports.map((support, index) => {
                                const countSame = ComparisonData.filter(
                                  (s) =>
                                    s.supports.includes(support) ===
                                    software.supports.includes(support)
                                ).length;
                                const isUnique = countSame < 2;

                                return (
                                  <tr
                                    key={index}
                                    className={`shadow-custom p-2 my-1.5 rounded-lg flex text-xl text-black font-semibold flex-col items-center justify-center text-center ${
                                      isUnique ? "bg-green-200" : "bg-gray-200"
                                    }`}
                                    style={{ height: "80px" }}
                                  >
                                    {support}
                                  </tr>
                                );
                              })}
                            </td>
                          ))}
                        </tbody>
                      </table>
                    </div> {/* Close the added div */}
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
