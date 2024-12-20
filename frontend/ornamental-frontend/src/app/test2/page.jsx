'use client'
import ReturnButton from '@/components/ReturnButton'
import SecretSantaOnboarding from '@/components/SecretSantaOnboarding'
import { SecretSantaAnnouncement, SpiralAnimation } from '@/components/SecretSantaAnnouncement'
import React from 'react'
import { useCookies } from 'next-client-cookies';
import { useEffect } from 'react'


function testPage2() {
  const cookies = useCookies()
  const userid = cookies.get('userId')

  useEffect(() => {
    console.log(userid)
  }, [])

  return (
    <>
      <SecretSantaAnnouncement userid={userid}></SecretSantaAnnouncement>
      {/* <SecretSantaOnboarding roomCode={"1325"}></SecretSantaOnboarding> */}
    </>
  )
}

export default testPage2