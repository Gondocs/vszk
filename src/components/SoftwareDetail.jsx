import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "./PageNotFound";
import { get } from "./api/api";
import { showToast } from "./toasts/toast";
import StarIcon from "@mui/icons-material/Star";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/react";
import { transliterate } from "./api/transliteration";

function SoftwareDetail() {
  const { name } = useParams();
  const [SoftwareData, setSoftwareData] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    get
      .SoftwareAll()
      .then((data) => {
        const software = data.find(
          (software) => transliterate(software.name) === name
        );
        setSoftwareData(software);
        setLoading(false); // Set loading to false once the data is fetched
        console.log(software);
      })
      .catch((error) => {
        console.error("Error fetching software data:", error);
        showToast(error, "error");
        setLoading(false); // Set loading to false in case of an error
      });
  }, [name]);

  if (!SoftwareData) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-16 FadeInSmall">
      <div className="p-16">
        <div className="bg-white p-12 rounded-25 shadow-xl">
          <div className="flex items-center">
            {loading ? (
              <div className="flex justify-center items-center mx-auto">
                <ClipLoader color={"#B5B4B4"} loading={loading} size={250} />
              </div>
            ) : (
              <>
                {/* Big white container */}
                <div className="w-full p-4">
                  {/* 1/3 and 2/3 container */}
                  <div className="flex border-gray-200 border-2 rounded-25">
                    <div className="w-1/3 flex justify-center items-center">
                      <img
                        src={SoftwareData.logo_link}
                        alt="Software Logo"
                        className="mx-auto ml-12"
                        draggable="false"
                      />
                    </div>

                    <div className="w-2/3 rounded-25">
                      <div className="pt-8 pb-8 pr-12 pl-16">
                        <h2 className="text-6xl font-semibold pt-4">
                          {SoftwareData.name}
                        </h2>
                        <p className="text-lg font-semibold pt-4 pb-4  pr-0">
                          {SoftwareData.rating}
                          <StarIcon
                            fontSize="medium"
                            className="starmargin"
                            style={{ color: "rgb(255, 210, 48)" }}
                          />
                        </p>
                        <p className="text-lg">{SoftwareData.description}</p>
                        <button
                          className=" mt-12 mb-8 px-4 py-2 bg-yellow-300 hover:bg-yellow-400 rounded-md text-gray-900 font-semibold transition duration-300 inline-block hover-scale-small:hover hover-scale-small"
                          onClick={() =>
                            window.open(SoftwareData.company.website)
                          }
                        >
                          Tovább a szoftver oldalára
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-20 mt-12 border-gray-200 border-2 rounded-25">
                    <div className="grid grid-cols-3 gap-12 mb-32 shadow-custom p-16 rounded-25">
                      {SoftwareData.languages.length > 0 && (
                        <div className="shadow-custom p-4 rounded-25 flex flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small">
                          <h3 className="text-2xl font-semibold">Nyelvek</h3>
                          <p className="text-lg mt-2">
                            {SoftwareData.languages.join(", ")}
                          </p>
                        </div>
                      )}

                      {SoftwareData.supports.length > 0 && (
                        <div className="shadow-custom p-4 rounded-25 flex flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small">
                          <h3 className="text-2xl font-semibold">
                            Támogatott nyelvek
                          </h3>
                          <p className="text-lg mt-2 rounded-25">
                            {SoftwareData.supports.join(", ")}
                          </p>
                        </div>
                      )}

                      {SoftwareData.oSs.length > 0 && (
                        <div className="shadow-custom p-4 rounded-25 flex flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small">
                          <h3 className="text-2xl font-semibold">
                            Operációs rendszerek
                          </h3>
                          <p className="text-lg mt-2 rounded-25">
                            {SoftwareData.oSs.join(", ")}
                          </p>
                        </div>
                      )}

                      {SoftwareData.devices.length > 0 && (
                        <div className="shadow-custom p-4 rounded-25 flex flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small">
                          <h3 className="text-2xl font-semibold">Eszközök</h3>
                          <p className="text-lg mt-2">
                            {SoftwareData.devices.join(", ")}
                          </p>
                        </div>
                      )}

                      {SoftwareData.moduls.length > 0 && (
                        <div className="shadow-custom p-4 rounded-25 flex flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small">
                          <h3 className="text-2xl font-semibold">Modulok</h3>
                          <p className="text-lg mt-2">
                            {SoftwareData.moduls.join(", ")}
                          </p>
                        </div>
                      )}
                    </div>

                    {SoftwareData.functions.length > 0 && (
                      <div className="flex flex-wrap gap-8 shadow-custom p-16 rounded-25">
                        {SoftwareData.functions
                          .filter((func) => func.sfunction === true)
                          .map((func) => (
                            <div
                              key={func.softwareFunctionID}
                              className="bg-white rounded-25 shadow-custom p-2 flex-grow hover-scale-small:hover hover-scale-small"
                            >
                              <h3 className="text-lg font-semibold m-2 text-center">
                                {func.functionality}
                              </h3>
                            </div>
                          ))}
                      </div>
                    )}

                    {SoftwareData.remunerations.length > 0 && (
                      <div className="flex flex-wrap gap-8 mt-32 shadow-custom p-16 rounded-25">
                        {SoftwareData.remunerations.map((remuneration) => (
                          <div
                            key={remuneration.remunerationID}
                            className="bg-white rounded-25 shadow-custom p-4 flex-grow hover-scale-element:hover hover-scale-element"
                          >
                            <h3 className="text-2xl font-semibold m-2 text-center border-2 rounded">
                              {remuneration.level.toUpperCase()}
                            </h3>
                            <p className="text-center text-lg">
                              {remuneration.type === "ajánlatkérés"
                                ? "Ajánlatkérés"
                                : `${remuneration.price} Ft / ${
                                    remuneration.type === "éves" ? "év" : "hó"
                                  }`}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
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

export default SoftwareDetail;
