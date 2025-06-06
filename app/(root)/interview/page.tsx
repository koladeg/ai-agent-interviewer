import Agent from '@/components/Agent'
import { getCurrentUser } from '@/lib/actions/auth.action';
import React from 'react'

export default async function page() {

  const user = await getCurrentUser();

  return (
    <>
      <h3> Interview generation </h3>
      <Agent 
        userName={user?.name!}
        userId={user?.id}
        profileImage={user?.profileURL}
        type="generate" />
    </>
  )
}
