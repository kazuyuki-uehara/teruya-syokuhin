"use client"
import './globals.css'
// import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider,createTheme } from '@mui/material/styles';
import Layout from './_components/Layout';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux'
import { store } from './store';


const inter = Inter({ subsets: ['latin'] })

// export const metadata = {
//   title: 'hello',
//   description: '...',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
      <Provider store={store}>
        <Layout>{children}</Layout>
        </Provider>
      </body>
    </html>
  )
}
