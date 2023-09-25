import React from 'react';
import { useParams } from 'react-router-dom';

function SoftwareDetail({ softwareData }) {
  const { name } = useParams();

  
  const selectedSoftware = softwareData.find(
    (software) =>
      software.name.replace(/\s+/g, '-').toLowerCase() === name
  );

  if (!selectedSoftware) {
    return <div>Software not found</div>;
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
