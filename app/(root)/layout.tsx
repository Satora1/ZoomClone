import StreamVideoProvider from '@/providers/StreamClientProwide'
import React, { Children, ReactNode } from 'react'

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