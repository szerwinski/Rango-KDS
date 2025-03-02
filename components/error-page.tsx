import Image from "next/image"
import { FB, SD, SectionWrapper, Spacer } from "./base"
import { H1 } from './typography'

export default function ErrorPage() {
  return (
    <SectionWrapper className='w-full h-[100svh]' hasScreenHeight hasScreenWidth contentClassName='w-full h-full'>
      <Spacer />
      <H1>Oops...</H1>
      <SD h='h-10' />
      <img src='/assets/not-found.gif' alt='Not found' className='w-[300px]' />
      <SD h='h-10' />
      <H1 className='text-center max-w-[500px]'>Certifique de ser uma url de um restaurante</H1>
      <Spacer />
    </SectionWrapper>
  )
}