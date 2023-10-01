import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./PageNotFound";
import { get } from "./api/api";
import { showToast } from "./toasts/toast";
import StarIcon from "@mui/icons-material/Star";

function SoftwareDetail() {
  const { name } = useParams();
  const [SoftwareData, setSoftwareData] = useState([]);

  useEffect(() => {
    get
      .SoftwareAll()
      .then((data) => {
        const software = data.find(
          (software) =>
            software.name.replace(/\s+/g, "-").toLowerCase() === name
        );
        setSoftwareData(software);
        console.log(software);
      })
      .catch((error) => {
        console.error("Error fetching software data:", error);
        showToast("Hiba történt az adatok lekérése közben", "error");
      });
  }, [name]);

  if (!SoftwareData) {
    return <NotFound />;
  }

  return (
    <div className="p-16">
      <div className="bg-gray-200 p-12 rounded-lg shadow-lg flex items-center">
        <img
          src={SoftwareData.logo_link}
          alt="Software Logo"
          className=" rounded-40 mr-6"
          draggable="false"
        />
        <div className="p-4">
          <h2 className="text-3xl font-semibold p-4">
            Név: {SoftwareData.name}
          </h2>
          <p className="text-lg font-semibold pt-4 pb-4 pl-4 pr-0">
            Értékelés: 4,6 ideiglenes{SoftwareData.rating}
            <StarIcon
              fontSize="medium"
              className="starmargin"
              style={{ color: "rgb(255, 210, 48)" }}
            />
          </p>
          <p className="text-lg mt-4 p-4">Leírás: {SoftwareData.description}</p>
          <button
            className="ml-4 mt-6 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-md text-gray-900 font-semibold transition duration-300 inline-block"
            onClick={() => window.open(SoftwareData.company.website)}
          >
            Tovább a szoftver oldalára
          </button>
        </div>
      </div>
    </div>
  );
}

export default SoftwareDetail;
