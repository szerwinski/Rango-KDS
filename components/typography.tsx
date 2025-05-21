import classnames from 'classnames'

interface TypographyProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children?: React.ReactNode
  className?: string
}

export function H1({ children, className, ...props }: TypographyProps) {
  const classes = classnames('font-roboto', 'lg:text-dh1 md:text-th1 sm:text-mh1', className)
  return (<h1 {...props} className={classes}> {children} </h1>)
}

export function H2({ children, className, ...props }: TypographyProps) {
  const classes = classnames('font-roboto', 'lg:text-dh2 md:text-th2 sm:text-mh2', className)
  return (<h2 {...props} className={classes}> {children} </h2>)
}

export function H3({ children, className, ...props }: TypographyProps) {
  const classes = classnames('font-roboto', 'lg:text-dh3 md:text-th3 sm:text-mh3', className)
  return (<h3 {...props} className={classes}> {children} </h3>)
}

export function H4({ children, className, ...props }: TypographyProps) {
  const classes = classnames('font-roboto', 'lg:text-dh4 md:text-th4 sm:text-mh4', className)
  return (<h4 {...props} className={classes}> {children} </h4>)
}

export function P1({ children, className, ...props }: TypographyProps) {
  const classes = classnames('font-roboto', 'lg:text-dp1 md:text-tp1 sm:text-mp1', className)
  return (<p {...props} className={classes}> {children} </p>)
}

export function P2({ children, className, ...props }: TypographyProps) {
  const classes = classnames('font-roboto', 'lg:text-dp2 md:text-tp2 sm:text-mp2', className)
  return (<p {...props} className={classes}> {children} </p>)
}