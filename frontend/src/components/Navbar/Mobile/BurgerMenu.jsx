import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../Searchbar/SearchBar';
import ProfileDropdown from '../DropdownMenus/ProfileDropdown';
import { slide as Menu } from "react-burger-menu";
import "../../../css/sidebar.css";
import { useMediaQuery } from 'react-responsive';
import NewMenu from "../DropdownMenus/SoftwareCategoriesDropdown";

const BurgerMenu = ({
  parent,
  searchQuery,
  filteredSoftwareData,
  isSearchFocused,
  hasSearchResults,
  loading,
  token,
  handleInputChange,
  handleLinkClick,
  handleSearchFocus,
  handleSearchBlur,
  handleSearchEnter,
  handleSearchButtonClick,
  isDesktopOrLaptop,
}) => (
  <nav className="bg-gray-800 rounded-b-lg flex-grow sticky top-0 z-50">
    <div className="flex justify-between">
      <Menu>
        <Link to="/" className="menu-item">
          Főoldal
        </Link>
        <NewMenu />
        <Link to="/cegek" className="menu-item">
          Cégek
        </Link>
        <Link to="/osszehasonlitas" className="menu-item">
          Összehasonlítás
        </Link>
        {!token && (
          <>
            <Link to="/belepes" className="pt-5 menu-item block">
              Belépés
            </Link>
            <Link to="/regisztracio" className="menu-item block">
              Regisztráció
            </Link>
          </>
        )}
      </Menu>

      {token ? (
        <div className="pt-5">
          <ProfileDropdown />
        </div>
      ) : null}
    </div>

    <SearchBar
      searchQuery={searchQuery}
      handleInputChange={handleInputChange}
      handleSearchFocus={handleSearchFocus}
      handleSearchBlur={handleSearchBlur}
      handleSearchEnter={handleSearchEnter}
      handleSearchButtonClick={handleSearchButtonClick}
      isSearchFocused={isSearchFocused}
      loading={loading}
      hasSearchResults={hasSearchResults}
      filteredSoftwareData={filteredSoftwareData}
      handleLinkClick={handleLinkClick}
      parent={parent}
      token={token}
    />
  </nav>
);

export default BurgerMenu;