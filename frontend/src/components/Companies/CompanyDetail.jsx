import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NotFound from "../PageNotFound/PageNotFound";
import { get } from "../api/api";
import { showToast } from "../toasts/toast";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";
import { transliterate } from "../api/transliteration";

function CompanyDetail() {
  const { name, CompanyID } = useParams();
  const [CompanyData, setCompanyData] = useState([]);
  const [CompanybyidData, setCompanybyidData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get
      .Company()
      .then((data) => {
        const company = data.find(
          (company) => transliterate(company.name) === name
        );
        console.log(name, CompanyID);
        setCompanyData(company);
        setLoading(false);
        console.log(company);
      })
      .catch((error) => {
        console.error("Error fetching software data:", error);
        showToast(error, "error");
        setLoading(false);
      });

    get
      .GetCompanySoftwares(CompanyID)
      .then((data) => {
        setCompanybyidData(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching company softwares:", error);
        showToast(error, "error");
      });
  }, [name, CompanyID]);

  if (!CompanyData) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-6 FadeInSmall">
      <div className="p-8">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <div className="flex items-center">
            {loading ? (
              <div className="flex justify-center items-center mx-auto">
                <ClipLoader color={"#B5B4B4"} loading={loading} size={250} />
              </div>
            ) : (
              <>
                <div className="w-full p-4">
                  <div className="flex border-gray-200 rounded-lg">
                    <div className="w-1/3 flex justify-center items-center shadow-custom m-4 rounded-lg">
                      <img
                        src={CompanyData.logo_link}
                        alt="Company Logo"
                        className="mx-auto p-4"
                        draggable="false"
                      />
                    </div>

                    <div className="w-2/3 rounded-lg">
                      <div className="pt-8 pb-8 pr-12 pl-16">
                        <h2 className="text-6xl font-semibold pt-4">
                          {CompanyData.name}
                        </h2>
                        <p className="text-2xl font-semibold pt-4 pb-4 pr-0">
                          <a
                            href={`https://www.google.com/maps/search/${CompanyData.location}`}
                            target="_blank"
                            rel="noreferrer nofollow"
                            className="hover:underline text-xl"
                          >
                            {CompanyData.location}
                          </a>
                        </p>
                        <p className="text-lg font-semibold pt-4 pb-4 pr-0">
                          Telefonszám: {CompanyData.phone}
                        </p>
                        <p className="text-lg text-justify">
                          {CompanyData.description}
                        </p>
                        <button
                          className="mt-12 mb-8 px-4 py-2 bg-yellow-300 hover-bg-yellow-400 rounded-md text-gray-900 font-semibold transition duration-300 inline-block hover-scale-small:hover hover-scale-small"
                          onClick={() => window.open(CompanyData.website)}
                        >
                          Tovább a cég oldalára
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full mt-20">
                    <h3 className="text-2xl font-semibold mb-4">A cég szoftverei:</h3>
                    <div className="grid grid-cols-1 gap-8">
                      {CompanybyidData.length > 0 ? (
                        CompanybyidData.map((software) => (
                          <Link
                            key={software.softwareID}
                            to={`/szoftverek/${transliterate(
                              software.category.categoryGroup.name
                            )}/${transliterate(software.category.name)}/${software.softwareID}/${transliterate(software.name)}`}
                            className="bg-white p-6 rounded-lg shadow-custom"
                            onClick={() => {
                              window.scrollTo({
                                top: 0,
                                behavior: "smooth",
                              });
                            }}
                          >
                            <div>
                              <img
                                src={software.logo_link}
                                alt={software.name}
                                className="w-full h-32 object-contain mb-4"
                              />
                              <h3 className="text-xl font-semibold mb-2">{software.name}</h3>
                              <p className="text-gray-700 mb-2">
                                {software.category.categoryGroup.name} - {software.category.name}
                              </p>
                              <p className="text-gray-600">{software.description}</p>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div>Nem található a céghez tartozó szoftver</div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;