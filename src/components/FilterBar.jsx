const GENRES = ["All", "Fiction", "Non-Fiction", "Science", "History", "Fantasy", "Biography"];

export default function FilterBar({ value, onChange }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="filter-bar">
      {GENRES.map((g) => <option key={g}>{g}</option>)}
    </select>
  );
}