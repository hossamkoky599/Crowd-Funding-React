import React from "react";
import "../assets/css/projectscards.css";
import { useNavigate } from "react-router-dom";
import defaultImage from "../assets/images/3386.jpg";


function ProjectsCards({ project }) {
  const navigate = useNavigate();
  const imageUrl = project?.images?.[0]?.image || defaultImage;
  console.log(imageUrl);
  
  const handleViewDetails = () => {
    navigate(`/project/${project.id}`);
  };

  return (
    <div
      className="card"
      style={imageUrl ? { "--bg-image": `url(${imageUrl})` } : {}}
    >
      <div className="card-content">
        <h2 className="card-title text-white">{project.title}</h2>
        <p className="card-body text-white">
          {project.details.substring(0, 100)}
          {project.details.length > 100 ? "..." : ""}
        </p>


        <div className="project-meta text-white">
          <div>
            <span className="meta-label">Target:</span>
            <span>{project.totalTarget}$</span>
          </div>

          <div>
            <span className="meta-label">Dates:</span>
            <span>
              {new Date(project.startTime).toLocaleDateString()} -{" "}
              {new Date(project.endTime).toLocaleDateString()}
            </span>
          </div>

          {project.category && (
            <div>
              <span className="meta-label text-white">Category:</span>
              <span>{project.category.name}</span>
            </div>
          )}
        </div>

        <div className="tags-container">
          {project.tags.map((tag, id) => (
            <span className="tag text-white" key={id}>
              #{tag.name}
            </span>
          ))}
        </div>

        <button className="button" onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
}

export default ProjectsCards;

