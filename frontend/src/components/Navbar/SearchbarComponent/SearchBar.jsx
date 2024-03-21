import React from "react";
import { Link } from "react-router-dom";
import { transliterate } from "../../api/transliteration";
import NotFoundSvg from "../../assets/NotFoundSvg";
import { ClipLoader } from "react-spinners";
import "../../../css/sidebar.css";
import { useMediaQuery } from "react-responsive";

const SearchBar = ({
  searchQuery,
  handleInputChange,
  handleSearchFocus,
  handleSearchBlur,
  handleSearchEnter,
  handleSearchButtonClick,
  isSearchFocused,
  loading,
  hasSearchResults,
  filteredSoftwareData,
  handleLinkClick,
  parent,
  token,
}) => {

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return (
    <>
      <div
        className={`flex-grow relative ${isDesktopOrLaptop ? "" : "py-4"} px-5`}
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Keresés"
            className="pl-5 pr-16 pt-2 pb-2 rounded-lg bg-gray-700 text-white focus:outline-none w-full"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            onKeyDown={handleSearchEnter}
          />
          <button
            onClick={handleSearchButtonClick}
            className="absolute top-0 right-0 h-full bg-gray-700 text-white rounded-r-lg px-6 hover:bg-gray-600 focus:outline-none border-l-2 border-gray-800"
            style={{ top: 0 }}
          >
            Keresés
          </button>
        </div>
  
        {isSearchFocused && searchQuery.length >= 1 && (
          <div
            className="absolute mt-2 z-99 bg-white rounded-lg shadow-md max-h-96 overflow-y-auto p-4"
            style={{
              width: "85%",
              maxHeight: "32rem",
            }}
            ref={parent}
          >
            {loading ? (
              <div className="flex justify-center items-center">
                <ClipLoader color={"#B5B4B4"} loading={loading} size={50} />
              </div>
            ) : hasSearchResults ? (
              filteredSoftwareData.map((software) => (
                <Link
                  key={software.softwareID}
                  to={`/szoftverek/${transliterate(
                    software.category_group
                  )}/${transliterate(software.category)}/${transliterate(
                    software.name
                  )}`}
                  className="flex items-center px-4 py-2 hover:bg-gray-200 text-gray-800 hover:text-black hover:rounded-lg"
                  onClick={handleLinkClick}
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
                    <div className="text-base mt-1">{software.category}</div>
                  </div>
                </Link>
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
    </>

  );
}

export default SearchBar;