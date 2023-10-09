import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import DropdownMenu from "./dropDown";
import { get, post } from "../api/api";
import { showToast } from "../toasts/toast";
import { transliterate } from "../api/transliteration";

export const Navbar = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] =
    useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [SoftwareData, setSoftwareData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSoftwareData, setFilteredSoftwareData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownVisible(!isProfileDropdownVisible);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleLinkClick = () => {
    setSearchQuery(""); // Clear the search query on link click
  };

  const filterSoftwareData = () => {
    const filteredData = SoftwareData.filter((software) =>
      software.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Limit to the top 5 results
    const top5Results = filteredData.slice(0, 5);
    setFilteredSoftwareData(top5Results);
  };

  useEffect(() => {
    get
      .GettAllInfos()
      .then((data) => {
        setSoftwareData(data);
        filterSoftwareData();
      })
      .catch((error) => {
        showToast("Hiba történt az adatok lekérése közben", "error");
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterSoftwareData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    // Check the authentication status here (e.g., from a token or session)
    // Update the isLoggedIn state accordingly
    const authToken = localStorage.getItem("token");
    if (authToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    // Call the logout function to clear the token
    post.Logout();

    // Redirect to the login page or another appropriate page
    navigate(0);
  };

  return (

    <nav className="bg-gray-800 px-4 py-5 rounded-b-lg flex-grow relative">

      <div className="flex items-center">
        <Link
          to="/"
          className="text-white hover:text-gray-400 block mr-24 ml-4 text-[1.5rem] hover-scale hover-scalemain hover-scalemain:hover"
        >
          Főoldal
        </Link>

        <div
          className="relative group block mr-8 ml-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to={"/szoftverek"}>
            <button
              className={`text-white ${
                isDropdownVisible ? "text-gray-400" : "hover:text-gray-400"
              } block mr-8 hover-scale hover-scale:hover text-[1.2rem]`}
            >
              Szoftverek
            </button>
          </Link>
          {isDropdownVisible && <DropdownMenu />}
        </div>

        <Link
          to="/cegek"
          className="text-white hover:text-gray-400 block mr-12 hover-scale hover-scale:hover text-[1.2rem]"
        >
          Cégek
        </Link>

        <Link
          to="/osszehasonlitas"
          className="text-white hover:text-gray-400 block mr-12 hover-scale hover-scale:hover text-[1.2rem]"
        >
          Összehasonlítás
        </Link>

        {!isLoading && (
          <>

        <div className="flex-grow px-8 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Keresés"
              className="pl-5 pr-10 pt-2 pb-2 rounded-lg bg-gray-700 text-white focus:outline-none w-4/5 hover-scale-small hover-scale-small:hover"
              value={searchQuery}
              onChange={handleInputChange}
            />
          </div>

          {searchQuery && (
            <div className="absolute left-0 mt-2 z-10 bg-white rounded-lg shadow-md w-full">
              {filteredSoftwareData.map((software) => (
                <Link
                  key={software.softwareID}
                  to={`/szoftverek/${transliterate(
                    software.category_group
                  )}/${transliterate(software.category)}/${transliterate(
                    software.name
                  )}`}
                  className="block px-4 py-2 hover:bg-gray-200 text-gray-800 hover:text-black hover:rounded-lg"
                  onClick={handleLinkClick}
                >
                  {software.name}
                </Link>
              ))}
            </div>
          )}
        </div>

            {isLoggedIn ? (
              // Render profile menu if logged in
              <div className="text-white mr-10 relative group">
                <button
                  className="hover:text-gray-400 text-[1.2rem]"
                  onClick={handleProfileClick}
                >
                  Profil
                </button>
                {isProfileDropdownVisible && (
                  <div className="absolute z-10 bg-white rounded-lg right-0 shadow-md mt-2">
                    {/* Add profile menu items */}
                    <Link
                      to="/profile"
                      className="block px-8 py-4 hover:bg-gray-200 text-gray-800 hover:text-black hover:rounded-lg"
                    >
                      Profil
                    </Link>
                    <button
                      className="block px-8 py-4 hover:bg-gray-200 text-gray-800 hover:text-black hover:rounded-lg"
                      onClick={handleLogout}
                    >
                      Kijelentkezés
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Render login and registration links if not logged in
              <>
                <Link
                  to="/belepes"
                  className="text-white hover:text-gray-400 ml-8 hover-scale hover-scale:hover text-[1rem] pr-3"
                >
                  Belépés
                </Link>
                <Link
                  to="/regisztracio"
                  className="text-white hover:text-gray-400 mr-4 hover-scale hover-scale:hover text-[1rem]"
                >
                  Regisztráció
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
};
