import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

import styles from './Header.module.scss'

interface HeaderProps {
  children?: ReactNode
}

export function Header({ children }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logoLink}>
        <Image
          src="/img/logo-plan.png"
          alt="Plan Marketing Digital"
          width={100}
          height={42}
          priority
        />
      </Link>
      {children && (
        <div className={styles.filtersContainer}>
          {children}
        </div>
      )}
    </header>
  )
}
