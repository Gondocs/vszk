import React from 'react';
import { useParams } from 'react-router-dom';

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
    return <div>Szoftver nem található</div>;
  }

  return (
    <div>
      <h2>{selectedSoftware.name}</h2>
      <p>Company: {selectedSoftware.company}</p>
      <p>Rating: {selectedSoftware.rating}</p>
      <p>Description: {selectedSoftware.description}</p>
    </div>
  );
}

export default SoftwareDetail;
