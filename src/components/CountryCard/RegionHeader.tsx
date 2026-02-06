import styles from './RegionHeader.module.scss'

// Mapeamento de continentes para imagens de fundo (silhueta)
const CONTINENT_IMAGES: Record<string, string> = {
  'Africa': '/img/regions/africa.svg',
  'North America': '/img/regions/north-america.svg',
  'South America': '/img/regions/south-america.svg',
  'Asia': '/img/regions/asia.svg',
  'Europe': '/img/regions/europa.svg',
  'Oceania': '/img/regions/oceania.svg',
  'Antarctica': '/img/regions/antarctica.svg',
}

interface RegionHeaderProps {
  region: string
  continent: string
}

export function RegionHeader({ region, continent }: RegionHeaderProps) {
  const bgImage = CONTINENT_IMAGES[continent]

  return (
    <div 
      className={styles.header}
      style={bgImage ? { 
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: 'right 8px center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 80%'
      } : undefined}
    >
      <span className={styles.regionName}>{region}</span>
    </div>
  )
}
