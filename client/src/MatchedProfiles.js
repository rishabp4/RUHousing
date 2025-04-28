import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const reportButtonStyle = { // Renamed from reportIconStyle
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: '#f44336', // Example red color
  color: 'white',
  borderRadius: '4px', // Changed from 50% for a box
  padding: '12px 20px', // Added padding
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  fontSize: '1em', // Adjusted font size
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  zIndex: 1000, // Ensure it's on top
};

const reportFormContainerStyle = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  zIndex: 1001,
};

const reportFormStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const reportInputStyle = {
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};

const reportSubmitButtonStyle = { // Renamed from reportButtonStyle
  padding: '10px 15px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

const matchedProfilesContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#f4f4f4',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  margin: '20px',
};

const headingStyle = {
  color: '#333',
  marginBottom: '20px',
};

const profileCardStyle = {
  backgroundColor: 'white',
  border: '1px solid #ddd',
  borderRadius: '6px',
  padding: '15px',
  marginBottom: '15px',
  width: '80%',
  maxWidth: '600px',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
};

const attributeStyle = {
  margin: '5px 0',
  color: '#555',
};

const matchLevelStyle = {
  fontWeight: 'bold',
  marginTop: '10px',
};

function MatchedProfiles() {
  const [matchedProfiles, setMatchedProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
   const [showReportForm, setShowReportForm] = useState(false);
   const [reportData, setReportData] = useState({
     name: '',
     ruid: '',
     issue: '',
   });
   const [reportStatus, setReportStatus] = useState(null);

  useEffect(() => {
    const fetchMatchedProfiles = async () => {
      try {
        const storedPreferences = localStorage.getItem('userPreferences');
        const userId = localStorage.getItem('userId'); // Ensure userId is being saved to localStorage on login/signup

        if (!storedPreferences || !userId) {
          setError('No preferences or user ID found.');
          setLoading(false);
          return;
        }
        const userPreferences = JSON.parse(storedPreferences);

        const response = await fetch('http://localhost:5002/api/matched-profiles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...userPreferences, userId }), // Include userId in the request body
        });

        if (!response.ok) {
          const message = `An error occurred: ${response.status}`;
          throw new Error(message);
        }

        const data = await response.json();
        setMatchedProfiles(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMatchedProfiles();
  }, []);

  if (loading) {
    return <div>Loading matched profiles...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const handleReportIconClick = () => {
    setShowReportForm(true);
  };

  const handleReportFormClose = () => {
    setShowReportForm(false);
    setReportData({ name: '', ruid: '', issue: '' });
    setReportStatus(null);
  };

  const handleReportInputChange = (e) => {
    const { name, value } = e.target;
    setReportData({ ...reportData, [name]: value });
  };

  const handleReportSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5002/api/report-issue', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        setReportStatus('Issue reported successfully!');
        setTimeout(handleReportFormClose, 2000); // Close form after 2 seconds
      } else {
        const errorData = await response.json();
        setReportStatus(`Reporting failed: ${errorData.error || response.statusText}`);
      }
    } catch (error) {
      setReportStatus(`Reporting failed: ${error.message}`);
    }
  };

  return (
    <div style={matchedProfilesContainerStyle}>
      <h1 style={headingStyle}>Matched Roommate Profiles</h1>
      {matchedProfiles.length > 0 ? (
        matchedProfiles.map((profile) => (
          <div key={profile._id} style={profileCardStyle}>
            <p style={attributeStyle}><strong>First Name:</strong> {profile.first_name}</p>
            <p style={attributeStyle}><strong>Last Name:</strong> {profile.last_name}</p>
            <p style={attributeStyle}><strong>Graduation Year:</strong> {profile.graduation_year}</p>
            <p style={attributeStyle}><strong>Major:</strong> {profile.major}</p>
            <p style={attributeStyle}><strong>Duration of Stay:</strong> {profile.duration_of_stay}</p>
            <p style={attributeStyle}><strong>Allergies:</strong> {profile.allergies}</p>
            <p style={attributeStyle}><strong>Sleep Schedule:</strong> {profile.sleep_schedule}</p>
            <p style={attributeStyle}><strong>Study Habits:</strong> {profile.study_habits}</p>
            <p style={attributeStyle}><strong>Cleanliness:</strong> {profile.cleanliness}</p>
            <p style={matchLevelStyle}>{profile.matchLevel}</p>
          </div>
        ))
      ) : (
        <p>No matching profiles found.</p>
      )}
    {/* Report Issue Button */}
    <div style={reportButtonStyle} onClick={handleReportIconClick}>
         Report an Issue with a Roommate
       </div>
 
       {/* Report Issue Form */}
       {showReportForm && (
         <div style={reportFormContainerStyle}>
           <h2>Report an Issue with a Roommate</h2>
           <form style={reportFormStyle} onSubmit={handleReportSubmit}>
             <label htmlFor="name">Name:</label>
             <input
               type="text"
               id="name"
               name="name"
               value={reportData.name}
               onChange={handleReportInputChange}
               style={reportInputStyle}
               required
             />
 
             <label htmlFor="ruid">RUID:</label>
             <input
               type="text"
               id="ruid"
               name="ruid"
               value={reportData.ruid}
               onChange={handleReportInputChange}
               style={reportInputStyle}
               required
             />
 
             <label htmlFor="issue">Issue:</label>
             <textarea
               id="issue"
               name="issue"
               value={reportData.issue}
               onChange={handleReportInputChange}
               style={{ ...reportInputStyle, height: '200px', width: '750px' }}
               required
             />
 
             <button type="submit" style={reportSubmitButtonStyle}>
               Submit 
             </button>
             {reportStatus && <p>{reportStatus}</p>}
             <button type="button" onClick={handleReportFormClose} style={{ marginTop: '10px', ...reportSubmitButtonStyle, backgroundColor: '#ccc', color: 'black' }}>
               Close
             </button>
           </form>
         </div>
       )}
     </div>
   );
 }

export default MatchedProfiles;
