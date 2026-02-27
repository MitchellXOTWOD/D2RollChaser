export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search weapons..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="search-input text-black mx-6"
    />
  );
}