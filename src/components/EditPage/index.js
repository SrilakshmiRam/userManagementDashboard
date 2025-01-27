import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Context from '../../context/Context';

import './index.css'; // Importing the CSS file

const EditPage = () => {
  const { usersData } = useContext(Context); // Access context
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });
  const { id } = useParams(); // Extract the ID from URL params
  const navigate = useNavigate(); // To navigate after saving changes

  // Find the user by ID (ensure `id` is compared as a number if required)
  const user = Array.isArray(usersData)
    ? usersData.find((each) => each.id === parseInt(id))
    : null;

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        department: user.department || '',
      });
    }
  }, [user]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = `https://jsonplaceholder.typicode.com/users/${id}`;
      const options = {
        method: 'PUT', // Use PUT for updating data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user, ...formData }), // Send updated user data
      };

      const response = await fetch(url, options);
      if (response.ok) {
        alert('User data updated successfully');
        navigate('/'); // Navigate to the home page after saving changes
      } else {
        throw new Error(`Failed to update user: ${response.statusText}`);
      }
    } catch (e) {
      console.error('Error while updating the data:', e.message);
      alert('An error occurred while updating the user data.');
    }
  };

  // If no user is found, display an error message
  if (!user) {
    return <h1>User not found</h1>;
  }

  return (
    <div className="edit-page-container">
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Department:</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
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

        <button type="submit" className="submit-btn">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPage;


