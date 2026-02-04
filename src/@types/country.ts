// Tipos para a REST Countries API v3.1

export interface CountryName {
  common: string
  official: string
  nativeName?: Record<string, { official: string; common: string }>
}

export interface CountryTranslation {
  official: string
  common: string
}

export interface Currency {
  name: string
  symbol: string
}

export interface Language {
  [key: string]: string
}

export interface CountryFlags {
  png: string
  svg: string
  alt?: string
}

export interface Country {
  name: CountryName
  translations: Record<string, CountryTranslation>
  cca3: string
  capital?: string[]
  region: string
  subregion?: string
  population: number
  currencies?: Record<string, Currency>
  languages?: Record<string, string>
  flags: CountryFlags
  continents: string[]
}

// Tipo simplificado para uso na aplicação
export interface CountrySimplified {
  code: string
  name: string
  officialName: string
  capital: string
  region: string
  subregion: string
  population: number
  currencies: string
  languages: string[]
  flagUrl: string
  flagAlt: string
  continent: string
}

// Mapeamento de regiões para português
export const REGION_TRANSLATIONS: Record<string, string> = {
  Africa: 'África',
  Americas: 'Américas',
  Antarctic: 'Antártica',
  Asia: 'Ásia',
  Europe: 'Europa',
  Oceania: 'Oceania',
}

// Mapeamento de sub-regiões para português
export const SUBREGION_TRANSLATIONS: Record<string, string> = {
  'Northern Africa': 'Norte da África',
  'Eastern Africa': 'África Oriental',
  'Middle Africa': 'África Central',
  'Southern Africa': 'África Austral',
  'Western Africa': 'África Ocidental',
  'Caribbean': 'Caribe',
  'Central America': 'América Central',
  'South America': 'América do Sul',
  'Northern America': 'América do Norte',
  'Central Asia': 'Ásia Central',
  'Eastern Asia': 'Ásia Oriental',
  'South-Eastern Asia': 'Sudeste Asiático',
  'Southern Asia': 'Sul da Ásia',
  'Western Asia': 'Oriente Médio',
  'Eastern Europe': 'Europa Oriental',
  'Northern Europe': 'Norte da Europa',
  'Southern Europe': 'Sul da Europa',
  'Western Europe': 'Europa Ocidental',
  'Australia and New Zealand': 'Austrália e Nova Zelândia',
  'Melanesia': 'Melanésia',
  'Micronesia': 'Micronésia',
  'Polynesia': 'Polinésia',
}

// Continentes para filtros (checkboxes)
export const CONTINENTS = [
  { id: 'africa', label: 'África', value: 'Africa' },
  { id: 'north-america', label: 'América do Norte', value: 'North America' },
  { id: 'south-america', label: 'América do Sul', value: 'South America' },
  { id: 'asia', label: 'Ásia', value: 'Asia' },
  { id: 'europe', label: 'Europa', value: 'Europe' },
  { id: 'oceania', label: 'Oceania', value: 'Oceania' },
]

// Função para traduzir região
export function translateRegion(region: string): string {
  return REGION_TRANSLATIONS[region] || region
}

// Função para traduzir sub-região
export function translateSubregion(subregion: string): string {
  return SUBREGION_TRANSLATIONS[subregion] || subregion
}
