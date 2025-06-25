import React, { useEffect, useState } from "react";
// import axios from "axios";
import instance from '../apis/config';
import ProjectsCards from "../components/PeojectsCards";
import { useNavigate } from 'react-router';
function Projects({ token }) {
  const navigate=useNavigate()
  const addproject = ()=>{
    navigate('/addproject')
  }
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
// Get all Projects 
useEffect(()=>{
  const getProjects = async()=>{
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No auth token found.');
      setLoading(false);
      return;
    }
    try{
      const response = await instance.get('/projects/',{
        headers: {
          'Authorization': `Token ${token}`
        }
      });
      console.log("Projects API response:", response.data);
      setProjects(response.data.results);
      setLoading(false);
    }catch(error){
        setError(error.message);
        setLoading(false);
    }
  };
    getProjects();
},[])
  if (loading) return <p>Loading projects...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
   <div className="container">
    <button onClick={addproject} className="btn btn-primary mb-4">add project</button>
   </div>
     <div className="row row-cols-1 row-cols-md-3 g-4">
     {projects.map(project => (
         <div className="col" key={project.id}>
            <ProjectsCards key={project.id} project={project} />
          </div>
              ))}
        </div>
    </>
  )
}

export default Projects