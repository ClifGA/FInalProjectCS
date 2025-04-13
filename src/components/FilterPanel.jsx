

export default function FilterPanel({ selectedLang, setSelectedLang, languages }) {
  return (
    <div className="col-span-full mb-4">
      <label className="block mb-2 font-medium">Filter by Language:</label>
      <select
        className="p-2 border rounded w-full"
        value={selectedLang}
        onChange={e => setSelectedLang(e.target.value)}
      >
        <option value="All">All</option>
        {languages.map(lang => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
    </div>
  );
}