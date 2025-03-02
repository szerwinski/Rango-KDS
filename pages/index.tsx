import { FB, FlexButton, SD, SectionWrapper, Spacer } from '../components/base'
import { H1, H2, P1, P2 } from '../components/typography'
import Image from 'next/image'
import useWindowInfo from '../hooks/useWindowInfo'
import { useState } from 'react'
import classNames from 'classnames'
import { Restaurant } from '../model'
import axios, { Canceler } from 'axios'

export default function Home({ menuUrl }: { menuUrl: String }) {
  const { isSM } = useWindowInfo()

  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const CancelToken = axios.CancelToken
  var cancel: Canceler | null = null

  async function onSearchChange(event: any) {
    const value = event.target.value
    console.log(value)

    if (value.length < 1) {
      setRestaurants([])
      return
    }

    // TODO: Search for restaurants
    if (cancel) {
      cancel()
    }

    // Create a new cancel token
    const source = CancelToken.source()
    try {
      const res = await axios.get<Restaurant[]>(
        `https://api.rangosemfila.com.br/v2/restaurants?filters[name][$containsi]=${value}&filters[menuUrl][$notNull]=true`,
        {
          cancelToken: source.token,
        }
      )
      if (res.status === 200) {
        setRestaurants(res.data)
      }
    } catch (error) {
      // Handle errors or check for axios.isCancel(error) to distinguish cancelation errors
      if (!axios.isCancel(error)) {
        console.log(error)
      }

      cancel = source.cancel
    }
  }


  const iconClasses = classNames('color-[black] w-8 h-8 transition-all duration-200 ease-in-out hover:w-10 hover:h-10 cursor-pointer')

  const socialLinks = [
    {
      href: 'https://api.whatsapp.com/send?phone=5561998164068',
      icon: <svg enable-background="new 0 0 24 24" viewBox="0 0 24 24" className={iconClasses} ><title data-testid="svgTitle" id="title_0.1292949002331356">whatsapp</title><g><path d="M18.8,14.634a1.361,1.361,0,0,0-.645-.477l-.165-.081c-.018-.009-1.845-.917-2.208-1.049a.983.983,0,0,0-1.3.349c-.177.266-.721.914-.918,1.2a.409.409,0,0,1-.125-.049c-.058-.028-.137-.063-.233-.105a7.636,7.636,0,0,1-2.2-1.387,12.737,12.737,0,0,1-1.683-2.008.766.766,0,0,1,.086-.093c.1-.1.223-.248.342-.392l.159-.191a2.247,2.247,0,0,0,.338-.538l.044-.09a1.064,1.064,0,0,0-.026-1c-.057-.116-.35-.835-.616-1.481L9.31,6.408a1.123,1.123,0,0,0-1.146-.849c-.192-.01-.412-.012-.63-.012a1.724,1.724,0,0,0-1.269.62A3.989,3.989,0,0,0,5.087,9.074a6.653,6.653,0,0,0,1.435,3.631,14.178,14.178,0,0,0,5.546,4.857,18.659,18.659,0,0,0,1.846.682,4.476,4.476,0,0,0,1.373.208,5.741,5.741,0,0,0,.84-.065,3.729,3.729,0,0,0,2.526-1.826,2.85,2.85,0,0,0,.142-1.927Zm-1.084,1.59A2.852,2.852,0,0,1,15.978,17.4a3.837,3.837,0,0,1-1.762-.107,17.989,17.989,0,0,1-1.752-.647,13.168,13.168,0,0,1-5.122-4.512l-.071-.1A5.548,5.548,0,0,1,6.087,9.074a3.06,3.06,0,0,1,.974-2.295.654.654,0,0,1,.473-.232c.2,0,.4,0,.579.011h0l.133-.01a.685.685,0,0,1,.139.244l.341.827c.279.68.592,1.438.647,1.548.04.079.033.091.026.1l-.048.1a1.323,1.323,0,0,1-.2.327L8.98,9.9c-.1.117-.19.234-.275.318a.957.957,0,0,0-.217,1.249,9.938,9.938,0,0,0,1.854,2.307,8.645,8.645,0,0,0,2.464,1.558c.076.034.138.06.184.083a.969.969,0,0,0,1.282-.2,9.857,9.857,0,0,0,.993-1.306,1,1,0,0,1,.17.051c.229.084,1.6.75,2.1,1l.177.087c.067.032.144.069.2.1A3.126,3.126,0,0,1,17.711,16.224Z"></path><path d="M12,1A11,11,0,0,0,2.792,18.014l-.974,3.711a.5.5,0,0,0,.61.61l3.779-.991A11,11,0,1,0,12,1Zm0,21a9.961,9.961,0,0,1-5.437-1.614.493.493,0,0,0-.4-.064L3,21.151l.814-3.1a.5.5,0,0,0-.071-.41A10,10,0,1,1,12,22Z"></path></g></svg>
    },
    {
      href: 'https://instagram.com/rangosemfila',
      icon: <svg enable-background="new 0 0 24 24" viewBox="0 0 24 24" className={iconClasses}><title data-testid="svgTitle" id="title_0.016672175257782973">instagram</title><path d="M21.938,7.71a7.329,7.329,0,0,0-.456-2.394,4.615,4.615,0,0,0-1.1-1.694,4.61,4.61,0,0,0-1.7-1.1,7.318,7.318,0,0,0-2.393-.456C15.185,2.012,14.817,2,12,2s-3.185.012-4.29.062a7.329,7.329,0,0,0-2.394.456,4.615,4.615,0,0,0-1.694,1.1,4.61,4.61,0,0,0-1.1,1.7A7.318,7.318,0,0,0,2.062,7.71C2.012,8.814,2,9.182,2,12s.012,3.186.062,4.29a7.329,7.329,0,0,0,.456,2.394,4.615,4.615,0,0,0,1.1,1.694,4.61,4.61,0,0,0,1.7,1.1,7.318,7.318,0,0,0,2.393.456c1.1.05,1.472.062,4.29.062s3.186-.012,4.29-.062a7.329,7.329,0,0,0,2.394-.456,4.9,4.9,0,0,0,2.8-2.8,7.318,7.318,0,0,0,.456-2.393c.05-1.1.062-1.472.062-4.29S21.988,8.814,21.938,7.71Zm-1,8.534a6.351,6.351,0,0,1-.388,2.077,3.9,3.9,0,0,1-2.228,2.229,6.363,6.363,0,0,1-2.078.388C15.159,20.988,14.8,21,12,21s-3.159-.012-4.244-.062a6.351,6.351,0,0,1-2.077-.388,3.627,3.627,0,0,1-1.35-.879,3.631,3.631,0,0,1-.879-1.349,6.363,6.363,0,0,1-.388-2.078C3.012,15.159,3,14.8,3,12s.012-3.159.062-4.244A6.351,6.351,0,0,1,3.45,5.679a3.627,3.627,0,0,1,.879-1.35A3.631,3.631,0,0,1,5.678,3.45a6.363,6.363,0,0,1,2.078-.388C8.842,3.012,9.205,3,12,3s3.158.012,4.244.062a6.351,6.351,0,0,1,2.077.388,3.627,3.627,0,0,1,1.35.879,3.631,3.631,0,0,1,.879,1.349,6.363,6.363,0,0,1,.388,2.078C20.988,8.841,21,9.2,21,12S20.988,15.159,20.938,16.244Z"></path><path d="M17.581,5.467a.953.953,0,1,0,.952.952A.954.954,0,0,0,17.581,5.467Z"></path><path d="M12,7.073A4.927,4.927,0,1,0,16.927,12,4.932,4.932,0,0,0,12,7.073Zm0,8.854A3.927,3.927,0,1,1,15.927,12,3.932,3.932,0,0,1,12,15.927Z"></path></svg>
    },
    {
      href: 'https://www.facebook.com/rangosemfila',
      icon: <svg enable-background="new 0 0 24 24" viewBox="0 0 24 24" className={iconClasses}><title data-testid="svgTitle" id="title_0.011762398468066149">facebook</title><path d="M23,12A11,11,0,1,0,10.279,22.865h0a11.08,11.08,0,0,0,3.436,0h0A10.952,10.952,0,0,0,23,12ZM10.859,21.935v-6.9a.5.5,0,0,0-.5-.5H8.193V12.5h2.166a.5.5,0,0,0,.5-.5V9.686c0-2.278,1.264-3.585,3.459-3.585a15.392,15.392,0,0,1,1.858.137V7.89h-.824l-.019,0a2,2,0,0,0-2.181,1.735,1.8,1.8,0,0,0-.011.4V12a.5.5,0,0,0,.5.5H15.97l-.312,2.035H13.641a.5.5,0,0,0-.5.5v6.9A10.124,10.124,0,0,1,10.859,21.935Zm3.282-.166V15.535h1.946a.5.5,0,0,0,.5-.425l.465-3.035a.5.5,0,0,0-.494-.575H14.141V10.016a1.267,1.267,0,0,1,.308-.821,1.218,1.218,0,0,1,.9-.3h1.324a.5.5,0,0,0,.5-.5V5.806a.5.5,0,0,0-.42-.494A16.661,16.661,0,0,0,14.325,5.1c-2.754,0-4.466,1.757-4.466,4.585V11.5H7.693a.5.5,0,0,0-.5.5v3.035a.5.5,0,0,0,.5.5H9.859v6.234a10,10,0,1,1,4.282,0Z"></path></svg>
    },
    {
      href: 'https://tiktok.com/@rangosemfila',
      icon: <svg enable-background="new 0 0 24 24" viewBox="0 0 24 24" className={iconClasses}><title data-testid="svgTitle" id="title_0.38918321063100003">tiktok</title><path d="M9.37,23.5a7.468,7.468,0,0,1,0-14.936.537.537,0,0,1,.538.5v3.8a.542.542,0,0,1-.5.5,2.671,2.671,0,1,0,2.645,2.669.432.432,0,0,1,0-.05V1a.5.5,0,0,1,.5-.5h3.787a.5.5,0,0,1,.5.5A4.759,4.759,0,0,0,21.59,5.76a.5.5,0,0,1,.5.5L22.1,10a.533.533,0,0,1-.519.515,9.427,9.427,0,0,1-4.741-1.268v6.789A7.476,7.476,0,0,1,9.37,23.5ZM8.908,9.585a6.466,6.466,0,1,0,6.93,6.447V8.326a.5.5,0,0,1,.791-.407A8.441,8.441,0,0,0,21.1,9.5l-.006-2.76A5.761,5.761,0,0,1,15.859,1.5H13.051V16.032a.458.458,0,0,1,0,.053,3.672,3.672,0,1,1-4.14-3.695Z"></path></svg>
    },
    {
      href: 'https://x.com/rangosemfila',
      icon: <svg enable-background="new 0 0 24 24" viewBox="0 0 24 24" className={iconClasses}><title data-testid="svgTitle" id="title_0.44173467984166526">x</title><path d="m2.538 3 7.425 9.928L2 21h1.5l7.033-7.067L16 21h5.232l-7.662-9.995 6.955-7.514h-1.5L13 10 7.77 3H2.538Zm1.994 1h2.645l12.087 16h-2.525L4.532 4Z"></path></svg>
    },
    {
      href: 'https://www.linkedin.com/company/rango-sem-fila/?viewAsMember=true',
      icon: <svg enable-background="new 0 0 24 24" viewBox="0 0 24 24" className={iconClasses}><title data-testid="svgTitle" id="title_0.5374948508930302">linkedin</title><path d="M4.425,1.671A2.738,2.738,0,0,0,1.5,4.4,2.71,2.71,0,0,0,4.369,7.128H4.4a2.734,2.734,0,1,0,.028-5.457ZM4.4,6.128H4.369a1.736,1.736,0,1,1,.056-3.457A1.737,1.737,0,1,1,4.4,6.128Z"></path><path d="M6.541,8.431H2.253a.5.5,0,0,0-.5.5v12.9a.5.5,0,0,0,.5.5H6.541a.5.5,0,0,0,.5-.5V8.931A.5.5,0,0,0,6.541,8.431Zm-.5,12.9H2.753V9.431H6.041Z"></path><path d="M17.064,8.128A4.691,4.691,0,0,0,13.7,9.362V8.931a.5.5,0,0,0-.5-.5H8.914a.5.5,0,0,0-.5.523c.053,1.183,0,12.756,0,12.873a.5.5,0,0,0,.5.5H13.2a.5.5,0,0,0,.5-.5v-7.2a2.749,2.749,0,0,1,.1-.86,1.869,1.869,0,0,1,1.737-1.254c.413,0,1.671,0,1.671,2.417v6.9a.5.5,0,0,0,.5.5H22a.5.5,0,0,0,.5-.5v-7.4C22.5,10.485,20.467,8.128,17.064,8.128Zm4.436,13.2H18.213v-6.4c0-2.973-1.673-3.417-2.671-3.417a2.83,2.83,0,0,0-2.664,1.878,3.253,3.253,0,0,0-.177,1.236v6.7H9.416c.009-2.058.04-9.654.009-11.9H12.7v1.328a.5.5,0,0,0,.92.272,3.769,3.769,0,0,1,3.443-1.9c2.819,0,4.436,1.934,4.436,5.305Z"></path></svg>
    },
  ]

  return (
    <>
      <SectionWrapper hasScreenWidth hasScreenHeight>
        <div className='w-full h-[80px] bg-[orange] border-[1px] border-[black]' />
        <FB fd='column' className='w-full h-full mt-10'>
          <H1>RanGo Menu Digital</H1>
          <SD h='h-4' />
          <P1 className='text-white'>Busque por um estabelecimento para começar</P1>
          <SD h='h-12' />
          <FB fd='column' ha='start'>
            <P2 className='mb-2 text-[grey] !text-[13px]'>RESTAURANTE PARCEIRO</P2>
            <FB className='w-[400px] sm:w-[300px] border-[1px] border-[black] px-4 relative' fd='column' ha='start'>
              <input placeholder='Ex: Pop`s Burguer' className='w-full h-[60px] px-1 rounded-[16px] border-[1px] border-[black]' onChange={onSearchChange} />
              <FB fd='column' className='absolute -left-[0.5px] top-[100%] w-[400px] sm:w-[300px] bg-[#E0E0E0EE]'>
                {
                  restaurants.map((restaurant, index) => {
                    return <a href={`/${restaurant.menuUrl}`} className={classNames('h-[36px] w-full text-center justify-center flex flex-col hover:bg-[#a0a0a0ee]', {
                      'border-b-[1px] border-[black]': index !== restaurants.length - 1
                    })}>
                      <P2>{restaurant.name}</P2>
                    </a>
                  })
                }
              </FB>
            </FB>
          </FB>

          <SD h='h-12' />
          <img src='/assets/rango-logo.jpeg' className='w-[100px]' />


          <P2 className='mt-10 mb-5 text-[grey] !text-[14px]'>NOS ACOMPANHE NAS REDES SOCIAIS</P2>
          <FB className='h-12 gap-4'>
            {
              socialLinks.map((socialLink, index) => {
                return <a href={socialLink.href} target='_blank'>{socialLink.icon}</a>
              })
            }
          </FB>

          <P2 className='mt-12 text-[grey] !text-[14px]'>É PROPRIETÁRIO DE RESTAURANTE?</P2>
          <a href='https://rangosemfila.com.br/' target='_blank'><FlexButton className='mt-6 bg-Sombra text-[white] px-10 py-4'>Quero conhecer!</FlexButton></a>
        </FB>
      </SectionWrapper>
    </>
  )
}
