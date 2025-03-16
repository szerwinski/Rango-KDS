import { FB } from './base'
import { P1, P2 } from './typography'

export default function OrderKdsCell() {


  return (<FB fd='column' className='w-full p-2 rounded-xl'>
    <FB ha='start' className='w-full gap-3 p-2 rounded-md bg-primary'>
      <FB className="relative">
        <div className="w-10 h-10 border-2 border-t-0 border-[white] border-solid rounded-full animate-spin" />
        <P1 className='text-[white] absolute !text-[12px]'>42m</P1>
      </FB>
      <P1 className='text-[white]'>Pedido #1231</P1>
      <P1 className='text-[white] !font-light'>|</P1>
      <P1 className='text-[white] !font-light'>Mesa 34</P1>
    </FB>
    <FB fd='column' ha='start' className='w-full p-2 gap-2 rounded-md bg-[#2a2f41]'>
      {
        [1, 2, 3].map((item, index) => {
          return (
            <P2 className='text-[white] px-2 py-1'>1 x Pedido {item}</P2>
          )
        })
      }
      <FB className='w-full gap-2'>
        <FB className='w-1/2 p-2 rounded-md bg-[red]'>
          <P2 className='text-[white]'>Ocultar</P2>
        </FB>
        <FB className='w-1/2 p-2 rounded-md bg-[green]'>
          <P2 className='text-[white]'>Ocultar</P2>
        </FB>
      </FB>
    </FB>
  </FB>
  )
}