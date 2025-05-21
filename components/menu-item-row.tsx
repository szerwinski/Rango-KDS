import { useState } from 'react'
import { FB, SD } from './base'
import { H1, H4, P1, P2 } from './typography'
import classNames from 'classnames'

interface MenuItemRowProps {
  showBottomDivider?: boolean
  className?: string
  image?: string
  title: React.ReactNode
  description: React.ReactNode
  price: number
}

export default function MenuItemRow({ title, description, className, showBottomDivider, price, image, ...props }: MenuItemRowProps) {

  function isURL(str: string) {
    // Regular expression for a basic URL pattern
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
    return urlRegex.test(str)
  }


  const classes = classNames(
    { 'border-b-[1px] border-[grey] pb-2': showBottomDivider },
    className)

  return (
    <FB
      w="w-full"
      className={classes}
    >
      <FB w='w-full' fd='column' ha='start'>
        {title}
        {description}
        <P2>R$ {price.toFixed(2).replace('.', ',')}</P2>
      </FB>
      {
        isURL(image ?? '') ? <img src={image} className='w-[80px] h-[80px] object-cover' /> : <H1 className='!text-[40px] mr-3'>{image}</H1>
      }
    </FB>)
}