import React from 'react';
import instance from '../apis/config';

const CancelProjectButton = ({ projectId, canCancel, onCancelSuccess }) => {
  const handleCancel = async () => {
    try {
      await instance.post(`/projects/${projectId}/cancel/`); // يفترض أنك عاملة endpoint لإلغاء المشروع
      onCancelSuccess();
    } catch (error) {
      alert('Failed to cancel project');
    }
  };

  if (!canCancel) return null;

  return (
    <button onClick={handleCancel} className="bg-red-600 text-white px-4 py-2 rounded">
      Cancel Project
    </button>
  );
};

export default CancelProjectButton;
