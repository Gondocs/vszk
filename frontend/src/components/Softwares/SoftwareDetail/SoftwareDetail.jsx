import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../PageNotFound/PageNotFound";
import { get, post, del } from "../../api/api";
import { showToast } from "../../toasts/toast";
import StarIcon from "@mui/icons-material/Star";
import { ClipLoader } from "react-spinners";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useAuth } from "../../Auth/Auth";
import { jwtDecode } from "jwt-decode";
import { showToastLong } from "../../toasts/toastLong";

function SoftwareDetail() {
  const { softwareID } = useParams();
  const { token } = useAuth();
  const [SoftwareData, setSoftwareData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState("Properties"); // Default active button is "Tulajdonságok"
  const [parent] = useAutoAnimate(/* optional config */);
  const [IsFavorite, setIsFavorite] = useState();

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleAddFavorite = async (e) => {
    setIsButtonDisabled(true); // Disable the button
    const AddFavoriteData = {
      userID: jwtDecode(token).nameid,
      softwareID: softwareID,
    };

    try {
      await post.AddUserFavoriteSoftware(AddFavoriteData);
      showToastLong("Sikeresen hozzáadva a kedvencekhez", "success");
      setIsFavorite(true); // Directly set IsFavorite to true
    } catch (error) {
      showToastLong("Hiba történt a hozzáadás közben: " + error, "error");
      console.log(error);
    }

    setTimeout(() => setIsButtonDisabled(false), 3000); // Enable the button after 3 seconds
  };

  const handleRemoveFavorite = async (e) => {
    setIsButtonDisabled(true); // Disable the button
    const RemoveFavoriteData = {
      userID: jwtDecode(token).nameid,
      softwareID: softwareID,
    };

    try {
      await del.RemoveUserFavoriteSoftware(RemoveFavoriteData);
      showToastLong("Sikeresen eltávolítva a kedvencek közül", "success");
      setIsFavorite(false); // Directly set IsFavorite to false
    } catch (error) {
      showToastLong("Hiba történt a hozzáadás közben: " + error, "error");
      console.log(error);
    }

    setTimeout(() => setIsButtonDisabled(false), 3000); // Enable the button after 3 seconds
  };

  useEffect(() => {
    get
      .softwareById(softwareID)
      .then((data) => {
        setSoftwareData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching software data:", error);
        showToast(error, "error");
        setLoading(false);
      });
  }, [softwareID]);

  useEffect(() => {
    get
      .IsUserFavoriteSoftwareById(jwtDecode(token).nameid, softwareID)
      .then((data) => {
        setIsFavorite(data);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching software data:", error);
        showToast(error, "error");
        setLoading(false);
      });
  }, [softwareID, token]);

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
                <div className="w-full p-4">
                  <div className="flex border-gray-200 rounded-25">
                    <div className="w-1/3 flex justify-center items-center shadow-custom m-4 rounded-25">
                      <img
                        src={SoftwareData.logo_link}
                        alt="Software Logo"
                        className="mx-auto p-4"
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
                        <p className="text-lg text-justify">
                          {SoftwareData.description}
                        </p>
                        <button
                          className=" mt-12 mb-8 px-4 py-2 bg-yellow-300 hover-bg-yellow-400 rounded-md text-gray-900 font-semibold transition duration-300 inline-block hover-scale-small:hover hover-scale-small"
                          onClick={() =>
                            window.open(SoftwareData.company.website)
                          }
                        >
                          Tovább a szoftver oldalára
                        </button>
                        <button
                          disabled={isButtonDisabled}
                          className={`mt-12 mb-8 ml-8 px-4 py-2 ${
                            isButtonDisabled ? "bg-yellow-100" : "bg-yellow-300"
                          } hover-bg-yellow-400 rounded-md text-gray-900 font-semibold transition duration-300 inline-block hover-scale-small:hover hover-scale-small`}
                          onClick={
                            IsFavorite
                              ? handleRemoveFavorite
                              : handleAddFavorite
                          }
                        >
                          {IsFavorite ? "Eltávolítás" : "Kedvencek"}
                        </button>
                      </div>
                    </div>
                  </div>

                  <ul className="p-8 rounded-25" ref={parent}>
                    <div className="flex justify-center mt-6 text-white text-2xl">
                      <button
                        className={`mx-2 p-2 w-1/3 rounded-xl py-4 ${
                          activeButton === "Properties"
                            ? "bg-gray-500"
                            : "bg-gray-700"
                        }`}
                        onClick={() => setActiveButton("Properties")}
                        style={{
                          transition: "background-color 1s ease-in-out",
                        }}
                      >
                        Tulajdonságok
                      </button>
                      <button
                        className={`mx-2 p-2 w-1/3 rounded-xl py-4 ${
                          activeButton === "functionalities"
                            ? "bg-gray-500"
                            : "bg-gray-700"
                        }`}
                        onClick={() => setActiveButton("functionalities")}
                        style={{
                          transition: "background-color 1s ease-in-out",
                        }}
                      >
                        Funkciók
                      </button>
                      <button
                        className={`mx-2 p-2 w-1/3 rounded-xl py-4 ${
                          activeButton === "remunerations"
                            ? "bg-gray-500"
                            : "bg-gray-700"
                        }`}
                        onClick={() => setActiveButton("remunerations")}
                        style={{
                          transition: "background-color 1s ease-in-out",
                        }}
                      >
                        Árazás
                      </button>
                    </div>

                    {activeButton === "Properties" &&
                      SoftwareData.languages.length > 0 && (
                        <div className="grid grid-cols-3 gap-12 mb-32 shadow-custom p-16 rounded-25 mt-20">
                          {SoftwareData.languages.length > 0 && (
                            <div className="shadow-custom p-4 rounded-25 flex flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small">
                              <h3 className="text-2xl font-semibold">
                                Nyelvek
                              </h3>
                              <p className="text-lg mt-2">
                                {SoftwareData.languages.join(", ")}
                              </p>
                            </div>
                          )}

                          {SoftwareData.supports.length > 0 && (
                            <div className="shadow-custom p-4 rounded-25 flex flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small">
                              <h3 className="text-2xl font-semibold">
                                Támogatás nyelve
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
                              <h3 className="text-2xl font-semibold">
                                Eszközök
                              </h3>
                              <p className="text-lg mt-2">
                                {SoftwareData.devices.join(", ")}
                              </p>
                            </div>
                          )}

                          {SoftwareData.moduls.length > 0 && (
                            <div className="shadow-custom p-4 rounded-25 flex flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small">
                              <h3 className="text-2xl font-semibold">
                                Modulok
                              </h3>
                              <p className="text-lg mt-2">
                                {SoftwareData.moduls.join(", ")}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                    {activeButton === "functionalities" &&
                      SoftwareData.functions.length > 0 && (
                        <div className="flex flex-wrap gap-8 shadow-custom p-16 rounded-25 mt-20">
                          {SoftwareData.functions
                            .filter((func) => func.sfunction === true)
                            .map((func) => (
                              <div
                                key={func.softwareFunctionID}
                                className="bg-white rounded-25 shadow-custom p-2 flex-grow hover-scale-small:hover hover-scale-small "
                              >
                                <h3 className="text-2xl m-2 text-center">
                                  {func.functionality}
                                </h3>
                              </div>
                            ))}
                        </div>
                      )}

                    {activeButton === "remunerations" &&
                      SoftwareData.remunerations.length > 0 && (
                        // Render the content for remunerations
                        <div className="flex flex-wrap gap-8 mt-20 shadow-custom p-16 rounded-25">
                          <div className="bg-white rounded-25 shadow-custom p-4 flex-grow hover-scale-element:hover hover-scale-element">
                            <h3 className="text-2xl font-semibold m-2 text-center border-2 rounded">
                              BEVEZETÉSI ÁR
                            </h3>
                            <p className="text-center text-lg">
                              {SoftwareData.introduction_fee
                                ? `${SoftwareData.introduction_fee} Ft`
                                : "Nincsen"}
                            </p>
                          </div>

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
                  </ul>
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
