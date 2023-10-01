import React, { useState, useEffect } from 'react';
import '../css/softwareList.css';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import { transliterate } from './api/transliteration';
import { get } from './api/api';
import { showToast } from './toasts/toast';




export const CompanyList = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [CompanyData, setCompanyData] = useState([]);

  useEffect(() => {
    get.Company()
      .then((data) => {
        setCompanyData(data);
      })
      .catch((error) => {
        showToast('Hiba történt az adatok lekérése közben', 'error');
      });

  }, []);

  useEffect(() => { console.log(CompanyData);}, [CompanyData]);

  

  return (
    <div className="flex min-h-screen bg-gray-100 py-8 px-16 FadeInSmall">

      <div className="w-1/5 bg-gray-200 p-8 rounded-40 mr-16">
        <h2 className="text-lg font-semibold mb-4 hover-scale-element:hover hover-scale-element">Szoftverkeresés</h2>
        <input
          type="text"
          placeholder="Szoftver neve..."
          className="border rounded-lg p-2 w-full hover-scale-element:hover hover-scale-element"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-3/4 p-4 bg-gray-200 rounded-40 ">
        <h1 className="text-2xl font-semibold mb-8 mt-2 ml-12 hover-scale-element:hover hover-scale-element">Szoftverlista</h1>
        <ul>
  {CompanyData.map((software) => (
    <li key={software.softwareID} className="mb-6 px-4 hover-scale-element:hover hover-scale-element FadeInSmall">
      <div className="bg-white rounded-40 p-4">
        <div className="flex mb-2 pl-4 pt-4">

          <Link to={`/szoftverek/${transliterate(software.category.categoryGroup.name)}/${transliterate(software.category.name)}/${transliterate(software.name)}`}>
            <img
              src={software.logo_link}
              alt="Software Placeholder"
              className="w-56 h-28 mr-4 rounded-40"
              draggable="false"
            />
          </Link>
          <div>
            <Link
              to={`/szoftverek/${transliterate(software.category.categoryGroup.name)}/${transliterate(software.category.name)}/${transliterate(software.name)}`}
              className="text-3xl font-semibold text-black"
            >
              {software.name}
            </Link>
            <Link to={`/cegek/${transliterate(software.company.name)}`}>
            <p className="text-gray-600 text-xl mb-2 mt-2">{software.company.name}</p>
            </Link>
            <div className="flex items-center">
              <span className="text-black text-lg mr-2">
                Vélemények: 
                <StarIcon fontSize="medium" className='starmargin' style={{ color: 'rgb(255, 210, 48)' }}/>
              </span>
            </div>
          </div>
        </div>
        <p className="text-gray-700 m-4">{software.description}</p>
      </div>
    </li>
  ))}
</ul>


      </div>
    </div>
  );
};
