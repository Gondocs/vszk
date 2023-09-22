import React, { useState } from 'react';

const softwareData = [
  { id: 1, name: 'Software A' },
  { id: 2, name: 'Software B' },
  { id: 3, name: 'Software C' },
  { id: 4, name: 'Software D' },
];

function SoftwareList() {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredSoftware = softwareData.filter((software) =>
    software.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-gray-200 p-4">
        <h2 className="text-lg font-semibold mb-4">Search Software</h2>
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 w-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Right Content */}
      <div className="w-3/4 p-4">
        <h1 className="text-2xl font-semibold mb-4">Software List</h1>
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
