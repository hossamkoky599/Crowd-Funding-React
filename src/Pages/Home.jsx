
import React, { useEffect, useState } from 'react';
import instance from '../apis/config';
// import ProjectsCards from '../components/PeojectsCards';
import { Link } from 'react-router-dom';

import Search from './Search'; 


function Home() {
  const [latestProjects, setLatestProjects] = useState([]);
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [topRatedProjects, setTopRatedProjects] = useState([]);

  useEffect(() => {
    instance
      .get('/home-projects/')
      .then((response) => {
        const data = response.data;
        setLatestProjects(data.latest_projects || []);
        setFeaturedProjects(data.featured_projects || []);
        const sortedTopRated = (data.top_rated_projects || []).sort(
          (a, b) => (b.avg_rating || 0) - (a.avg_rating || 0)
        );
        setTopRatedProjects(sortedTopRated);
      })
      .catch((error) => {
        console.error('❌ Error fetching projects:', error);
        setLatestProjects([]);
        setFeaturedProjects([]);
        setTopRatedProjects([]);
      });
  }, []);

  const getFullImageUrl = (imagePath) => {
    if (!imagePath) return null;
    return imagePath.startsWith('http')
      ? imagePath
      : `http://localhost:8000${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
  };

  const ProjectCard = ({ proj }) => {
    const imageUrl = getFullImageUrl(proj.images?.[0]?.image);

    return (
      <div className="border rounded-xl shadow p-4 text-center bg-white">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={proj.title}
            className="h-32 w-full rounded-md mx-auto mb-3 object-cover"
          />
        ) : (
          <div className="h-32 w-full bg-gray-200 flex items-center justify-center rounded-md mb-3">
            <span className="text-sm text-gray-500">No image available</span>
          </div>
        )}
        <h4 className="text-lg font-bold">{proj.title}</h4>
        <p className="text-sm font-semibold">{proj.totalTarget} EGP</p>
        <p className="text-xs text-gray-500">{proj.details?.slice(0, 40)}...</p>
        {proj.avg_rating !== undefined && (
          <p className="text-xs text-yellow-600 mt-1">
            ⭐ {proj.avg_rating?.toFixed(1) || 0} / 5
          </p>
        )}
        <Link
          to={`/project/${proj.id}`}
          className="inline-block mt-3 px-4 py-2 bg-purple-700 text-white rounded-md text-sm hover:bg-purple-800 transition"
        >
          View Details
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to CrowdFund</h1>
        <Search />
      </div>

      <div className="p-4">
        {/* 🔝 Top Rated Projects */}
        <h1 className="text-2xl font-bold mb-4">⭐ Top Rated Projects</h1>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {topRatedProjects.length > 0 ? (
            topRatedProjects.map((proj) => (
              <div key={proj.id} className="min-w-[250px]">
                <ProjectCard proj={proj} />
              </div>
            ))
          ) : (
            <p className="text-gray-500">No top rated projects available.</p>
          )}
        </div>

        {/* 🏗️ Featured Projects */}
        <h1 className="text-2xl font-bold mb-4 mt-6">🏗️ Featured Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((proj) => (
              <ProjectCard key={proj.id} proj={proj} />
            ))
          ) : (
            <p className="text-gray-500">No featured projects available.</p>
          )}
        </div>

        {/* 🆕 Latest Projects */}
        <h1 className="text-2xl font-bold mb-4">🆕 Latest Projects</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {latestProjects.length > 0 ? (
            latestProjects.map((proj) => (
              <ProjectCard key={proj.id} proj={proj} />
            ))
          ) : (
            <p className="text-gray-500">No latest projects available.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;