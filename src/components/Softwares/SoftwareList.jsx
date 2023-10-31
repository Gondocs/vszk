/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import "../../css/softwareList.css";
import StarIcon from "@mui/icons-material/Star";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { transliterate } from "../api/transliteration";
import { ClipLoader } from "react-spinners";
import Pagination from "../Pagination/pagination";
// eslint-disable-next-line no-unused-vars
import { css } from "@emotion/react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import LanguageFilter from "./Filters/FilterButtons/LanguageFilter";
import CompatibilityFilter from "./Filters/FilterButtons/CompatibilityFilter";
import OsFilter from "./Filters/FilterButtons/OsFilter";
import SupportFilter from "./Filters/FilterButtons/SupportFilter";
import Functionfilter from "./Filters/FilterButtons/FunctionFilter";
import {} from "./SoftwareList";
import { SoftwareNotFound } from "../PageNotFound/SoftwareNotFound";
import { filterSoftwareData } from "./Filters/FilteredSoftwareData";
import { fetchData } from "./GetData/SoftwareListGetData";
import { CategoryNames } from "./Filters/CategoryNames";

const SoftwareList = () => {
  const [parent] = useAutoAnimate(/* optional config */);

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");

  const [searchTerm, setSearchTerm] = useState(searchQuery || "");
  const { Maincategory, Subcategory } = useParams();

  const [currentMainCategoryName, setCurrentMainCategoryName] = useState("");
  const [currentSubCategoryName, setCurrentSubCategoryName] = useState("");

  const [SoftwareData, setSoftwareData] = useState([]);
  const [FunctionsData, setFunctionsData] = useState([]);
  const [CompatibilityData, setCompatibilityData] = useState([]);
  const [LanguageData, setLanguageData] = useState([]);
  const [OsData, setOsData] = useState([]);
  const [SupportData, setSupportData] = useState([]);

  const [SelectedCompatibility, setSelectedCompatibility] =
    useState([]);

  const [selectedFunctions, setSelectedFunctions] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState([]);
  const [selectedOs, setSelectedOs] = useState([]);
  const [selectedSupport, setSelectedSupport] = useState([]);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const searchnavigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    query.set("search", searchTerm);
    searchnavigate({ search: query.toString() });
    console.log("url changed");
  }, [searchTerm, location.search, searchnavigate]);

  // Call the fetchData function inside the useEffect hook
  useEffect(() => {
    fetchData(
      setSoftwareData,
      setLoading,
      setFunctionsData,
      setCompatibilityData,
      setLanguageData,
      setOsData,
      setSupportData
    );
    console.log(searchQuery);
  }, []);

  useEffect(() => {
    console.log(SoftwareData);
  }, [SoftwareData]);

  const handleCompatibilityChange = (selectedCompatibility) => {
    setSelectedCompatibility(selectedCompatibility);
    setCurrentPage(1);
  };

  const handleLanguageChange = (selectedLanguage) => {
    setSelectedLanguage(selectedLanguage);
    setCurrentPage(1);
  };

  const handleOsChange = (selectedOs) => {
    setSelectedOs(selectedOs);
    setCurrentPage(1);
  };

  const filteredSoftwareData = filterSoftwareData(
    SoftwareData,
    Maincategory,
    Subcategory,
    searchTerm,
    selectedFunctions,
    SelectedCompatibility,
    selectedLanguage,
    selectedOs,
    selectedSupport
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSoftwareData = filteredSoftwareData.slice(
    startIndex,
    endIndex
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleFunctionClick = (func) => {
    if (selectedFunctions.includes(func)) {
      // Function is already selected, remove it
      setSelectedFunctions((prevSelected) =>
        prevSelected.filter((selected) => selected !== func)
      );
    } else {
      // Function is not selected, add it
      setSelectedFunctions((prevSelected) => [...prevSelected, func]);
    }
    setCurrentPage(1);
  };

  const handleOSClick = (OS) => {
    if (selectedOs.includes(OS)) {
      setSelectedOs((prevSelected) =>
        prevSelected.filter((selected) => selected !== OS)
      );
    } else {
      setSelectedOs((prevSelected) => [...prevSelected, OS]);
    }
    setCurrentPage(1);
  };

  const handleSupportClick = (Support) => {
    if (selectedSupport.includes(Support)) {
      setSelectedSupport((prevSelected) =>
        prevSelected.filter((selected) => selected !== Support)
      );
    } else {
      setSelectedSupport((prevSelected) => [...prevSelected, Support]);
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    setSelectedFunctions([]); // Reset when URL changes
    setSelectedLanguage([]); // Reset when URL changes
    setSelectedOs([]); // Reset when URL changes
    setSelectedSupport([]); // Reset when URL changes
  }, [Maincategory, Subcategory]);

  useEffect(() => {
    console.log(selectedFunctions);
    console.log(SelectedCompatibility);
    console.log(selectedLanguage);
    console.log(selectedOs);
  });

  CategoryNames(
    Maincategory,
    Subcategory,
    SoftwareData,
    setCurrentMainCategoryName,
    setCurrentSubCategoryName
  );

  const totalPages = Math.ceil(filteredSoftwareData.length / itemsPerPage);

  const paginationControls = (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      handlePageChange={handlePageChange}
    />
  );

  return (
    <div className="flex min-h-screen bg-gray-200 py-8 px-8 FadeInSmall">
      <div
        className="w-1/4 bg-white p-10 rounded-25 mr-4 ml-4 shadow-lg border border-gray-400"
        style={{ height: "100%", marginTop: "6.3%" }}
      >
        <h2 className="text-lg font-semibold mb-4 hover-scale-element:hover hover-scale-element">
          Szoftverkeresés
        </h2>
        <input
          type="text"
          placeholder="Szoftver neve..."
          className="border rounded-xl p-2 w-full hover-scale-element:hover hover-scale-element"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div>
          <Functionfilter
            FunctionsData={FunctionsData}
            Maincategory={Maincategory}
            Subcategory={Subcategory}
            selectedFunctions={selectedFunctions}
            handleFunctionClick={handleFunctionClick}
          />
        </div>

        <div>
          <CompatibilityFilter
            CompatibilityData={CompatibilityData}
            onCompatibilityChange={handleCompatibilityChange}
            Maincategory={Maincategory}
            Subcategory={Subcategory}
            selectedCompatibility={SelectedCompatibility}
          />
        </div>

        <div>
          <LanguageFilter
            LanguageData={LanguageData}
            onLanguageChange={handleLanguageChange}
            Maincategory={Maincategory}
            Subcategory={Subcategory}
            selectedLanguage={selectedLanguage}
          />
        </div>

        <div>
          <OsFilter
            OsData={OsData}
            onOsChange={handleOsChange}
            Maincategory={Maincategory}
            Subcategory={Subcategory}
            selectedOs={selectedOs}
          />
        </div>

        <div>
          <SupportFilter
            SupportData={SupportData}
            selectedSupport={selectedSupport}
            handleSupportClick={handleSupportClick}
          />
        </div>
      </div>

      <div className="w-4/5 p-4 bg-gray-200 rounded-40">
        {!currentMainCategoryName && !currentSubCategoryName ? (
          <h1 className="text-2xl text-black font-semibold mb-8 mt-2 ml-12 hover-scale-element:hover hover-scale-element">
            Szoftverlista
          </h1>
        ) : (
          <h1 className="text-3xl text-black font-semibold mb-8 mt-2 ml-12">
            {Maincategory && (
              <Link to={`/szoftverek/${transliterate(Maincategory)}`}>
                {currentMainCategoryName}
              </Link>
            )}
            {currentSubCategoryName && Subcategory && (
              <>
                &nbsp;&raquo;&nbsp;
                <Link
                  to={`/szoftverek/${transliterate(
                    Maincategory
                  )}/${transliterate(Subcategory)}`}
                >
                  {currentSubCategoryName}
                </Link>
              </>
            )}
          </h1>
        )}

        {loading ? (
          <div className="flex justify-center items-center mt-40">
            <ClipLoader color={"#B5B4B4"} loading={loading} size={250} />
          </div>
        ) : (
          <>
            <ul ref={parent}>
              {paginatedSoftwareData.map((software) => (
                <li
                  key={software.softwareID}
                  className="pb-8 px-4 hover-scale-element:hover hover-scale-element"
                >
                  <Link
                    to={`/szoftverek/${transliterate(
                      software.category.categoryGroup.name
                    )}/${transliterate(software.category.name)}/${transliterate(
                      software.name
                    )}`}
                    onClick={() => {
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    <div
                      className="bg-white rounded-25 pt-12 pb-12 pr-12 pl-6 border border-gray-400 flex shadow-xl"
                      style={{ height: "300px" }}
                    >
                      {/* Container for the image (1/3 of the width) */}
                      <div className="w-1/3 flex justify-center items-center shadow-custom m-4 rounded-25">
                        <div className="flex items-center">
                          <img
                            src={software.company.logo_link}
                            alt="Software Placeholder"
                            className="pl-4 pr-4"
                            draggable="false"
                            style={{
                              width: "auto",
                              height: "auto",
                              maxHeight: "150px",
                            }}
                          />
                        </div>
                      </div>
                      {/* Container for the data (2/3 of the width) */}
                      <div className="w-2/3 flex flex-col justify-center pl-6 pr-4 ">
                        <Link
                          to={`/szoftverek/${transliterate(
                            software.category.categoryGroup.name
                          )}/${transliterate(
                            software.category.name
                          )}/${transliterate(software.name)}`}
                          className="text-3xl font-semibold text-black mb-3"
                          onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                        >
                          {software.name}

                        </Link>
                        <Link
                          to={`/cegek/${transliterate(software.company.name)}`}
                          onClick={() => {
                            window.scrollTo({
                              top: 0,
                              behavior: "smooth",
                            });
                          }}
                        >
                          <p className="text-gray-600 text-xl mb-1">
                            {software.company.name}
                          </p>
                        </Link>
                        <div className="flex items-center ">
                          <span className="text-black text-lg mr-2">
                            Vélemények: {software.average_stars}
                            <StarIcon
                              fontSize="medium"
                              className="starmargin"
                              style={{ color: "rgb(255, 210, 48)" }}
                            />
                          </span>
                        </div>
                        <p className="text-gray-700">{software.description}</p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            {<SoftwareNotFound filteredSoftwareData={filteredSoftwareData} />}
            {totalPages > 1 && paginationControls}
          </>
        )}
      </div>
    </div>
  );
};

export default SoftwareList;
