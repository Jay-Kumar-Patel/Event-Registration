import React, { useState } from 'react';
import './event_registration.css';
import { useLocation } from 'react-router-dom';

const EventRegistration = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const email = localStorage.getItem('email');

  const stateLocation = useLocation();
  const { eventId, name, date, description, location } = stateLocation.state || {};

  const photoUploadURL = 'https://wzsqukxjmexmxye2zey7fs7d6e0nzeny.lambda-url.us-east-1.on.aws/';
  const registrationURL = 'https://h4djbsk5sjsfkazoop2m6ydqji0guiuv.lambda-url.us-east-1.on.aws/';

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
  };

  const uploadPhoto = async (base64Image) => {
    try {
      const response = await fetch(photoUploadURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64Image }),
      });

      if (!response.ok) {
        throw new Error('Photo upload failed');
      }

      const data = await response.json();
      return data.fileUrl;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const registerUser = async (photoUrl) => {
    try {
      const response = await fetch(registrationURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          dob,
          mobile,
          email,
          eventId,
          profilePhoto: photoUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('User registration failed');
      }

      alert('Registration successful!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Encode image to base64
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      const photoUrl = await uploadPhoto(base64Image);

      if (photoUrl) {
        await registerUser(photoUrl);
      }

      setLoading(false);
      // Clear form fields
      setFirstName('');
      setLastName('');
      setDob('');
      setMobile('');
      setProfilePhoto(null);
    };

    if (profilePhoto) {
      reader.readAsDataURL(profilePhoto);
    } else {
      setLoading(false);
      setError('Please select a profile photo');
    }
  };

  return (
    <div className="registration-container">
      <h1>Register for Event</h1>
      <h2>{name}</h2>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Description:</strong> {description}</p>
      <p><strong>Location:</strong> {location}</p>

      {loading && <p>Loading...</p>}
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="registration-form">
        <div className="input-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="mobile">Mobile Number:</label>
          <input
            type="tel"
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
        </div>
        
        <div className="input-group">
          <label htmlFor="profilePhoto">Profile Photo:</label>
          <input
            type="file"
            id="profilePhoto"
            accept="image/*"
            onChange={handlePhotoChange}
            required
          />
        </div>

        <button type="submit" className="register-btn" disabled={loading}>
          Register
        </button>
      </form>
    </div>
  );
};

export default EventRegistration;