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
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const navigate = useNavigate();
  const navigateback = useNavigate();
  const searchnavigate = useNavigate();

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
    if (!isSearchFocused) {
      setIsSearchFocused(true);
    }
  };

  const handleLinkClick = () => {
    setSearchQuery(""); // Clear the search query on link click
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setTimeout(() => {
      setIsSearchFocused(false);
    }, 250); // Delay for 250 milliseconds (0.25 seconds) NEEDS IN ORDER TO CLICK ON THE LINKS
  };

  const handleSearchEnter = (e) => {
    if (e.key === "Enter") {
      // Redirect to the SoftwareList component with the search query
      searchnavigate(`/szoftverek?search=${searchQuery}`);
      setIsSearchFocused(false);
    }
  };

  const filterSoftwareData = () => {
    const filteredData = SoftwareData.filter((software) => {
      return software.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setFilteredSoftwareData(filteredData);
  };

  useEffect(() => {
    get
      .GettAllInfos()
      .then((data) => {
        setSoftwareData(data);
        filterSoftwareData();
        console.log(data);
      })
      .catch((error) => {
        showToast("Hiba történt az adatok lekérése közben", "error");
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    filterSoftwareData();
  }, [searchQuery]);

  useEffect(() => {
    // Check the authentication status here (e.g., from a token or session)
    // Update the isLoggedIn state accordingly
    const authToken = localStorage.getItem("token");
    if (authToken) {
      setIsLoggedIn(true);
      console.log("LoggedIn");
    } else {
      setIsLoggedIn(false);
      console.log("LoggedOut");
    }
    setIsLoading(false);
  }, []);

  const handleLogout = () => {
    // Call the logout function to clear the token
    post.Logout();

    // Redirect to the login page or another appropriate page
    navigateback("/"); // navigate back to the previous page
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
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                  onKeyDown={handleSearchEnter} // Handle Enter key press
                />
              </div>

              {isSearchFocused && searchQuery && (
                <div className="absolute left-0 mt-2 z-10 bg-white rounded-lg shadow-md w-full max-h-96 overflow-y-auto p-4 FadeInSmall">
                  {filteredSoftwareData.map((software) => (
                    <Link
                      key={software.softwareID}
                      to={`/szoftverek/${transliterate(
                        software.category_group
                      )}/${transliterate(software.category)}/${transliterate(
                        software.name
                      )}`}
                      className="flex items-center px-4 py-2 hover:bg-gray-200 text-gray-800 hover:text-black hover:rounded-lg"
                      onClick={handleLinkClick}
                      style={{ height: "100px" }}
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
                            }}
                          />
                        </div>
                      </div>
                      <div className="w-2/3 pl-12 text-xl font-semibold">
                        {software.name}
                        <br />
                        <div className="text-sm mt-1">{software.category}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {isLoggedIn ? (
              // render profile menu if logged in
              <div className="text-white mr-10 relative group">
                <button
                  className="hover:text-gray-400 text-[1.2rem]"
                  onClick={handleProfileClick}
                >
                  Üdvözlünk, {localStorage.getItem("username")}!
                </button>
                {isProfileDropdownVisible && (
                  <div className="absolute z-10 bg-white rounded-lg right-0 shadow-md mt-2">
                    {/* profile menu items */}
                    {/*<Link
                      to="/profile"
                      className="block px-8 py-4 hover:bg-gray-200 text-gray-800 hover:text-black hover:rounded-lg"
                    >
                      Profil
                </Link>*/}
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
                  className="text-white hover:text-gray-400 mr-3 hover-scale hover-scale:hover text-[1.1rem] pr-3"
                >
                  Belépés
                </Link>
                <Link
                  to="/regisztracio"
                  className="text-white hover:text-gray-400 mr-4 hover-scale hover-scale:hover text-[1.1rem]"
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
