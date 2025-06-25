import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../apis/config';
import ImageSliderComponent from '../components/ImageSliderComponent';
import DonationComponent from '../components/DonationComponent';
import CommentsSection from '../components/CommentsSection';
import RatingComponent from '../components/Rating';
import ReportProjectButton from '../components/ReportProject';
import ProjectsCards from '../components/PeojectsCards';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [similarProjects, setSimilarProjects] = useState([]);

  const fetchProject = useCallback(async () => {
    try {
      const res = await instance.get(`/projects/${id}/`);
      setProject(res.data);
    } catch (err) {
      console.error('Error fetching project:', err);
    }
  }, [id]);

  const fetchSimilarProjects = async () => {
    try {
      const res = await instance.get(`/projects/${id}/similar/`);
      setSimilarProjects(res.data);
    } catch (err) {
      console.error('Error fetching similar projects:', err);
    }
  };

  useEffect(() => {
    fetchProject();
    fetchSimilarProjects();
  }, [fetchProject]);

  if (!project) {
    return <div className="text-center mt-10 text-gray-800">Loading...</div>;
  }

  const remainingAmount = project.totalTarget - project.totalDonations;
  const progressPercentage = Math.min((project.totalDonations / project.totalTarget) * 100, 100);

  return (
    <div style={{ backgroundColor: '#fff', color: '#333' }}>
      <main style={{
        padding: '40px 80px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: '30px'
        }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', margin: 0 }}>
            {project.title}
          </h1>
          <ReportProjectButton 
            projectId={project.id}
            style={{
              background: 'none',
              border: '1px solid #ccc',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px',
              color: '#666'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '40px', marginBottom: '40px' }}>
          {/* Left Column */}
          <div style={{ flex: 2 }}>
            <div style={{ position: 'relative', marginBottom: '20px' , height: '600px', overflow: 'hidden', borderRadius: '12px'}}>
              <ImageSliderComponent images={project.images} />
            </div>

            {/* Rating */}
            <div style={{
              background: '#fffbf0',
              border: '1px solid #ffd700',
              borderRadius: '12px',
              padding: '20px',
              marginBottom: '20px'
            }}>
              <h3 style={{
                color: '#ff8c00',
                fontWeight: 'bold',
                marginBottom: '10px'
              }}>
                ⭐ Average Rating: {project.average_rating?.toFixed(1) || 0}
              </h3>
              <RatingComponent
                projectId={id}
                averageRating={project.average_rating}
                isAuthenticated={!!localStorage.getItem('token')}
                onRated={fetchProject}
              />
            </div>
          </div>

          {/* Right Column / Sidebar */}
          <div style={{
            flex: 1,
            background: '#f9f9f9',
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '20px',
            height: 'fit-content',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
          }}>
            {/* Project Details */}
            <div style={{
              background: 'white',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #eee',
              boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              marginBottom: '20px'
            }}>
              <h1 style={{ 
                marginBottom: '15px', 
                lineHeight: '1.6', 
                fontSize: '24px', 
                fontWeight: 'bold' 
              }}>
                {project.details}
              </h1>

              <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.8' }}>
                <p>🎯 <strong>Target:</strong> ${project.totalTarget?.toLocaleString()}</p>
                <p>💰 <strong>Donated:</strong> ${project.totalDonations?.toLocaleString()}</p>
                <p>⏳ <strong>Remaining:</strong> ${remainingAmount > 0 ? remainingAmount.toLocaleString() : 0}</p>
                <p>📅 <strong>Start:</strong> {new Date(project.startTime).toLocaleDateString()}</p>
                <p>📅 <strong>End:</strong> {new Date(project.endTime).toLocaleDateString()}</p>
              </div>
            </div>

            <h3 style={{ fontSize: '20px', marginBottom: '15px', color: '#333' }}>
              ${project.totalDonations?.toLocaleString()}
              <span style={{
                fontSize: '14px',
                color: '#666',
                fontWeight: 'normal'
              }}>
                {' '}raised of ${project.totalTarget?.toLocaleString()} goal
              </span>
            </h3>

            <div style={{
              height: '8px',
              background: 'linear-gradient(to right, #d94fcd, #832ef9)',
              borderRadius: '6px',
              margin: '15px 0',
              width: `${progressPercentage}%`
            }}></div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '15px 0',
              fontSize: '14px',
              color: '#666'
            }}>
           
            </div>

            <div style={{ margin: '15px 0' }}>
              <DonationComponent 
                projectId={id} 
                remainingAmount={remainingAmount}
                onDonationSuccess={fetchProject}
              />
            </div>
          </div>
        </div>

        {/* Comments */}
        <section style={{
          background: '#f9f9f9',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid #eee',
          margin: '40px 0',
        }}>
          <CommentsSection projectId={id} showReportButton={false} />
        </section>

        {/* Similar Projects */}
        <section style={{ margin: '40px 0' }}>
          <h2 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#333'
          }}>Similar Projects</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {similarProjects.map((project) => (
              <div 
                key={project.id}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  transition: 'transform 0.3s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <ProjectsCards project={project} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProjectDetail;
