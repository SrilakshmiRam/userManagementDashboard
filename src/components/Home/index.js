import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';
import './index.css'; // Importing CSS for styling

const Home = () => {
  const { usersData } = useContext(Context); // Accessing user data from Context

  const [users, setUsers] = useState(usersData); // Local state to manage users
  // Sync local users state with usersData from context
  useEffect(() => {
    setUsers(usersData);
  }, [usersData]); // Whenever usersData changes, update local state

  // Pagination state and settings
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const usersPerPage = 10; // Number of users per page

  // Calculate the number of pages needed
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Determine the users to display on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Handle page change (Previous and Next buttons)
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle delete request
  const handleDelete = async (userId) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('User deleted successfully');
        
        // Remove the user from the local state (without updating context)
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));

        // Optionally, show a success alert
        alert('User deleted successfully');
      } else {
        console.error('Error deleting user:', response.statusText);
        alert('Failed to delete user');
      }
    } catch (e) {
      console.error('Error during the request:', e);
      alert('Error while deleting user');
    }
  };

  return (
    <div className="home-container">
      <h1>User Management Portal</h1>

      <ul className="cards-container">
        {currentUsers.map((user) => (
          <li key={user.id} className="card">
            <h2>
              {user.firstName} {user.lastName}
            </h2>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Department:</strong> {user.department}
            </p>

            {/* Edit and Delete Buttons */}
            <div className="buttons-container">
              <Link to={`/edit/${user.id}`} className="nav-link">
                <button className="edit">Edit</button>
              </Link>
              {/* Fix: Move onClick inside the Delete button */}
              <button className="delete" onClick={() => handleDelete(user.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1} className='previous'>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages} className='next'>
          Next
        </button>
      </div>

      {/* Floating Add User Button */}
      <Link to="/add" className="nav-link">
        <button className="add-button">+ Add User</button>
      </Link>
    </div>
  );
};

export default Home;





