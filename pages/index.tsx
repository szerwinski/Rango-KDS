import { FB, FlexButton, SD, SectionWrapper, Spacer } from '../components/base'
import { H1, H2, P1, P2 } from '../components/typography'
import Image from 'next/image'
import useWindowInfo from '../hooks/useWindowInfo'
import { useState } from 'react'
import classNames from 'classnames'
import { Restaurant } from '../model'
import axios, { Canceler } from 'axios'
import Button from '../components/buttons/button'

export default function Home({ menuUrl }: { menuUrl: String }) {
  var [loginType, setLoginType] = useState<'operator' | 'admin'>('admin')


  return (
    <>
      <SectionWrapper hasScreenWidth hasScreenHeight className='items-center justify-center bg-background'>
        <FB fd='column' className='w-full h-full'>
          <img src='/assets/logo_laranja.png' alt='Rango Sem Fila Logo' className='h-[200px]' />
          <FB fd='column' className='px-4 py-10 rounded-xl gap-5 bg-background2 min-w-[280px] w-[30%] mt-10'>
            <FB fd='row' className='gap-3' w='w-full'>
              <Button className={classNames('w-full py-[8px] !rounded-[4px]', {
                'bg-primary': loginType === 'operator',
                'bg-background': loginType === 'admin',
              })} classNameText={loginType === 'operator' ? 'text-[white]' : 'text-primary'} onClick={() => setLoginType('operator')}>Operador</Button>
              <Button className={classNames('w-full py-[8px] !rounded-[4px]', {
                'bg-primary': loginType === 'admin',
                'bg-background': loginType === 'operator',
              })} classNameText={loginType === 'admin' ? 'text-[white]' : 'text-primary'} onClick={() => setLoginType('admin')}>Administrador</Button>
            </FB>
            <input
              type='text'
              placeholder='Email'
              className='w-full py-[8px] text-[white]'
            />
            <input
              type='password'
              placeholder='Senha'
              className='w-full py-[8px] text-[white]'
            />
            <Button prefixImage='assets/login-icon.svg' className='w-full py-[8px] bg-primary !rounded-[4px]'>Conectar</Button>
          </FB>
        </FB>
      </SectionWrapper>
    </>
  )
}
