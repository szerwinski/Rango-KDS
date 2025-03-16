import { FB, Spacer } from './base'
import { P1 } from './typography'



export default function Drawer() {
  return (
    <FB fd='column' className='fixed top-0 left-0 w-20 h-[100vh] py-4 bg-background2'>
      <img src='/assets/logo_laranja.png' alt='Rango Sem Fila Logo' className='' />
      <P1 className='text-[white] !text-[12px]'>v1.0.0</P1>
      <Spacer />
      <FB className='cursor-pointer' onClick={() => {
        console.log('click')
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <rect x="3" y="3" width="14" height="18" rx="3" fill="none" stroke="#F58538" stroke-width="2" />
          <path d="M15 12H5m0 0l5-5m-5 5l5 5" stroke="#F58538" stroke-width="2" fill="none" />
        </svg>

        <P1 className='text-primary !text-[14px]'>Sair</P1>
      </FB>
    </FB>
  )
} 