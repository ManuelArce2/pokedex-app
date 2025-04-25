// src/components/PokemonCard.jsx
import React from 'react'

const PokemonCard = ({ pokemon }) => {
  const { name, sprites, types, stats } = pokemon

  const typeColors = {
    grass: 'bg-green-500',
    poison: 'bg-purple-500',
    fire: 'bg-red-500',
    flying: 'bg-indigo-400',
    normal: 'bg-gray-400',
    water: 'bg-blue-400',
    bug: 'bg-lime-500',
  }

  const getTypeClass = (type) => typeColors[type] || 'bg-gray-300'

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <img
        src={sprites.other['official-artwork'].front_default}
        alt={name}
        className="mx-auto h-28"
      />
      <h2 className="text-xl font-semibold text-center capitalize mt-2">{name}</h2>
      <div className="flex justify-center gap-2 mt-2">
        {types.map((t) => (
          <span key={t.type.name} className={`text-white text-sm px-2 py-1 rounded-full ${getTypeClass(t.type.name)}`}>
            {t.type.name.charAt(0).toUpperCase() + t.type.name.slice(1)}
          </span>
        ))}
      </div>
      <div className="mt-2 space-y-1 text-sm text-gray-400">
        {['hp', 'attack', 'defense', 'special-attack'].map((statName) => {
          const stat = stats.find((s) => s.stat.name === statName)
          return (
            <div key={statName} className="flex justify-between items-center">
              <span className="capitalize">{statName.replace('-', ' ')}</span>
              <div className="w-2/3 bg-gray-200 h-2 rounded overflow-hidden">
                <div className="bg-blue-500 h-2" style={{ width: `${stat?.base_stat ?? 0}%` }}></div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default PokemonCard
