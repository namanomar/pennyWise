"use client"
import { ThemeProvider } from 'next-themes'
import React, { ReactNode } from 'react'

const RootProvider = ({children}:{children:ReactNode}) => {
  return (
    <ThemeProvider attribute='class' defaultTheme="dark" enableSystem disableTransitionOnChange>
       {children}
    </ThemeProvider>
  )
}

export default RootProvider
