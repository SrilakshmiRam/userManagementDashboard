import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Context from '../../context/Context';
import './index.css';

const AddPage = () => {
  // State to manage form input values
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const { updateUsersData } = useContext(Context); // Access context to update data
  const navigate = useNavigate(); // Hook for navigation

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const formData = {
      id: uuidv4(),
      firstName,
      lastName,
      email,
      department,
    };

    console.log('Form Data:', formData); // Log form data to the console

    // Send POST request to the API to add the new user
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });

      if (response.ok) {
        const newUser = await response.json(); // Get the response data
        console.log('New User Added:', newUser);

        // Update the users data in the context
        updateUsersData(newUser);

        // Show success message
        alert('User added successfully');

        // Navigate to the home page after submission
        navigate('/');

        // Optionally, reset the form fields after submission
        setFirstName('');
        setLastName('');
        setEmail('');
        setDepartment('');
      } else {
        console.error('Error adding user:', response.statusText);
        alert('Failed to add user');
      }
    } catch (e) {
      console.error('Error during the request:', e);
      alert('Error while adding user');
    }
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Department:</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="">Select Department</option>
            <option value="HR">HR</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="Engineering">Engineering</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPage;

