'use client'

import { Loader2 } from 'lucide-react'

import { CountryCard } from '@/components/CountryCard'
import { SearchInput, ContinentCheckboxes, LanguageSelect } from '@/components/Filters'
import { Header, Footer } from '@/components/Layout'
import { Pagination } from '@/components/Pagination'
import { useCountries } from '@/hooks'

import styles from './Home.module.scss'

export default function Home() {
  const {
    paginatedCountries,
    languages,
    isLoading,
    error,
    searchTerm,
    setSearchTerm,
    selectedContinents,
    setSelectedContinents,
    selectedLanguage,
    setSelectedLanguage,
    currentPage,
    totalPages,
    setCurrentPage,
    filteredCountries,
  } = useCountries()

  return (
    <div className={styles.pageContainer}>
      <Header>
        <SearchInput 
          value={searchTerm} 
          onChange={setSearchTerm} 
        />
        <LanguageSelect
          languages={languages}
          selected={selectedLanguage}
          onChange={setSelectedLanguage}
        />
      </Header>
      
      <main className={styles.main}>
        {/* Filtros */}
        <section className={styles.filtersSection}>
          <ContinentCheckboxes
            selected={selectedContinents}
            onChange={setSelectedContinents}
          />
        </section>

        {/* Lista de países */}
        <section className={styles.countriesSection}>
          {isLoading && (
            <div className={styles.loadingContainer}>
              <Loader2 className={styles.spinner} size={48} />
              <p>Carregando países...</p>
            </div>
          )}

          {error && !isLoading && (
            <div className={styles.errorContainer}>
              <p>{error}</p>
            </div>
          )}

          {!isLoading && !error && filteredCountries.length === 0 && (
            <div className={styles.emptyContainer}>
              <p>Nenhum país encontrado com os filtros selecionados.</p>
            </div>
          )}

          {!isLoading && !error && paginatedCountries.length > 0 && (
            <>
              <div className={styles.countriesGrid}>
                {paginatedCountries.map((country) => (
                  <CountryCard key={country.code} country={country} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </section>
      </main>

      <Footer />
    </div>
  )
}
