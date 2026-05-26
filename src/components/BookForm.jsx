import { useState, useEffect } from "react";

const EMPTY = { title: "", author: "", genre: "Fiction", year: "" };

export default function BookForm({ onSubmit, editingBook, onCancel }) {
  const [form, setForm] = useState(EMPTY);

  useEffect(() => {
    setForm(editingBook || EMPTY);
  }, [editingBook]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.author) return alert("Title and Author are required.");
    onSubmit(form);
    setForm(EMPTY);
  };

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <h2>{editingBook ? "Edit Book" : "Add New Book"}</h2>
      <input name="title"  placeholder="Title"  value={form.title}  onChange={handleChange} required />
      <input name="author" placeholder="Author" value={form.author} onChange={handleChange} required />
      <input name="genre"  placeholder="Genre"  value={form.genre}  onChange={handleChange} />
      <input name="year"   placeholder="Year"   value={form.year}   onChange={handleChange} type="number" />
      <div className="form-actions">
        <button type="submit" className="btn-primary">{editingBook ? "Update" : "Add Book"}</button>
        {editingBook && <button type="button" onClick={onCancel} className="btn-cancel">Cancel</button>}
      </div>
    </form>
  );
}