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
import { get } from "../api/api";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../Auth/Auth";

const FavoritesPage = () => {
  const [parent] = useAutoAnimate();

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");

  const [searchTerm, setSearchTerm] = useState(searchQuery || "");
  const [SoftwareData, setSoftwareData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { token } = useAuth();

  const searchnavigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    query.set("search", searchTerm);
    searchnavigate({ search: query.toString() });
  }, [searchTerm, location.search, searchnavigate]);
  
    useEffect(() => {
        get.GetUserFavoriteSoftware(jwtDecode(token).nameid)
        .then(data => {
            setSoftwareData(data);
            setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedSoftwareData = SoftwareData.slice(
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

  const totalPages = Math.ceil(SoftwareData.length / itemsPerPage);

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
        className="w-1/4 bg-white p-10 rounded-lg mr-4 ml-4 shadow-lg border border-gray-400 sticky sm:top-[20%] z-30 overflow-auto"
        style={{ maxHeight: "80vh", marginTop: "6.3%" }}
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
      </div>

      <div className="w-4/5 p-4 bg-gray-200 rounded-40">
        <h1 className="text-2xl text-black font-semibold mb-8 mt-2 ml-12 hover-scale-element:hover hover-scale-element">
          Kedvencek
        </h1>

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
                    )}/${transliterate(software.category.name)}/${software.softwareID}/${transliterate(
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
                          )}/${software.softwareID}/${transliterate(software.name)}`}
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
            {totalPages > 1 && paginationControls}
          </>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
