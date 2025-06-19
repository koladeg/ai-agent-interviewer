import Agent from '@/components/Agent'
import { getCurrentUser } from '@/lib/actions/auth.action';
import React from 'react'

export default async function page() {

  const user = await getCurrentUser();

  console.log("user: ", user);
  

  return (
    <>
      <h3> Report generation </h3>
      <Agent 
        userName={user?.name!}
        userId={user?.id}
        profileImage={user?.profileURL}
        type="generate" />
    </>
  )
}
