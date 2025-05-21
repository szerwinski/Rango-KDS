import classNames from 'classnames'
import React from 'react'
import { FB, FlexButton } from '../base'
import { H4, P2 } from '../typography'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isSecondary?: boolean
  classNameText?: string
  prefixImage?: string
}

export default function Button({ children, title, prefixImage, onClick, isSecondary, className, classNameText, ...props }: ButtonProps) {
  const classes = classNames(
    'flex justify-center items-center',
    'rounded-xl',
    'py-4 px-12',
    className,
  )
  return (
    <FlexButton className={classes} onClick={onClick} style={props.style}>
      <FB>
        {
          prefixImage && <img src={prefixImage} alt={title} className='w-6 h-6 mr-4' />
        }
        <P2 className={classNameText}>{children}</P2>
      </FB>
    </FlexButton>
  )
}