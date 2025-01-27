import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';
import './index.css'; // Importing CSS for styling

const Home = () => {
  const { usersData } = useContext(Context); // Accessing user data from Context
  
  // Pagination state and settings
  const [currentPage, setCurrentPage] = useState(1); // State for the current page
  const usersPerPage = 10; // Number of users per page

  // Calculate the number of pages needed
  const totalPages = Math.ceil(usersData.length / usersPerPage);

  // Determine the users to display on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = usersData.slice(indexOfFirstUser, indexOfLastUser);

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
              <Link to={`/delete/${user.id}`} className="nav-link">
                <button className="delete">Delete</button>
              </Link>
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



