import React, { useState, useEffect } from "react";
import "../css/softwareList.css";
import StarIcon from "@mui/icons-material/Star";
import { Link, useParams } from "react-router-dom";
import { transliterate } from "./api/transliteration";
import { get } from "./api/api";
import { showToast } from "./toasts/toast";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";

const SoftwareList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { Maincategory, Subcategory } = useParams();

  const [SoftwareData, setSoftwareData] = useState([]);
  const [FunctionsData, setFunctionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

        get.GetAllWithFunctions()
    .then((functionsData) => {
      // Handle the response from the second API call
      setFunctionsData(functionsData);
    })
    .catch((error) => {
      // Handle errors from the second API call
      showToast("Hiba történt az adatok lekérése közben (AllFunctions)", "error");
      console.log(error);
    });
      
  }, []);

  useEffect(() => {
    console.log(SoftwareData);
  }, [SoftwareData]);

  const transliteratedCategory = Maincategory
    ? transliterate(Maincategory)
    : "";

  const uniqueCategories = Array.from(
    new Set(
      SoftwareData.map((category) =>
        transliterate(category.category.categoryGroup.name)
      )
    )
  );

  const isMainCategory = uniqueCategories.includes(transliteratedCategory);

  let filteredSoftwareData;

  if (Maincategory) {
    if (Subcategory) {
      filteredSoftwareData = SoftwareData.filter(

        (software) =>
          transliterate(software.category.categoryGroup.name) === transliteratedCategory 
          &&
          transliterate(software.category.name) === transliterate(Subcategory) 
          &&
          software.name.toLowerCase().includes(searchTerm.toLowerCase())
          );

    } else if (isMainCategory) {
      filteredSoftwareData = SoftwareData.filter(

        (software) =>
          transliterate(software.category.categoryGroup.name) === transliteratedCategory
          &&
          software.name.toLowerCase().includes(searchTerm.toLowerCase())

      );
    } else {
      filteredSoftwareData = SoftwareData.filter(

        (software) =>
          transliterate(software.category.name) === transliteratedCategory 
          &&
          software.name.toLowerCase().includes(searchTerm.toLowerCase())

      );
    }
  } else {
    filteredSoftwareData = SoftwareData.filter((software) =>

      software.name.toLowerCase().includes(searchTerm.toLowerCase())
      
    );
  }

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

  const totalPages = Math.ceil(filteredSoftwareData.length / itemsPerPage);

  const paginationControls = (
    <div className="flex justify-center items-center mt-4">
      <ul className="flex space-x-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <li key={index}>
            <button
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? "bg-gray-700 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-500 hover:text-white"
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  const noResultsMessage =
    paginatedSoftwareData.length === 0 ? (
      <div
        className="bg-white rounded-40 flex justify-center items-center fadeIn"
        style={{
          height: "auto",
          width: "65%",
          margin: "auto",
          marginTop: "7%",
          padding: "2%",
        }}
      >
        <div className="text-black text-4xl text-center">
          A keresett szoftver nem található.
        </div>
      </div>
    ) : null;

  return (
    <div className="flex min-h-screen bg-gray-200 py-8 px-16 FadeInSmall">
      <div
        className="w-1/5 bg-gray-100 p-8 rounded-40 mr-16 shadow-lg border border-gray-400"
        style={{ height: "100%", marginTop: "7%" }}
      >
        <h2 className="text-lg font-semibold mb-4 hover-scale-element:hover hover-scale-element">
          Szoftverkeresés
        </h2>
        <input
          type="text"
          placeholder="Szoftver neve..."
          className="border rounded-lg p-2 w-full hover-scale-element:hover hover-scale-element"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-4/5 p-4 bg-gray-200 rounded-40">
        <h1 className="text-2xl text-black font-semibold mb-8 mt-2 ml-12 hover-scale-element:hover hover-scale-element">
          Szoftverlista
        </h1>

        {loading ? (
          <div className="flex justify-center items-center mt-40">
            <ClipLoader color={"#B5B4B4"} loading={loading} size={250} />
          </div>
        ) : (
          <>
            <ul>
              {paginatedSoftwareData.map((software) => (
                <li
                  key={software.softwareID}
                  className="pb-8 px-4 hover-scale-element:hover hover-scale-element FadeInSmall"
                >
                  <div
                    className="bg-white rounded-25 pt-12 pb-12 pr-12 pl-6 border border-gray-400 flex shadow-xl"
                    style={{ height: "300px" }}
                  >
                    {/* Container for the image (1/3 of the width) */}
                    <Link
                      to={`/szoftverek/${transliterate(
                        software.category.categoryGroup.name
                      )}/${transliterate(
                        software.category.name
                      )}/${transliterate(software.name)}`}
                      className="w-1/3 flex justify-center items-center shadow-custom m-4 rounded-25" 
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      <div className="flex items-center">
                        <img
                          src={software.company.logo_link}
                          alt="Software Placeholder"
                          className="pl-4 pr-4"
                          draggable="false"
                          style={{ width: "auto", height: "auto", maxHeight: "150px"}}
                        />
                      </div>
                    </Link>

                    {/* Container for the data (2/3 of the width) */}
                    <div className="w-2/3 flex flex-col justify-center pl-6 pr-4">
                      <Link
                        to={`/szoftverek/${transliterate(
                          software.category.categoryGroup.name
                        )}/${transliterate(
                          software.category.name
                        )}/${transliterate(software.name)}`}
                        className="text-3xl font-semibold text-black"
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
                        <p className="text-gray-600 text-xl mb-2">
                          {software.company.name}
                        </p>
                      </Link>
                      <div className="flex items-center">
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
                </li>
              ))}
            </ul>
            {noResultsMessage}
            {totalPages > 1 && paginationControls}
          </>
        )}
      </div>
    </div>
  );
};

export default SoftwareList;
