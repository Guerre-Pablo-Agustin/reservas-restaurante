import React from 'react'

type Props = {
    search: string;
    setSearch: (value: string) => void;
}

const Searcher = ({search, setSearch}: Props) => {
  return (
    <div className="w-full">
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Buscar reserva..."
      className="border p-2 rounded w-full max-w-md"
    />
  </div>
  )
}

export default Searcher