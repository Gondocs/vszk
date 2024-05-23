import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../api/api";
import { showToast } from "../toasts/toast";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useAuth } from "../Auth/Auth";
import { useMediaQuery } from "react-responsive";
import "../../css/sidebar.css";
import DesktopNavbar from "./Desktop/DesktopNavbar";
import BurgerMenu from "./Mobile/BurgerMenu";

export const Navbar = () => {
  const [parent] = useAutoAnimate(/* optional config */);
  const [SoftwareData, setSoftwareData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSoftwareData, setFilteredSoftwareData] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchnavigate = useNavigate();
  const hasSearchResults = filteredSoftwareData.length > 0;
  const [loading, setLoading] = useState(true); // Add loading state
  const { token } = useAuth();

  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

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

  const handleSearchButtonClick = () => {
    searchnavigate(`/szoftverek?search=${searchQuery}`);
    setIsSearchFocused(false);
  };

  const filterSoftwareData = () => {
    setLoading(true);
    if (searchQuery.trim().length === 0) {
      setFilteredSoftwareData(SoftwareData);
      return;
    }

    const filteredData = SoftwareData.filter((software) => {
      return software.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setFilteredSoftwareData(filteredData);
    setLoading(false);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  return (
    <>
      {isDesktopOrLaptop ? (
        <DesktopNavbar
          parent={parent}
          SoftwareData={SoftwareData}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredSoftwareData={filteredSoftwareData}
          isSearchFocused={isSearchFocused}
          searchnavigate={searchnavigate}
          hasSearchResults={hasSearchResults}
          loading={loading}
          token={token}
          handleInputChange={handleInputChange}
          handleLinkClick={handleLinkClick}
          handleSearchFocus={handleSearchFocus}
          handleSearchBlur={handleSearchBlur}
          handleSearchEnter={handleSearchEnter}
          handleSearchButtonClick={handleSearchButtonClick}
          filterSoftwareData={filterSoftwareData}
        />
      ) : (
        <BurgerMenu
          parent={parent}
          SoftwareData={SoftwareData}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredSoftwareData={filteredSoftwareData}
          isSearchFocused={isSearchFocused}
          searchnavigate={searchnavigate}
          hasSearchResults={hasSearchResults}
          loading={loading}
          token={token}
          handleInputChange={handleInputChange}
          handleLinkClick={handleLinkClick}
          handleSearchFocus={handleSearchFocus}
          handleSearchBlur={handleSearchBlur}
          handleSearchEnter={handleSearchEnter}
          handleSearchButtonClick={handleSearchButtonClick}
          filterSoftwareData={filterSoftwareData}
          isDesktopOrLaptop={isDesktopOrLaptop}
        />
      )}
    </>
  );
};
