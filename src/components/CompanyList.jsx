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

  const filteredCompanies = CompanyData.filter((company) =>
  company.name.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <div className="flex min-h-screen bg-gray-200 py-8 px-16 FadeInSmall">

      <div className="w-1/5 bg-gray-100 p-8 rounded-40 mr-16">
        <h2 className="text-lg font-semibold mb-4 hover-scale-element:hover hover-scale-element">Cégkeresés</h2>
        <input
          type="text"
          placeholder="Szoftver neve..."
          className="border rounded-lg p-2 w-full hover-scale-element:hover hover-scale-element"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="w-3/4 p-4 bg-gray-200 rounded-40 ">
        <h1 className="text-2xl font-semibold mb-8 mt-2 ml-12 hover-scale-element:hover hover-scale-element">Céglista</h1>
        <ul>
        {filteredCompanies.map((company) => (
  <li key={company.softwareID} className="pb-8 px-4 hover-scale-element:hover hover-scale-element FadeInSmall">
    <div className="bg-white rounded-25 pr-12 pb-12 pt-12 border border-gray-400 flex">
      {/* Container for the image (1/3 of the width) */}
      <div className="w-1/3 flex justify-center items-center">
        <Link to={`/szoftverek/${transliterate(company.name)}`} className="flex items-center">
          <img
            src={company.logo_link}
            alt="Software Placeholder"
            className="pl-10 pr-10"
            draggable="false"
            style={{ width: 'auto', height: 'auto' }}
          />
        </Link>
      </div>

      {/* Container for the data (2/3 of the width) */}
      <div className='w-2/3'>
        <Link
          to={`/szoftverek/${transliterate(company.name)}`}
          className="text-3xl font-semibold text-black"
        >
          {company.name}
        </Link>
        <Link to={`/szoftverek/${transliterate(company.name)}`}>
          <p className="text-gray-600 text-xl mb-2 mt-2">{company.name}</p>
        </Link>
        <div className="flex items-center">
          <span className="text-black text-lg mr-2">
            Vélemények:
            <StarIcon fontSize="medium" className='starmargin' style={{ color: 'rgb(255, 210, 48)' }}/>
          </span>
        </div>
        <p className="text-black">Leírás: {company.description}</p>
      </div>
    </div>
  </li>
))}

</ul>


      </div>
    </div>
  );
};
