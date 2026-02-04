'use client'

import Image from 'next/image'
import Link from 'next/link'

import { CountrySimplified } from '@/@types'

import styles from './CountryCard.module.scss'
import { RegionHeader } from './RegionHeader'

interface CountryCardProps {
  country: CountrySimplified
}

export function CountryCard({ country }: CountryCardProps) {
  return (
    <article className={styles.card}>
      <RegionHeader region={country.region} continent={country.continent} />
      
      <div className={styles.content}>
        <div className={styles.flagContainer}>
          <Image
            src={country.flagUrl}
            alt={country.flagAlt}
            width={60}
            height={40}
            className={styles.flag}
            unoptimized
          />
        </div>
        
        <h2 className={styles.countryName}>{country.name}</h2>
        
        <div className={styles.capitalInfo}>
          <Image
            src="/img/capital-icon.png"
            alt="Capital"
            width={16}
            height={16}
          />
          <span>{country.capital}</span>
        </div>
        
        <Link href={`/country/${country.code}`} className={styles.viewMoreButton}>
          Ver mais
        </Link>
      </div>
    </article>
  )
}
