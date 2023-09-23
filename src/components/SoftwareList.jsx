import React, { useState } from 'react';
import '../css/softwareList.css';
import StarIcon from '@mui/icons-material/Star';


const softwareData = [
  { id: 1, name: 'Elsoproba A', company: 'Cég A', rating: 4.5, description: 'Valami szöveg ide meg ide meg ide is aha értem persze nagyon sok kedvem van egy jó szép hosszú szöveget írni, képzelheted, de hát a jó katona vérben is harcol, ahogy szokták mondani, drága zoltán, nagyon remélem, hogy ma valami rendesebb küldetéseket kapunk faszmoban mert már volt egy hete, hogy teljesíthető cuccokat kaptunk, ami után nem kezdtük el kihúzni a hajunkat majd levetni magunkat a tizedik emeletről.' },
  { id: 2, name: 'Masodik B', company: 'Cég B', rating: 3.8, description: 'Valami szöveg ide meg ide meg ide is aha értem persze nagyon sok kedvem van egy jó szép hosszú szöveget írni, képzelheted, de hát a jó katona vérben is harcol, ahogy szokták mondani, drága zoltán, nagyon remélem, hogy ma valami rendesebb küldetéseket kapunk faszmoban mert már volt egy hete, hogy teljesíthető cuccokat kaptunk, ami után nem kezdtük el kihúzni a hajunkat majd levetni magunkat a tizedik emeletről.' },
  { id: 3, name: 'Harmadik C', company: 'Cég C', rating: 4.2, description: 'Valami szöveg ide meg ide meg ide is aha értem persze nagyon sok kedvem van egy jó szép hosszú szöveget írni, képzelheted, de hát a jó katona vérben is harcol, ahogy szokták mondani, drága zoltán, nagyon remélem, hogy ma valami rendesebb küldetéseket kapunk faszmoban mert már volt egy hete, hogy teljesíthető cuccokat kaptunk, ami után nem kezdtük el kihúzni a hajunkat majd levetni magunkat a tizedik emeletről.' },
  { id: 4, name: 'Negyedik D', company: 'Cég D', rating: 4.0, description: 'Valami szöveg ide meg ide meg ide is aha értem persze nagyon sok kedvem van egy jó szép hosszú szöveget írni, képzelheted, de hát a jó katona vérben is harcol, ahogy szokták mondani, drága zoltán, nagyon remélem, hogy ma valami rendesebb küldetéseket kapunk faszmoban mert már volt egy hete, hogy teljesíthető cuccokat kaptunk, ami után nem kezdtük el kihúzni a hajunkat majd levetni magunkat a tizedik emeletről.' },
];

function SoftwareList() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredSoftware = softwareData.filter((software) =>
    software.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 py-8 px-8">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-300 p-8 rounded-40 mr-4"> {/* Add rounded-lg class */}
        <h2 className="text-lg font-semibold mb-4">Szoftverkeresés</h2>
        <input
          type="text"
          placeholder="Szoftver neve..."
          className="border rounded-lg p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Content */}
      <div className="w-3/4 p-4 bg-gray-200 rounded-40">
        <h1 className="text-2xl font-semibold mb-8 mt-2 ml-8">Szoftverlista</h1>
        <ul>
          {filteredSoftware.map((software) => (
            <li key={software.id} className="mb-6 px-4">
              <div className="bg-white rounded-40 p-4">
                <div className="flex mb-2">
                  <img
                    src="https://via.placeholder.com/400x200"
                    alt="Software Placeholder"
                    className="w-56 h-28 mr-4 rounded-99"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{software.name}</h2>
                    <p className="text-gray-600">{software.company}</p>
                    <div className="flex items-center">
                      <span className="text-yellow-500 text-sm mr-2">
                        Vélemények: {software.rating}<StarIcon fontSize="small" className='starmargin' />
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
}

export default SoftwareList;