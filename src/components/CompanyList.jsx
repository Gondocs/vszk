import React, { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import { transliterate } from "./api/transliteration";
import { get } from "./api/api";
import { showToast } from "./toasts/toast";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";

export const CompanyList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [CompanyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get
      .Company()
      .then((data) => {
        setCompanyData(data);
        setLoading(false);
      })
      .catch((error) => {
        showToast("Hiba történt az adatok lekérése közben", "error");
        console.log(error);
        setLoading(false);
      });
  }, []);

  const filteredCompanies = CompanyData.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex min-h-screen bg-gray-200 py-8 px-16 FadeInSmall">
      <div
        className="w-1/5 bg-gray-100 p-8 rounded-40 mr-16 shadow-lg border border-gray-400"
        style={{ height: "100%", marginTop: "7%" }}
      >
        <h2 className="text-lg font-semibold mb-4 hover-scale-element:hover hover-scale-element">
          Cégkeresés
        </h2>
        <input
          type="text"
          placeholder="Cég neve..."
          className="border rounded-lg p-2 w-full hover-scale-element:hover hover-scale-element"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-4/5 p-4 bg-gray-200 rounded-40">
        <h1 className="text-2xl font-semibold mb-8 mt-2 ml-12 hover-scale-element:hover hover-scale-element">
          Céglista
        </h1>

        {loading ? (
          <div className="flex justify-center items-center mt-40">
            <ClipLoader color={"#B5B4B4"} loading={loading} size={250} />
          </div>
        ) : (
          <>
            <ul>
              {paginatedCompanies.map((company) => (
                <li
                  key={company.companyID}
                  className="pb-8 px-4 hover-scale-element:hover hover-scale-element FadeInSmall"
                >
                  <div
                    className="bg-white rounded-25 pr-12 pb-12 pt-12 pl-6 border border-gray-400 flex shadow-xl"
                    style={{ height: "300px" }}
                  >
                    <Link
                      to={`/cegek/${transliterate(company.name)}`}
                      className="w-1/3 flex justify-center items-center shadow-custom m-4 rounded-25"
                      onClick={() => {
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                    >
                      <img
                        src={company.logo_link}
                        alt="Software Placeholder"
                        className="pl-4 pr-4"
                        draggable="false"
                        style={{ width: "auto", height: "auto" }}
                      />
                    </Link>
                    <div className="w-2/3 flex flex-col justify-center pl-6 pr-4">
                      <Link
                        to={`/cegek/${transliterate(company.name)}`}
                        className="text-3xl font-semibold text-black pb-4"
                        onClick={() => {
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                      >
                        {company.name}
                      </Link>
                      <div className="flex items-center">
                        <span className="text-black text-lg mr-2">
                          Vélemények:
                          <StarIcon
                            fontSize="medium"
                            className="starmargin"
                            style={{ color: "rgb(255, 210, 48)" }}
                          />
                        </span>
                      </div>
                      <p className="text-black">
                        Leírás: {company.description}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            {totalPages > 1 && (
              <div className="flex justify-center mt-4">
                <nav className="block">
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
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
