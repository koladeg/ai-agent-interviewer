import Agent from '@/components/Agent'
import React from 'react'

export default function page() {
  return (
    <div>
      <h3> Interview generation </h3>
      <Agent userName='You' userId='user1' type='generate' />
    </div>
  )
}
