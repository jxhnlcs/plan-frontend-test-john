'use client'

import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Loader2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { CountrySimplified } from '@/@types'
import { Header, Footer } from '@/components/Layout'
import { getCountryByCode } from '@/services'

import styles from './CountryDetails.module.scss'

export default function CountryDetailsPage() {
  const params = useParams()
  const code = params.code as string
  
  const [country, setCountry] = useState<CountrySimplified | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getCountryByCode(code)
        
        if (!data) {
          setError('País não encontrado.')
          return
        }
        
        setCountry(data)
      } catch (err) {
        const errorMessage = 'Erro ao carregar dados do país. Tente novamente.'
        setError(errorMessage)
        toast.error(errorMessage)
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    if (code) {
      fetchCountry()
    }
  }, [code])

  // Formatar população
  const formatPopulation = (population: number) => {
    return new Intl.NumberFormat('pt-BR').format(population)
  }

  return (
    <div className={styles.pageContainer}>
      <Header />
      
      <main className={styles.main}>
        {isLoading && (
          <div className={styles.loadingContainer}>
            <Loader2 className={styles.spinner} size={48} />
            <p>Carregando...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className={styles.errorContainer}>
            <p>{error}</p>
            <Link href="/" className={styles.backButton}>
              Voltar
            </Link>
          </div>
        )}

        {!isLoading && !error && country && (
          <article className={styles.card}>
            {/* Header do card com região */}
            <div className={styles.cardHeader}>
              <span className={styles.regionName}>{country.region}</span>
            </div>

            <div className={styles.cardContent}>
              {/* Bandeira */}
              <div className={styles.flagSection}>
                <div className={styles.flagContainer}>
                  <Image
                    src={country.flagUrl}
                    alt={country.flagAlt}
                    width={280}
                    height={180}
                    className={styles.flag}
                    unoptimized
                    priority
                  />
                </div>
                <span className={styles.flagLabel}>Bandeira</span>
              </div>

              {/* Informações */}
              <div className={styles.infoSection}>
                <h1 className={styles.countryName}>{country.name}</h1>
                
                <dl className={styles.infoList}>
                  <div className={styles.infoItem}>
                    <dt>Nome oficial:</dt>
                    <dd>{country.officialName}</dd>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <dt>Capital:</dt>
                    <dd>{country.capital}</dd>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <dt>População:</dt>
                    <dd>{formatPopulation(country.population)}</dd>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <dt>Moeda:</dt>
                    <dd>{country.currencies}</dd>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <dt>Idiomas:</dt>
                    <dd>{country.languages.join(', ') || 'N/A'}</dd>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <dt>Região:</dt>
                    <dd>{country.region}</dd>
                  </div>
                  
                  <div className={styles.infoItem}>
                    <dt>Sub-Região:</dt>
                    <dd>{country.subregion || 'N/A'}</dd>
                  </div>
                </dl>

                <Link href="/" className={styles.backButton}>
                  Voltar
                </Link>
              </div>
            </div>
          </article>
        )}
      </main>

      <Footer />
    </div>
  )
}
