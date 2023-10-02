import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./PageNotFound";
import { get } from "./api/api";
import { showToast } from "./toasts/toast";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";
import { transliterate } from "./api/transliteration";

function CompanyDetail() {
  const { name } = useParams();
  const [CompanyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state


  useEffect(() => {
    get
      .Company()
      .then((data) => {
        const company = data.find(
          (company) =>
            transliterate(company.name) === name
        );
        setCompanyData(company);
        setLoading(false); // Set loading to false once the data is fetched
        console.log(company);
      })
      .catch((error) => {
        console.error("Error fetching software data:", error);
        showToast(error, "error");
        setLoading(false); // Set loading to false in case of an error
      });
  }, [name]);

  if (!CompanyData) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-16 FadeInSmall">
    <div className="p-16">
    <div className="bg-white p-12 rounded-lg shadow-xl flex items-center">

      {loading ? ( // Render loading spinner if loading is true  // NEED TO FURTHER ENHANCE IT, maybe add text, color, different animations, size
      <div className="flex justify-center items-center mx-auto">
      <ClipLoader color={"#B5B4B4"} loading={loading} size={250} /> 
          </div>
        ) : (
          <>
        <div className="w-1/3 flex justify-center items-center">
         
        <img
          src={CompanyData.logo_link}
          alt="Software Logo"
          className=" rounded-40 mr-6"
          draggable="false"
        />
        </div>
        <div className="w-2/3">
        <div className="p-4">
          <h2 className="text-3xl font-semibold p-4">
            {CompanyData.name}
          </h2>
          <p className="text-xl font-semibold pt-4 pb-4 pl-4 pr-0">
            <a href={`https://www.google.com/maps/search/${CompanyData.location}`} target="_blank" rel="noreferrer nofollow" className="hover:underline text-xl">
              {CompanyData.location}
            </a>              
          </p>
          <p className="text-lg font-semibold pt-4 pb-4 pl-4 pr-0">
          Telefonszám: {CompanyData.phone}
          </p>
          <p className="text-lg mt-4 p-4">Leírás: {CompanyData.description}</p>
          <button
            className="ml-4 mt-6 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-md text-gray-900 font-semibold transition duration-300 inline-block"
            onClick={() => window.open(CompanyData.website)}
          >
            Tovább a szoftver oldalára
          </button>
        </div>
        </div>
        </>
        )}
      </div>   
    </div>
    </div>
  );
}

export default CompanyDetail;
