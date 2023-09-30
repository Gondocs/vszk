import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './PageNotFound';
import { get } from './api/api';
import { showToast } from './toasts/toast';

function SoftwareDetail() {
  const { name } = useParams();
  const [SoftwareData, setSoftwareData] = useState([]);

  useEffect(() => {
    get.SoftwareAll()
      .then((data) => {
        const software = data.find(
          (software) => software.name.replace(/\s+/g, '-').toLowerCase() === name
        );
        setSoftwareData(software);
        console.log(software)
      })
      .catch((error) => {
        console.error('Error fetching software data:', error);
        showToast('Hiba történt az adatok lekérése közben', 'error')
      });
  }, [name]);

  if (!SoftwareData) {
    return <NotFound />;
  }


  return (
    <div className="p-16 mt-8">
      <div className="bg-gray-200 p-16 rounded-lg shadow-lg flex items-center">
        <img
          src={SoftwareData.logo_link}
          alt="Software Logo"
          className=" w-96 h-64 rounded-40 mr-6"
          draggable="false"
        />
        <div>
          <h2 className="text-3xl font-semibold">{SoftwareData.name}</h2>
          <p className="text-lg font-semibold">Rating: {SoftwareData.rating}</p>
          <p className="text-lg mt-4">{SoftwareData.description}</p>
          <div className="mt-6">
            <a
              href={SoftwareData.website}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-md text-gray-900 font-semibold transition duration-300 inline-block"
            >
              Tovább a szoftver oldalára
            </a>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
}

export default SoftwareDetail;
