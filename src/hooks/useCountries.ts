'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import { toast } from 'react-toastify'

import { CountrySimplified } from '@/@types'
import { getAllCountries, extractLanguages, filterCountries } from '@/services'

const ITEMS_PER_PAGE = 8

interface UseCountriesReturn {
  countries: CountrySimplified[]
  filteredCountries: CountrySimplified[]
  paginatedCountries: CountrySimplified[]
  languages: string[]
  isLoading: boolean
  error: string | null
  // Filtros
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedContinents: string[]
  setSelectedContinents: (continents: string[]) => void
  selectedLanguage: string
  setSelectedLanguage: (language: string) => void
  // Paginação
  currentPage: number
  totalPages: number
  setCurrentPage: (page: number) => void
}

export function useCountries(): UseCountriesReturn {
  const [countries, setCountries] = useState<CountrySimplified[]>([])
  const [languages, setLanguages] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedContinents, setSelectedContinents] = useState<string[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState('')
  
  // Paginação
  const [currentPage, setCurrentPage] = useState(1)

  // Buscar países
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getAllCountries()
        setCountries(data)
        setLanguages(extractLanguages(data))
      } catch (err) {
        const errorMessage = 'Erro ao carregar países. Tente novamente.'
        setError(errorMessage)
        toast.error(errorMessage)
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCountries()
  }, [])

  // Países filtrados
  const filteredCountries = useMemo(() => {
    return filterCountries(countries, {
      search: searchTerm,
      continents: selectedContinents,
      language: selectedLanguage,
    })
  }, [countries, searchTerm, selectedContinents, selectedLanguage])

  // Resetar página quando filtros mudam
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, selectedContinents, selectedLanguage])

  // Total de páginas
  const totalPages = useMemo(() => {
    return Math.ceil(filteredCountries.length / ITEMS_PER_PAGE)
  }, [filteredCountries.length])

  // Países paginados
  const paginatedCountries = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
    const endIndex = startIndex + ITEMS_PER_PAGE
    return filteredCountries.slice(startIndex, endIndex)
  }, [filteredCountries, currentPage])

  // Handlers memoizados
  const handleSetSearchTerm = useCallback((term: string) => {
    setSearchTerm(term)
  }, [])

  const handleSetSelectedContinents = useCallback((continents: string[]) => {
    setSelectedContinents(continents)
  }, [])

  const handleSetSelectedLanguage = useCallback((language: string) => {
    setSelectedLanguage(language)
  }, [])

  const handleSetCurrentPage = useCallback((page: number) => {
    setCurrentPage(page)
  }, [])

  return {
    countries,
    filteredCountries,
    paginatedCountries,
    languages,
    isLoading,
    error,
    searchTerm,
    setSearchTerm: handleSetSearchTerm,
    selectedContinents,
    setSelectedContinents: handleSetSelectedContinents,
    selectedLanguage,
    setSelectedLanguage: handleSetSelectedLanguage,
    currentPage,
    totalPages,
    setCurrentPage: handleSetCurrentPage,
  }
}
