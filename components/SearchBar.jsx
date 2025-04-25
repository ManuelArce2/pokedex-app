// src/components/SearchBar.jsx
import React from 'react'

const SearchBar = ({ onSearch }) => {
  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Search Pokémon..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 border rounded shadow-sm"
      />
    </div>
  )
}

export default SearchBar
