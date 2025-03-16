import { FB } from './base'
import { P2 } from './typography'

export default function OrderKdsCell() {
  return (<FB fd='column' className='w-full p-2 rounded-xl'>
    <FB className='w-full p-2 rounded-md bg-primary'>

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