import React, { useState } from 'react';
import axios from 'axios';
import instance from '../apis/config';
import ProjectsCards from '../components/PeojectsCards'; 

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await instance.get(`/projects/search/?search=${query}`);
      const data = Array.isArray(response.data.results) ? response.data.results : response.data;
      setResults(data);
      setNoResults(data.length === 0);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
      setNoResults(true);
    }
  };

  return (
<div className="px-4 py-8 bg-gray-50 ">
  <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow mb-8">
    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-4">
      <input
        type="text"
        className="flex-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none"
        placeholder="🔍 Search projects..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className="px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
      >
        Search
      </button>
    </form>
  </div>

  {noResults && (
    <p className="text-center text-red-600 font-semibold">No projects found.</p>
  )}

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {results.map((project) => (
      <ProjectsCards key={project.id} project={project} />
    ))}
  </div>
</div>
  );
}

export default Search;
