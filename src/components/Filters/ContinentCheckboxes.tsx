'use client'

import { CONTINENTS } from '@/@types'

import styles from './ContinentCheckboxes.module.scss'

interface ContinentCheckboxesProps {
  selected: string[]
  onChange: (_continents: string[]) => void
}

export function ContinentCheckboxes({ selected, onChange }: ContinentCheckboxesProps) {
  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((c) => c !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <div className={styles.container} role="group" aria-label="Filtrar por continente">
      {CONTINENTS.map((continent) => (
        <label key={continent.id} className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={selected.includes(continent.value)}
            onChange={() => handleToggle(continent.value)}
            className={styles.checkbox}
          />
          <span className={styles.customCheckbox} />
          <span className={styles.labelText}>{continent.label}</span>
        </label>
      ))}
    </div>
  )
}
