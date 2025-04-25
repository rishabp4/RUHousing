import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    const fetchMatchedProfiles = async () => {
      try {
        const storedPreferences = localStorage.getItem('userPreferences');
        if (!storedPreferences) {
          setError('No preferences found to find matches.');
          setLoading(false);
          return;
        }
        const userPreferences = JSON.parse(storedPreferences);

        const response = await fetch('http://localhost:5002/api/matched-profiles', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userPreferences),
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
    </div>
  );
}

export default MatchedProfiles;