import React from 'react';
import { useParams } from 'react-router-dom';
import NotFound from './PageNotFound';

const softwareData = [
  { id: 1, name: 'Elso  A', company: 'Helloszia', rating: 4.5, description: 'Valami szöveg ide meg ide meg ide is aha értem persze nagyon sok kedvem van egy jó szép hosszú szöveget írni, képzelheted, de hát a jó katona vérben is harcol, ahogy szokták mondani, drága zoltán, nagyon remélem, hogy ma valami rendesebb küldetéseket kapunk faszmoban mert már volt egy hete, hogy teljesíthető cuccokat kaptunk, ami után nem kezdtük el kihúzni a hajunkat majd levetni magunkat a tizedik emeletről.' },
  { id: 2, name: 'Masodik B', company: 'Majkroszaft', rating: 3.8, description: 'Valami szöveg ide meg ide meg ide is aha értem persze nagyon sok kedvem van egy jó szép hosszú szöveget írni, képzelheted, de hát a jó katona vérben is harcol, ahogy szokták mondani, drága zoltán, nagyon remélem, hogy ma valami rendesebb küldetéseket kapunk faszmoban mert már volt egy hete, hogy teljesíthető cuccokat kaptunk, ami után nem kezdtük el kihúzni a hajunkat majd levetni magunkat a tizedik emeletről.' },
  { id: 3, name: 'Harmadik C', company: 'KisC Kft.', rating: 4.2, description: 'Valami szöveg ide meg ide meg ide is aha értem persze nagyon sok kedvem van egy jó szép hosszú szöveget írni, képzelheted, de hát a jó katona vérben is harcol, ahogy szokták mondani, drága zoltán, nagyon remélem, hogy ma valami rendesebb küldetéseket kapunk faszmoban mert már volt egy hete, hogy teljesíthető cuccokat kaptunk, ami után nem kezdtük el kihúzni a hajunkat majd levetni magunkat a tizedik emeletről.' },
  { id: 4, name: 'Negyedik D', company: 'Hihihe Bt.', rating: 4.0, description: 'Valami szöveg ide meg ide meg ide is aha értem persze nagyon sok kedvem van egy jó szép hosszú szöveget írni, képzelheted, de hát a jó katona vérben is harcol, ahogy szokták mondani, drága zoltán, nagyon remélem, hogy ma valami rendesebb küldetéseket kapunk faszmoban mert már volt egy hete, hogy teljesíthető cuccokat kaptunk, ami után nem kezdtük el kihúzni a hajunkat majd levetni magunkat a tizedik emeletről.' },
];

function SoftwareDetail() {



  const { name } = useParams();

  
  const selectedSoftware = softwareData.find(
    (software) =>
      software.name.replace(/\s+/g, '-').toLowerCase() === name
  );

  if (!selectedSoftware) {
    return <div><NotFound/></div>;
  }

  return (
    <div className='px-16 py-16 bg-slate-100'>

    <div className="px-16 py-16 bg-white text-black p-8 rounded-lg shadow-lg mt-1">
      <h2 className="text-3xl font-semibold">{selectedSoftware.name}</h2>
      <div className="flex items-center mt-4">
        <p className="text-lg font-semibold">
          Rating: {selectedSoftware.rating}
        </p>
      </div>
      <p className="mt-4 text-lg">{selectedSoftware.description}</p>
      <div className="mt-6 flex justify-end">
        <button className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-md text-gray-900 font-semibold transition duration-300">
          Tovább a szoftver oldalára
        </button>
      </div>
    </div>
    </div>
  );
}

export default SoftwareDetail;
