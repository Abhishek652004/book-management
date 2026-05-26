import BookCard from "./BookCard";

export default function BookList({ books, onEdit, onDelete, loading }) {
  if (loading) return <p className="status">Loading books...</p>;
  if (!books.length) return <p className="status">No books found.</p>;
  return (
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
}