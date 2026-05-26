export default function BookCard({ book, onEdit, onDelete }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Genre:</strong> {book.genre}</p>
      <p><strong>Year:</strong> {book.year}</p>
      <div className="card-actions">
        <button onClick={() => onEdit(book)} className="btn-edit">Edit</button>
        <button onClick={() => onDelete(book.id)} className="btn-delete">Delete</button>
      </div>
    </div>
  );
}