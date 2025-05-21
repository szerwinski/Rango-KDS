import classnames from 'classnames'

interface SizedDivisorProps extends React.HTMLAttributes<HTMLDivElement> {
  w?: string
  h?: string
}

export default function SD({ w, h, className, children }: SizedDivisorProps) {

  const classes = classnames(
    w !== undefined ? `${w}` : '',
    h !== undefined ? `${h}` : '',
    className)
  return (<div className={classes}> {children} </div>)
}