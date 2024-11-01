import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NotFound from "../../PageNotFound/PageNotFound";
import { get, post, del, put } from "../../api/api";
import { showToast } from "../../toasts/toast";
import StarIcon from "@mui/icons-material/Star";
import { ClipLoader } from "react-spinners";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useAuth } from "../../Auth/Auth";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import { transliterate } from "../../api/transliteration";
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
  const [ratings, setRatings] = useState([]);

  const [showReviewOverlay, setShowReviewOverlay] = useState(false);
  const [reviewData, setReviewData] = useState({
    userID: 0,
    softwareID: 0,
    all_star: 0,
    simplicity: 0,
    service: 0,
    characteristic: 0,
    price_value: 0,
    recommendation: 0,
    all_text: "",
    positive: "",
    negative: "",
    reason_of_use: "",
    duration_of_use: "",
  });

  const [ExistingRatingData, setExistingRatingData] = useState({});
  const ReloadNavigate = useNavigate();

  const handleStarClick = (key, value) => {
    setReviewData((prev) => ({ ...prev, [key]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitReview = async () => {
    try {
      const userID = jwtDecode(token).nameid;
      const reviewPayload = { ...reviewData, userID, softwareID };
      await post.RatingData(reviewPayload);
      showToastLong("Értékelés hozzáadása sikeres!", "success");
      setShowReviewOverlay(false); // Close the overlay
      ReloadNavigate(0);
    } catch (error) {
      showToastLong("Error submitting review: " + error, "error");
    }
  };

  const handleDeleteReview = async () => {
    try {
      const userID = jwtDecode(token).nameid;
      await del.RemoveRatingByUserIdAndSoftwareId(userID, softwareID);
      showToastLong("Értékelés sikeresen törölve!", "success");
      setShowReviewOverlay(false); // Close the overlay
      setExistingRatingData({}); // Clear existing rating data
      setReviewData({
        userID: 0,
        softwareID: 0,
        all_star: 0,
        simplicity: 0,
        service: 0,
        characteristic: 0,
        price_value: 0,
        recommendation: 0,
        all_text: "",
        positive: "",
        negative: "",
        reason_of_use: "",
        duration_of_use: "",
      });
    } catch (error) {
      showToastLong("Hiba az értékelés törlésénél: " + error, "error");
      console.log(error);
    }
  };

  const handleModifyReview = async () => {
    try {
      const userID = jwtDecode(token).nameid;
      const reviewPayload = { ...reviewData, userID, softwareID };
      console.log(reviewPayload);

      await put.PutRatingByUserIdAndSoftwareId(
        userID,
        softwareID,
        reviewPayload
      );
      showToastLong("Értékelés sikeresen módosítva!", "success");
      setShowReviewOverlay(false); // Close the overlay
    } catch (error) {
      showToastLong("Hiba az értékelés módosításánál: " + error, "error");
      console.log(error);
    }
  };

  const handleOpenReviewOverlay = () => {
    if (ExistingRatingData && Object.keys(ExistingRatingData).length > 0) {
      const userID = jwtDecode(token).nameid;
      setReviewData({
        userID: userID,
        softwareID: softwareID,
        all_star: ExistingRatingData.star.all || 0,
        simplicity: ExistingRatingData.star.simplicity || 0,
        service: ExistingRatingData.star.service || 0,
        characteristic: ExistingRatingData.star.characteristic || 0,
        price_value: ExistingRatingData.star.price_value || 0,
        recommendation: ExistingRatingData.star.recommendation || 0,
        all_text: ExistingRatingData.textRating.all || "",
        positive: ExistingRatingData.textRating.positive || "",
        negative: ExistingRatingData.textRating.negative || "",
        reason_of_use: ExistingRatingData.textRating.reason_of_use || "",
        duration_of_use: ExistingRatingData.textRating.duration_of_use || "",
      });
    }
    setShowReviewOverlay(true);
  };

  const renderStars = (key, count) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarIcon
            key={i}
            style={{
              color: i <= count ? "rgb(255, 210, 48)" : "#ccc",
              cursor: "pointer",
            }}
            onClick={() => handleStarClick(key, i)}
          />
        ))}
      </div>
    );
  };

  const handleAddFavorite = async (e) => {
    setIsButtonDisabled(true); // Disable the button
    if (typeof token === "string") {
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
    } else {
      console.error("Invalid token");
    }

    setTimeout(() => setIsButtonDisabled(false), 3000); // Enable the button after 3 seconds
  };

  const handleRemoveFavorite = async (e) => {
    setIsButtonDisabled(true); // Disable the button
    if (typeof token === "string") {
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
    } else {
      console.error("Invalid token");
    }

    setTimeout(() => setIsButtonDisabled(false), 3000); // Enable the button after 3 seconds
  };

  const [recommendedSoftwares, setRecommendedSoftwares] = useState([]);

  useEffect(() => {
    get
      .RecommendedSoftwares(softwareID)
      .then((data) => {
        setRecommendedSoftwares(data || []);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching recommended softwares:", error);
        showToast(error, "error");
      });

    get
      .GetRatingBySoftwareId(softwareID)
      .then((data) => {
        setRatings(data || []);
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching recommended softwares:", error);
        showToast(error, "error");
      });
  }, [softwareID]);

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
    if (typeof token === "string") {
      get
        .GetRatingByUserIdAndSoftwareId(jwtDecode(token).nameid, softwareID)
        .then((data) => {
          setExistingRatingData(data);
          if (data && data.textRating) {
            setReviewData({
              all_text: data.textRating.all || "",
              positive: data.textRating.positive || "",
              negative: data.textRating.negative || "",
              reason_of_use: data.textRating.reason_of_use || "",
              duration_of_use: data.textRating.duration_of_use || "",
              all_star: data.star.all || 0,
              simplicity: data.star.simplicity || 0,
              service: data.star.service || 0,
              characteristic: data.star.characteristic || 0,
              price_value: data.star.price_value || 0,
              recommendation: data.star.recommendation || 0,
            });
          }
          console.log(data);
        })
        .catch((error) => {
          console.log("Error fetching rating data:", error);
        });
    }
  }, [softwareID, token]);

  useEffect(() => {
    if (typeof token === "string") {
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
    }
  }, [softwareID, token]);

  if (!SoftwareData) {
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
                        src={SoftwareData.logo_link}
                        alt="Software Logo"
                        className="mx-auto p-4"
                        draggable="false"
                      />
                    </div>

                    <div className="w-2/3 rounded-lg">
                      <div className="pt-8 pb-8 pr-12 pl-16">
                        <h2 className="text-6xl font-semibold pt-4">
                          {SoftwareData.name}
                        </h2>
                        <p className="text-2xl font-semibold pt-4 pb-4  pr-0">
                          {SoftwareData.average_stars}
                          <StarIcon
                            fontSize="large"
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
                        {token && (
                          <button
                            disabled={isButtonDisabled}
                            className={`mt-12 mb-8 ml-8 px-4 py-2 ${
                              isButtonDisabled
                                ? "bg-yellow-100"
                                : "bg-yellow-300"
                            } hover-bg-yellow-400 rounded-md text-gray-900 font-semibold transition duration-300 inline-block hover-scale-small:hover hover-scale-small`}
                            onClick={
                              IsFavorite
                                ? handleRemoveFavorite
                                : handleAddFavorite
                            }
                          >
                            {IsFavorite ? "Eltávolítás" : "Kedvencek"}
                          </button>
                        )}

                        {token && (
                          <button
                            className="mt-12 ml-8 mb-8 px-4 py-2 bg-green-300 hover-bg-green-400 rounded-md text-gray-900 font-semibold transition duration-300"
                            onClick={handleOpenReviewOverlay}
                          >
                            {ExistingRatingData &&
                            Object.keys(ExistingRatingData).length > 0
                              ? "Vélemény megváltoztatása"
                              : "Vélemény hozzáadása"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                  {showReviewOverlay && (
                    <div className="ratingOverlay">
                      <div className="modal bg-white p-12">
                        <div className="rating-section grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center items-center mb-8">
                          <div className="text-center">
                            <p className="text-lg font-semibold pt-4">
                              Összegzett értékelés:
                            </p>
                            <div className="flex justify-center">
                              {renderStars("all_star", reviewData.all_star)}
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold pt-4">
                              Egyszerűség:
                            </p>
                            <div className="flex justify-center">
                              {renderStars("simplicity", reviewData.simplicity)}
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold pt-4">
                              Szolgáltatás:
                            </p>
                            <div className="flex justify-center">
                              {renderStars("service", reviewData.service)}
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold pt-4">
                              Jellemzők:
                            </p>
                            <div className="flex justify-center">
                              {renderStars(
                                "characteristic",
                                reviewData.characteristic
                              )}
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold pt-4">
                              Ár-érték arány:
                            </p>
                            <div className="flex justify-center">
                              {renderStars(
                                "price_value",
                                reviewData.price_value
                              )}
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-lg font-semibold pt-4">
                              Ajánlás:
                            </p>
                            <div className="flex justify-center">
                              {renderStars(
                                "recommendation",
                                reviewData.recommendation
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Textual Inputs */}
                        <h3 className="mt-12 mb-2 text-lg font-semibold">
                          Írja meg értékelését...
                        </h3>
                        <textarea
                          name="all_text"
                          placeholder="Írja meg értékelését..."
                          value={reviewData.all_text}
                          onChange={handleInputChange}
                          className="textarea mt-2 p-4 border rounded-md w-full"
                        />
                        <h3 className="mt-6 mb-2 text-lg font-semibold">
                          Pozitív aspektusok
                        </h3>
                        <textarea
                          name="positive"
                          placeholder="Pozitív aspektusok"
                          value={reviewData.positive}
                          onChange={handleInputChange}
                          className="textarea mt-2 p-4 border rounded-md w-full"
                        />
                        <h3 className="mt-6 mb-2 text-lg font-semibold">
                          Negatív aspektusok
                        </h3>
                        <textarea
                          name="negative"
                          placeholder="Negatív aspektusok"
                          value={reviewData.negative}
                          onChange={handleInputChange}
                          className="textarea mt-2 p-4 border rounded-md w-full"
                        />
                        <h3 className="mt-6 mb-2 text-lg font-semibold">
                          Használat oka
                        </h3>
                        <input
                          type="text"
                          name="reason_of_use"
                          placeholder="Használat oka"
                          value={reviewData.reason_of_use}
                          onChange={handleInputChange}
                          className="input mt-2 p-4 border rounded-md w-full"
                        />
                        <h3 className="mt-6 mb-2 text-lg font-semibold">
                          Használat időtartama
                        </h3>
                        <input
                          type="text"
                          name="duration_of_use"
                          placeholder="Használat időtartama"
                          value={reviewData.duration_of_use}
                          onChange={handleInputChange}
                          className="input mt-2 p-4 border rounded-md w-full"
                        />

                        <button
                          className="submit-button mt-8 mb-4 px-4 py-2 bg-yellow-300 hover-bg-yellow-400 rounded-md text-gray-900 font-semibold transition duration-300 inline-block hover-scale-small:hover hover-scale-small"
                          onClick={
                            ExistingRatingData &&
                            Object.keys(ExistingRatingData).length > 0
                              ? handleModifyReview
                              : handleSubmitReview
                          }
                        >
                          {ExistingRatingData &&
                          Object.keys(ExistingRatingData).length > 0
                            ? "Módosítás"
                            : "Értékelés beküldése"}
                        </button>

                        <button
                          className="delete-button ml-8 mt-4 px-4 py-2 bg-red-300 hover-bg-red-400 rounded-md text-gray-900 font-semibold transition duration-300 inline-block hover-scale-small:hover hover-scale-small"
                          onClick={handleDeleteReview}
                        >
                          Törlés
                        </button>

                        <button
                          className="close-button ml-8 mt-4 px-4 py-2 bg-gray-300 hover-bg-red-400 rounded-md text-gray-900 font-semibold transition duration-300 inline-block hover-scale-small:hover hover-scale-small"
                          onClick={() => setShowReviewOverlay(false)}
                        >
                          Bezárás
                        </button>
                      </div>
                    </div>
                  )}
                  <ul className="p-8 rounded-lg" ref={parent}>
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
                        <div className="grid grid-cols-3 gap-12 mb-4 shadow-custom p-16 rounded-lg mt-20">
                          {SoftwareData.languages.length > 0 && (
                            <div className="shadow-custom p-4 rounded-lg flex flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small">
                              <h3 className="text-2xl font-semibold">
                                Nyelvek
                              </h3>
                              <p className="text-lg mt-2">
                                {SoftwareData.languages.join(", ")}
                              </p>
                            </div>
                          )}

                          {SoftwareData.supports.length > 0 && (
                            <div className="shadow-custom p-4 rounded-lg flex flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small">
                              <h3 className="text-2xl font-semibold">
                                Támogatás nyelve
                              </h3>
                              <p className="text-lg mt-2 rounded-lg">
                                {SoftwareData.supports.join(", ")}
                              </p>
                            </div>
                          )}

                          {SoftwareData.oSs.length > 0 && (
                            <div className="shadow-custom p-4 rounded-lg flex flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small">
                              <h3 className="text-2xl font-semibold">
                                Operációs rendszerek
                              </h3>
                              <p className="text-lg mt-2 rounded-lg">
                                {SoftwareData.oSs.join(", ")}
                              </p>
                            </div>
                          )}

                          {SoftwareData.devices.length > 0 && (
                            <div className="shadow-custom p-4 rounded-lg flex flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small">
                              <h3 className="text-2xl font-semibold">
                                Eszközök
                              </h3>
                              <p className="text-lg mt-2">
                                {SoftwareData.devices.join(", ")}
                              </p>
                            </div>
                          )}

                          {SoftwareData.moduls.length > 0 && (
                            <div className="shadow-custom p-4 rounded-lg flex flex-col items-center justify-center text-center hover-scale-small:hover hover-scale-small">
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
                        <div className="flex flex-wrap gap-8 shadow-custom p-16 rounded-lg mt-20">
                          {SoftwareData.functions
                            .filter((func) => func.sfunction === true)
                            .map((func) => (
                              <div
                                key={func.softwareFunctionID}
                                className="bg-white rounded-lg shadow-custom p-2 flex-grow hover-scale-small:hover hover-scale-small "
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
                        <div className="flex flex-wrap gap-8 mt-20 shadow-custom p-16 rounded-lg">
                          <div className="bg-white rounded-lg shadow-custom p-4 flex-grow hover-scale-element:hover hover-scale-element">
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
                              className="bg-white rounded-lg shadow-custom p-4 flex-grow hover-scale-element:hover hover-scale-element"
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
                  <div>
                    <div className="grid grid-cols-1 gap-8 p-8">
                      {ratings.length > 0 ? (
                        ratings.map((rating) => (
                          <div
                            key={rating.ratingID}
                            className="bg-white p-6 rounded-lg shadow-custom mb-4"
                          >
                            <p className="text-gray-800 mb-2 font-semibold text-lg">
                              {rating.user.firstname} {rating.user.lastname} -{" "}
                              {rating.user.country}
                            </p>
                            <div className="text-gray-700 mb-2 flex items-center"></div>
                            <div className="text-gray-700 mb-2 grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-3 gap-4">
                              <div className="text-center">
                                <span className="font-bold block">Összegzett értékelés:</span>
                                <span className="block">{renderStars("overall", rating.star.all)}</span>
                              </div>
                              <div className="text-center">
                                <span className="font-bold block">Egyszerűség:</span>
                                <span className="block">{renderStars("simplicity", rating.star.simplicity)}</span>
                              </div>
                              <div className="text-center">
                                <span className="font-bold block">Szolgáltatás:</span>
                                <span className="block">{renderStars("service", rating.star.service)}</span>
                              </div>
                              <div className="text-center">
                                <span className="font-bold block">Jellemzők:</span>
                                <span className="block">{renderStars("characteristic", rating.star.characteristic)}</span>
                              </div>
                              <div className="text-center">
                                <span className="font-bold block">Ár-érték arány:</span>
                                <span className="block">{renderStars("price_value", rating.star.price_value)}</span>
                              </div>
                              <div className="text-center">
                                <span className="font-bold block">Ajánlás:</span>
                                <span className="block">{renderStars("recommendation", rating.star.recommendation)}</span>
                              </div>
                            </div>
                            <p className="text-gray-700 mb-4">
                              <span className="font-bold">Pozitív aspektusok:</span>{" "}
                              {rating.textRating.positive}
                            </p>
                            <p className="text-gray-700 mb-4">
                              <span className="font-bold">Negatív aspektusok:</span>{" "}
                              {rating.textRating.negative}
                            </p>
                            <p className="text-gray-700 mb-4">
                              <span className="font-bold">Használat oka:</span>{" "}
                              {rating.textRating.reason_of_use}
                            </p>
                            <p className="text-gray-700 mb-4">
                              <span className="font-bold">Használat időtartama:</span>{" "}
                              {rating.textRating.duration_of_use}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div>Nem található értékelés</div>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-8 p-8">
                      {recommendedSoftwares.length > 0 ? (
                        recommendedSoftwares.map((software) => (
                          <Link
                            key={software.softwareID}
                            to={`/szoftverek/${transliterate(
                              software.category_group // Ensure this matches the data property
                            )}/${transliterate(software.category)}/${
                              software.softwareID
                            }/${transliterate(software.name)}`}
                            className="bg-white p-6 rounded-lg shadow-custom hover-scale-small:hover hover-scale-small"
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
                              <h3 className="text-xl font-semibold mb-2">
                                {software.name}
                              </h3>
                              <p className="text-gray-700 mb-2">
                                {software.category_group} - {software.category}
                              </p>
                              <p className="text-gray-600">
                                {software.description}
                              </p>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div>Nem található hasonló szoftver</div>
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

export default SoftwareDetail;
