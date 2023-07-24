const DeleteCard = ({ movie, onDelete }) => {
    const handleDelete = () => {
      onDelete(movie.imdbID);
    };
  
    return (
      <div className="delete-card">
        <h3>Delete Movie Card</h3>
        <p>Are you sure you want to delete this movie card?</p>
        <button onClick={handleDelete}>Delete</button>
      </div>
    );
  };
  
  export default DeleteCard;