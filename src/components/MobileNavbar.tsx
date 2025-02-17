import { currentUser } from '@clerk/nextjs/server'
import React from 'react'

async function MobileNavbar() {
    const user = await currentUser()
    console.log(user);
    
  return (
    <div>
      
    </div>
  )
}

export default MobileNavbar
