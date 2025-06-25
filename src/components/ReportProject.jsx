import React from 'react';
import instance from '../apis/config';

const ReportProjectButton = ({ projectId, style, onMouseEnter, onMouseLeave }) => {
  const handleReport = async () => {
    const reason = prompt('Why are you reporting this project?');
    if (reason) {
      try {
        await instance.post('/reports/', {
          report_type: 'PROJECT',
          project_id: projectId,
          reason,
        });
        alert('Project reported successfully');
      } catch (error) {
        console.error('Error reporting project:', error);
        alert('Failed to report project');
      }
    }
  };

  return (
    <button
      onClick={handleReport}
      style={style}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      🚩 Report this Project
    </button>
  );
};

export default ReportProjectButton;
