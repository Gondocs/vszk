import React, { useState } from 'react';
import '../css/softwareList.css'

const softwareData = [
  { id: 1, name: 'Elsoproba A' },
  { id: 2, name: 'Masodik B' },
  { id: 3, name: 'Harmadik C' },
  { id: 4, name: 'Negyedik D' },
];

function SoftwareList() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredSoftware = softwareData.filter((software) =>
    software.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex bg-slate-100 bodyheight">
        
        {/* left */}
      <div className="w-1/4 bg-gray-300 p-4 mb-80">
        <h2 className="text-lg font-semibold mb-4">Szoftverkeresés</h2>
        <input
          type="text"
          placeholder="Szoftver neve..."
          className="border p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* right */}
      <div className="w-3/4 p-4 bg-gray-200 mb-80">
        <h1 className="text-2xl font-semibold mb-4">Szoftverlista</h1>
        <ul>
          {filteredSoftware.map((software) => (
            <li key={software.id}>{software.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SoftwareList;
