import React from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from '../DropdownMenus/ProfileDropdown';
import NewMenu from '../DropdownMenus/SoftwareCategoriesDropdown';
import SearchBar from '../SearchbarComponent/SearchBar';


const DesktopNavbar = ({
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
  }) => (
    <nav className="bg-gray-800 px-4 py-6 rounded-b-lg flex-grow sticky top-0 z-50">
      <div className="flex items-center">
        <Link
          to="/"
          className="text-white hover:text-gray-400 block mr-12 ml-4 text-[1.5rem] hover-scale hover-scalemain hover-scalemain:hover"
        >
          Főoldal
        </Link>
  
        <NewMenu />
  
        <Link
          to="/cegek"
          className="text-white hover:text-gray-400 block mr-12 hover-scale hover-scale:hover text-[1.2rem]"
        >
          Cégek
        </Link>
  
        <Link
          to="/osszehasonlitas"
          className="text-white hover:text-gray-400 block mr-2 hover-scale hover-scale:hover text-[1.2rem]"
        >
          Összehasonlítás
        </Link>
        <>
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
  
          {token ? (
            <ProfileDropdown />
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
      </div>
    </nav>
  );

export default DesktopNavbar;