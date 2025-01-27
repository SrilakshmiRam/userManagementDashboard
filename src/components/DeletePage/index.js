import { useParams, useNavigate } from 'react-router-dom';
import './index.css';

const DeletePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const onClickDelete = async () => {
    const userConfirmed = window.confirm(
      'Are you sure you want to permanently delete your details?'
    );

    if (!userConfirmed) return;

    try {
      const url = `https://jsonplaceholder.typicode.com/users/${id}`;
      const options = {
        method: 'DELETE',
      };

      const response = await fetch(url, options);

      if (response.ok) {
        alert('Transaction deleted successfully.');
        navigate('/'); // Redirect to the homepage or a relevant page
      } else {
        throw new Error('Failed to delete the transaction.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while deleting the transaction.');
    }
  };

  return (
    <div className="delete-page">
      <h1>Delete Transaction</h1>
      <button onClick={onClickDelete} className="delete-button">
        Delete
      </button>
    </div>
  );
};

export default DeletePage;