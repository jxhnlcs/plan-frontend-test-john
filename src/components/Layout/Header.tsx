import Image from 'next/image'
import Link from 'next/link'

import styles from './Header.module.scss'

export function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image
          src="/img/logo-plan.png"
          alt="Plan Marketing Digital"
          width={120}
          height={50}
          priority
        />
      </Link>
    </header>
  )
}
