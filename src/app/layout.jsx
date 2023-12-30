"use client";

import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar'
import { Toaster } from 'react-hot-toast'
import { UserProvider } from "@/contexts/UserContext";

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <UserProvider>
        <Toaster />
        <Navbar />
        {children}
      </UserProvider>
        </body>
    </html>
  )
}
