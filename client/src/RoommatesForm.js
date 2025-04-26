import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const formContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  backgroundColor: '#f7f7f7',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  margin: '20px',
};

const headingStyle = {
  color: '#333',
  marginBottom: '20px',
};

const formStyle = {
  width: '100%',
  maxWidth: '400px',
};

const formGroupStyle = {
  marginBottom: '15px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  color: '#555',
  fontWeight: 'bold',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  fontSize: '16px',
  boxSizing: 'border-box',
};

const selectStyle = {
  ...inputStyle,
  appearance: 'none',
  backgroundImage: 'url(\'data:image/svg+xml;utf8,<svg fill="currentColor" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>\')',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px top 50%',
  backgroundSize: '16px',
};

const submitButtonStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '12px 20px',
  border: 'none',
  borderRadius: '4px',
  fontSize: '18px',
  cursor: 'pointer',
  width: '100%',
  transition: 'background-color 0.3s ease',
};

const submitButtonHoverStyle = {
  backgroundColor: '#0056b3',
};

function RoommatesForm({ firstName: initialFirstName, lastName: initialLastName }) {
  const [firstName, setFirstName] = useState(initialFirstName || '');
  const [lastName, setLastName] = useState(initialLastName || '');
  const [graduationYear, setGraduationYear] = useState('');
  const [major, setMajor] = useState('');
  const [durationOfStay, setDurationOfStay] = useState('');
  const [allergies, setAllergies] = useState('');
  const [sleepSchedule, setSleepSchedule] = useState('');
  const [studyHabits, setStudyHabits] = useState('');
  const [cleanliness, setCleanliness] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [userId, setUserId] = useState('USER_IDENTIFIER');
  const navigate = useNavigate();

  // Update local state when props change
  useEffect(() => {
    setFirstName(initialFirstName || '');
  }, [initialFirstName]);

  useEffect(() => {
    setLastName(initialLastName || '');
  }, [initialLastName]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const preferencesData = {
      first_name: firstName,
      last_name: lastName,
      graduation_year: graduationYear,
      major: major,
      duration_of_stay: durationOfStay,
      allergies: allergies,
      sleep_schedule: sleepSchedule,
      study_habits: studyHabits,
      cleanliness: cleanliness,
      userId: userId,
    };

    try {
      const response = await fetch('http://localhost:5002/api/submit-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferencesData),
      });

      if (response.ok) {
        const data = await response.json();
        setSubmissionStatus(data.message);
        localStorage.setItem('userPreferences', JSON.stringify(preferencesData));
        navigate('/matched-profiles');
        setGraduationYear('');
        setMajor('');
        setDurationOfStay('');
        setAllergies('');
        setSleepSchedule('');
        setStudyHabits('');
        setCleanliness('');
      } else {
        const errorData = await response.json();
        setSubmissionStatus(`Submission failed: ${errorData.error || response.statusText}`);
      }
    } catch (error) {
      setSubmissionStatus(`Submission failed: ${error.message}`);
    }
  };

  return (
    <div style={formContainerStyle}>
      <h1 style={headingStyle}>Please enter your preferences to find your roommates!</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <div style={formGroupStyle}>
          <label htmlFor="firstName" style={labelStyle}>
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            placeholder="Enter your first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="lastName" style={labelStyle}>
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            placeholder="Enter your last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="graduationYear" style={labelStyle}>
            Graduation Year
          </label>
          <input
            type="text"
            id="graduationYear"
            placeholder="Enter your graduation year"
            value={graduationYear}
            onChange={(e) => setGraduationYear(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="major" style={labelStyle}>
            Major
          </label>
          <input
            type="text"
            id="major"
            placeholder="Enter your major"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="durationOfStay" style={labelStyle}>
            Duration of Stay
          </label>
          <select
            id="durationOfStay"
            value={durationOfStay}
            onChange={(e) => setDurationOfStay(e.target.value)}
            required
            style={selectStyle}
          >
            <option value="">Select duration</option>
            <option value="One Semester">One Semester</option>
            <option value="Two Semesters">Two Semesters</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="allergies" style={labelStyle}>
            Allergies
          </label>
          <input
            type="text"
            id="allergies"
            placeholder="List any allergies (if none, enter 'None')"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="sleepSchedule" style={labelStyle}>
            Sleep Schedule
          </label>
          <select
            id="sleepSchedule"
            value={sleepSchedule}
            onChange={(e) => setSleepSchedule(e.target.value)}
            required
            style={selectStyle}
          >
            <option value="">Select your sleep schedule</option>
            <option value="Early Bird (Morning)">Early Bird (Morning)</option>
            <option value="Night Owl (Evening)">Night Owl (Evening)</option>
            <option value="Flexible">Flexible</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="studyHabits" style={labelStyle}>
            Study Habits
          </label>
          <select
            id="studyHabits"
            value={studyHabits}
            onChange={(e) => setStudyHabits(e.target.value)}
            required
            style={selectStyle}
          >
            <option value="">Select your study habits</option>
            <option value="Quiet and Focused">Quiet and Focused</option>
            <option value="Collaborative Study Groups">
              Collaborative Study Groups
            </option>
            <option value="Mix of Both">Mix of Both</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="cleanliness" style={labelStyle}>
            Cleanliness
          </label>
          <select
            id="cleanliness"
            value={cleanliness}
            onChange={(e) => setCleanliness(e.target.value)}
            required
            style={selectStyle}
          >
            <option value="">Select your cleanliness preference</option>
            <option value="Very Clean">Very Clean</option>
            <option value="Moderately Clean">Moderately Clean</option>
            <option value="Tolerant">Tolerant</option>
          </select>
        </div>
        <button
          type="submit"
          style={{ ...submitButtonStyle, ':hover': submitButtonHoverStyle }}
        >
          Submit Preferences
        </button>

        {submissionStatus && (
          <p>{submissionStatus}</p>
        )}
      </form>
    </div>
  );
}

export default RoommatesForm;