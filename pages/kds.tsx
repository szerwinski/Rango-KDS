import { FB, FlexButton, SD, SectionWrapper, Spacer } from '../components/base'
import { H1, H2, P1, P2 } from '../components/typography'
import Image from 'next/image'
import useWindowInfo from '../hooks/useWindowInfo'
import { useState } from 'react'
import classNames from 'classnames'
import { Restaurant } from '../model'
import axios, { Canceler } from 'axios'
import Button from '../components/buttons/button'
import Drawer from '../components/drawer'
import Header from '../components/header'
import OrderKdsCell from '../components/order-kds-cell'

export default function Kds() {
  return (
    <>
      <SectionWrapper hasScreenWidth hasScreenHeight className='items-center justify-center bg-background'>
        <FB fd='row' h='h-full' va='start' className='w-full'>
          <Drawer />
          <FB fd='column' va='start' className='w-full min-h-[100vh] ml-[80px] bg-background'>
            <Header />
            <FB fd='column' va='start' className='w-[calc(100%-40px)] p-8 rounded-xl h-full my-4 bg-background2'>
              <FB className='gap-2 mb-4'>
                <H2 className='text-[white]'>KDS </H2>
                <H2 className='text-[white] !font-normal'> (Kitchen Display System)</H2>
              </FB>
              <div className="grid w-full grid-cols-4 gap-4">
                <OrderKdsCell />
                <OrderKdsCell />
              </div>
            </FB>
          </FB>
        </FB>
      </SectionWrapper>
    </>
  )
}
