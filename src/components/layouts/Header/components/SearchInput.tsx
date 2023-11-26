import React, { useState, useEffect } from 'react'

interface Props {
  placeholder: string
  onChange: (e: string) => void
}

export const SearchInput = ({ placeholder, onChange }: Props) => {
  const [valueSearch, setValueSearch] = useState<string>('')
  useEffect(() => {
    onChange(valueSearch)
  }, [valueSearch])
  return (
    <input
      type="text"
      placeholder={placeholder}
      onChange={(e) => setValueSearch(e.target.value)}
      className="rounded-2xl w-72 focus:outline-amber-300 cursor-pointer focus:cursor-text text-sm px-4 py-2"
    />
  )
}
