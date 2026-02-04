'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import styles from './Pagination.module.scss'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (_page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  // Mostrar no máximo 5 dots
  const maxDots = 5
  const startPage = Math.max(1, Math.min(currentPage - Math.floor(maxDots / 2), totalPages - maxDots + 1))
  const endPage = Math.min(totalPages, startPage + maxDots - 1)
  
  const dots = []
  for (let i = startPage; i <= endPage; i++) {
    dots.push(i)
  }

  if (totalPages <= 1) return null

  return (
    <nav className={styles.container} aria-label="Paginação">
      <button
        className={styles.navButton}
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Página anterior"
      >
        <ChevronLeft size={24} />
      </button>

      <div className={styles.dots}>
        {dots.map((page) => (
          <button
            key={page}
            className={`${styles.dot} ${page === currentPage ? styles.dotActive : ''}`}
            onClick={() => onPageChange(page)}
            aria-label={`Página ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          />
        ))}
      </div>

      <button
        className={styles.navButton}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Próxima página"
      >
        <ChevronRight size={24} />
      </button>
    </nav>
  )
}
