import { useState, useContext, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Context from '../../context/Context';

import './index.css';

const EditPage = () => {
  const { usersData, updateUser } = useContext(Context);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '', // Initially empty
  });

  const { id } = useParams();
  const navigate = useNavigate();

  // Find the user by ID
  const user = usersData.find((each) => each.id === parseInt(id));

  // Populate the form data when the user is found
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        department: user.department || '', // Set the department (if available)
      });
    }
  }, [user]); // Only runs when the user is found or updated

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('User not found');
      return;
    }

    try {
      const url = `https://jsonplaceholder.typicode.com/users/${id}`;
      const options = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...user, ...formData }),
      };

      const response = await fetch(url, options);

      if (response.ok) {
        const updatedUser = await response.json();
        updateUser(parseInt(id), updatedUser); // Update local context
        alert('User data updated successfully');
        navigate('/');
      } else {
        console.error(`Failed to update user on the server: ${response.statusText}`);
        alert('Failed to update the user on the server. Changes are saved locally.');
        updateUser(parseInt(id), { ...user, ...formData }); // Update local context
      }
    } catch (e) {
      console.error('Error while updating the data:', e.message);
      alert('An error occurred while updating the user on the server. Changes are saved locally.');
      updateUser(parseInt(id), { ...user, ...formData }); // Update local context
    }
  };

  // If the user is not found, show an error message
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
            value={formData.department} // Set value to formData.department
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

        <button type="submit" className="save">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPage;







