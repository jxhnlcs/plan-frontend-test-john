import Image from 'next/image'

import styles from './Footer.module.scss'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Image
          src="/img/logo-grupo.png"
          alt="Grupo Plan Marketing"
          width={150}
          height={60}
        />
        <p className={styles.copyright}>
          Grupo Plan Marketing (C) Todos os direitos reservados - {currentYear}
        </p>
      </div>
    </footer>
  )
}
