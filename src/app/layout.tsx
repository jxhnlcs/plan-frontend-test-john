import React from 'react'
import { ToastContainer } from 'react-toastify'

import type { Metadata } from 'next'
import { Exo } from 'next/font/google'

import { Providers } from '@/components/Providers'

import '@/styles/globals.scss'
import 'react-toastify/dist/ReactToastify.css'

const exo = Exo({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

export const metadata: Metadata = {
  title: 'Catálogo de Países | Plan Marketing',
  description: 'Explore e visualize informações sobre países do mundo. Filtre por nome, continente e idioma.',
  keywords: ['países', 'catálogo', 'REST Countries', 'Plan Marketing'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={exo.className}>
        <Providers>{children}</Providers>
        <ToastContainer 
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </body>
    </html>
  )
}
