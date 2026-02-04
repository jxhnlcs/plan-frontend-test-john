import { Country, CountrySimplified, translateRegion, translateSubregion } from '@/@types'

const REST_COUNTRIES_API = 'https://restcountries.com/v3.1'

// Função para transformar dados da API em formato simplificado
function transformCountry(country: Country): CountrySimplified {
  // Usar tradução em português se disponível
  const ptTranslation = country.translations?.por
  const name = ptTranslation?.common || country.name.common
  const officialName = ptTranslation?.official || country.name.official

  // Formatar moedas
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name}${c.symbol ? ` (${c.symbol})` : ''}`)
        .join(', ')
    : 'N/A'

  // Formatar idiomas
  const languages = country.languages ? Object.values(country.languages) : []

  // Mapear region para continent (já que não podemos pedir continents pela API)
  const continentMap: Record<string, string> = {
    'Africa': 'Africa',
    'Americas': country.subregion?.includes('South') ? 'South America' : 'North America',
    'Antarctic': 'Antarctica',
    'Asia': 'Asia',
    'Europe': 'Europe',
    'Oceania': 'Oceania',
  }

  return {
    code: country.cca3,
    name,
    officialName,
    capital: country.capital?.[0] || 'N/A',
    region: translateRegion(country.region),
    subregion: translateSubregion(country.subregion || ''),
    population: country.population,
    currencies,
    languages,
    flagUrl: country.flags.svg || country.flags.png,
    flagAlt: country.flags.alt || `Bandeira de ${name}`,
    continent: continentMap[country.region] || country.region,
  }
}

// Buscar todos os países
export async function getAllCountries(): Promise<CountrySimplified[]> {
  try {
    // A API v3.1 requer o parâmetro fields (obrigatório, até 10 campos)
    const response = await fetch(
      `${REST_COUNTRIES_API}/all?fields=name,translations,cca3,capital,region,subregion,population,currencies,languages,flags`
    )
    
    if (!response.ok) {
      throw new Error('Erro ao buscar países')
    }

    const data: Country[] = await response.json()
    
    return data
      .map(transformCountry)
      .sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
  } catch (error) {
    console.error('Erro ao buscar países:', error)
    throw error
  }
}

// Buscar país por código
export async function getCountryByCode(code: string): Promise<CountrySimplified | null> {
  try {
    // Para o endpoint alpha, os fields são opcionais mas recomendados
    const response = await fetch(
      `${REST_COUNTRIES_API}/alpha/${code}?fields=name,translations,cca3,capital,region,subregion,population,currencies,languages,flags`
    )
    
    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error('Erro ao buscar país')
    }

    const data: Country = await response.json()
    return transformCountry(data)
  } catch (error) {
    console.error('Erro ao buscar país:', error)
    throw error
  }
}

// Extrair lista única de idiomas de todos os países
export function extractLanguages(countries: CountrySimplified[]): string[] {
  const languagesSet = new Set<string>()
  
  countries.forEach((country) => {
    country.languages.forEach((lang) => {
      languagesSet.add(lang)
    })
  })
  
  return Array.from(languagesSet).sort((a, b) => a.localeCompare(b, 'pt-BR'))
}

// Filtrar países
export function filterCountries(
  countries: CountrySimplified[],
  filters: {
    search?: string
    continents?: string[]
    language?: string
  }
): CountrySimplified[] {
  let filtered = [...countries]

  // Filtro por nome
  if (filters.search && filters.search.trim()) {
    const searchLower = filters.search.toLowerCase().trim()
    filtered = filtered.filter(
      (country) =>
        country.name.toLowerCase().includes(searchLower) ||
        country.officialName.toLowerCase().includes(searchLower)
    )
  }

  // Filtro por continente
  if (filters.continents && filters.continents.length > 0) {
    filtered = filtered.filter((country) =>
      filters.continents!.includes(country.continent)
    )
  }

  // Filtro por idioma
  if (filters.language && filters.language !== '') {
    filtered = filtered.filter((country) =>
      country.languages.includes(filters.language!)
    )
  }

  return filtered
}
