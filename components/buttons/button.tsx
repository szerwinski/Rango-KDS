import classNames from 'classnames'
import React from 'react'
import { FlexButton } from '../base'
import { H4 } from '../typography'

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  isSecondary?: boolean
}

export default function Button({ children, title, onClick, isSecondary, className, ...props }: ButtonProps) {
  const classes = classNames(
    'flex justify-center items-center',
    'rounded-xl',
    'py-4 px-12',
    className,
  )
  return (
    <FlexButton className={classes} onClick={onClick} style={props.style}>
      <H4>{children}</H4>
    </FlexButton>
  )
}