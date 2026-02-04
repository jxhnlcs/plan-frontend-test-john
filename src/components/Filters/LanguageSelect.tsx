'use client'

import { useState, useRef, useEffect } from 'react'

import { ChevronDown } from 'lucide-react'

import styles from './LanguageSelect.module.scss'

interface LanguageSelectProps {
  languages: string[]
  selected: string
  onChange: (_language: string) => void
}

export function LanguageSelect({ languages, selected, onChange }: LanguageSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSelect = (language: string) => {
    onChange(language)
    setIsOpen(false)
  }

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Fechar dropdown com Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [])

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={styles.selectButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Selecionar idioma"
      >
        <span className={styles.selectedText}>
          {selected || 'Selecione o idioma'}
        </span>
        <ChevronDown 
          className={`${styles.icon} ${isOpen ? styles.iconRotated : ''}`} 
          size={20} 
        />
      </button>

      {isOpen && (
        <ul className={styles.dropdown} role="listbox">
          <li
            role="option"
            aria-selected={selected === ''}
            className={`${styles.option} ${selected === '' ? styles.optionSelected : ''}`}
            onClick={() => handleSelect('')}
          >
            Todos
          </li>
          {languages.map((language) => (
            <li
              key={language}
              role="option"
              aria-selected={selected === language}
              className={`${styles.option} ${selected === language ? styles.optionSelected : ''}`}
              onClick={() => handleSelect(language)}
            >
              {language};
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
