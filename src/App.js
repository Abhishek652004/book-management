import { useState, useEffect } from "react";
import { getBooks, addBook, updateBook, deleteBook } from "./api/booksApi";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import "./App.css";

export default function App() {
  const [books, setBooks]           = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [search, setSearch]         = useState("");
  const [genre, setGenre]           = useState("All");
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const res = await getBooks();
      setBooks(res.data);
    } catch {
      setError("Failed to load books. Check your API URL.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBooks(); }, []);

  const handleSubmit = async (form) => {
    try {
      if (editingBook) {
        await updateBook(editingBook.id, form);
      } else {
        await addBook(form);
      }
      setEditingBook(null);
      fetchBooks();
    } catch {
      setError("Failed to save book.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await deleteBook(id);
      fetchBooks();
    } catch {
      setError("Failed to delete book.");
    }
  };

  const filtered = books.filter((b) => {
    const matchSearch = b.title.toLowerCase().includes(search.toLowerCase()) ||
                        b.author.toLowerCase().includes(search.toLowerCase());
    const matchGenre  = genre === "All" || b.genre === genre;
    return matchSearch && matchGenre;
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Book Manager</h1>
      </header>
      <main className="app-main">
        <BookForm onSubmit={handleSubmit} editingBook={editingBook} onCancel={() => setEditingBook(null)} />
        <section className="list-section">
          <div className="controls">
            <SearchBar value={search} onChange={setSearch} />
            <FilterBar value={genre} onChange={setGenre} />
          </div>
          {error && <p className="error">{error}</p>}
          <BookList books={filtered} onEdit={setEditingBook} onDelete={handleDelete} loading={loading} />
        </section>
      </main>
    </div>
  );
}