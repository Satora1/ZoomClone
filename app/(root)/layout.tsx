import StreamVideoProvider from '@/providers/StreamClientProwide'
import { Metadata } from 'next';
import React, { Children, ReactNode } from 'react'

export const metadata: Metadata = {
  title: "YOOM",
  description: "Calling and Video app",
  icons:"/icons/logo.svg"
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
      </StreamVideoProvider>

    </main>
  )
}

export default RootLayout