import { useEffect, useState } from 'react'
import { FB, SD, Spacer } from './base'
import { H1, H2, H3, P2 } from './typography'


export default function Header() {
  var [currentTimer, setCurrentTimer] = useState('')
  // create a hook for formating current time hh:mm:ss
  useEffect(() => {
    const interval = setInterval(() => {
      var date = new Date()
      var hours = date.getHours()
      var minutes = date.getMinutes()
      var seconds = date.getSeconds()
      var time = `${hours}:${minutes}:${seconds}`
      // make 2 decimal places for hours, minutes and seconds
      time = time.split(':').map((t) => t.padStart(2, '0')).join(':')
      setCurrentTimer(time)
    }, 1000)
    return () => clearInterval(interval)
  }
    , [])


  return <FB className='w-full h-[60px] px-5 bg-background'>
    <div className='w-6 h-6 rounded-md bg-[black]' />
    <SD w='w-4' />
    <P2 className='text-[white]'>Rango Sem Fila - Nome da pessoa</P2>
    <Spacer />
    <H3 className='text-[white]'>{currentTimer}</H3>
  </FB>
}