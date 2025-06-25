import React, { useState } from 'react';
// import axios from 'axios';
import { motion } from 'framer-motion';
import instance from '../apis/config';
import "../assets/css/addproject.css";
function AddProject() { 
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [totalTarget, setTotalTarget] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [category, setCategory] = useState('');
    const [tags, setTags] = useState(''); 
    const [images, setImages] = useState(null);
    const [message, setMessage] = useState({ text: "", type: "" });
    const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('No auth token found, please login first.');
      return;
    }

    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('details', details);
    formdata.append('totalTarget', totalTarget);
    formdata.append('startTime', startTime);
    formdata.append('endTime', endTime);
    formdata.append('category', category);
    tags.split(',').forEach(tag => {          //Seperate the multiply tags
      formdata.append('tags', tag.trim());
    });
    images.forEach((image) => {    //append each image at the form 
      formdata.append(`images`, image); 
    });
      
    // Add pro
    try {
      const response = await instance.post('/projects/', formdata, {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      });
       setMessage({ text: "Project created successfully!", type: "success" });
       console.log("Submitted data:", formdata)
       setCategory("");setDetails(""),setEndTime("");setImages("");setStartTime("");setTags("");setTitle("");setTotalTarget("");
       setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  }catch (error) {
      setMessage({ text: 'Error adding project: ' + (error.response?.data?.detail || error.message), type: 'error' });
    console.log(error.response?.data);
    }
    for (let pair of formdata.entries()) {
  console.log(pair[0] + ', ' + pair[1]);
}
  };

  return (
 <div className="projects-container">
      <form onSubmit={handleSubmit} className="project-form slide-in">
        <h2>Create New Project</h2>
        
        <div className="form-group">
          <input type="text" name="title" placeholder="Project Title" value={title} onChange={e => setTitle(e.target.value)} required/>
          <span className="input-border"></span>
        </div>

        <div className="form-group">
          <textarea name="details" placeholder="Project Details" value={details} onChange={e => setDetails(e.target.value)} required />
          <span className="input-border"></span>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input type="number" name="totalTarget" placeholder="Target Amount ($)" value={totalTarget} onChange={e => setTotalTarget(e.target.value)} required/>
            <span className="input-border"></span>
          </div>

          <div className="form-group">
            <input type="text" name="category" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required/>
            <span className="input-border"></span>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Time</label>
            <input type="datetime-local" name="startTime" value={startTime} onChange={e => setStartTime(e.target.value)} required/>
          </div>

          <div className="form-group">
            <label>End Time</label>
            <input  type="datetime-local" name="endTime" value={endTime} onChange={e => setEndTime(e.target.value)} required />
          </div>
        </div>

        <div className="form-group">
          <input   type="text"  name="tags"  placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)}/>
          <span className="input-border"></span>
        </div>
        
        <div className="form-group">
            <label>Add Images</label>
          <input type="file" multiple accept="images/*" onChange={(e) => setImages([...e.target.files])} />
          <span className="input-border"></span>
        </div>
       
        <button type="submit" className="submit-btn pulse-on-hover">
          Create Project
        </button>

          {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}
      </form>
    </div>
  )
}

export default AddProject
