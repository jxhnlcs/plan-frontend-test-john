'use client'

import { Search } from 'lucide-react'

import styles from './SearchInput.module.scss'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function SearchInput({ value, onChange, placeholder = 'Informe o país que deseja conhecer...' }: SearchInputProps) {
  return (
    <div className={styles.container}>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={styles.input}
        aria-label="Buscar país"
      />
      <Search className={styles.icon} size={20} />
    </div>
  )
}
