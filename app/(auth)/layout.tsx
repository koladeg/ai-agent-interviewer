import React, { ReactNode } from 'react'

export default function Authlayout({ children }: {children: ReactNode}) {
  return (
    <div className='auth-layout'>{children}</div>
  )
}
