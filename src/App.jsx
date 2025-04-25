import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import SearchBar from '../components/SearchBar'
import PokemonCard from '../components/PokemonCard'

const App = () => {
  const [pokemons, setPokemons] = useState([])
  const [filtered, setFiltered] = useState([])
  const [offset, setOffset] = useState(0)
  const [loading, setLoading] = useState(false)

  const fetchPokemons = async () => {
    setLoading(true)
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
    const data = await res.json()

    const details = await Promise.all(
      data.results.map(async (poke) => {
        const res = await fetch(poke.url)
        return await res.json()
      })
    )

    const newList = [...pokemons, ...details]
    setPokemons(newList)
    setFiltered(newList)
    setLoading(false)
  }

  useEffect(() => {
    fetchPokemons()
  }, [offset])

  const handleSearch = (query) => {
    const results = pokemons.filter(poke =>
      poke.name.toLowerCase().includes(query.toLowerCase())
    )
    setFiltered(results)
  }
  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 && !loading) {
      setOffset((prevOffset) => prevOffset + 20)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [loading])

  return (
    <div className="bg-green-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-4">
        <SearchBar onSearch={handleSearch} />
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {filtered.map(pokemon => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
        {loading && <p className="text-center mt-4">Cargando...</p>}
      </div>
    </div>
  )
}

export default App