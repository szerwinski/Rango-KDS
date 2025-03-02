import classnames from 'classnames'

interface FlexboxProps extends React.HTMLAttributes<HTMLButtonElement> {
  fd?: 'column' | 'row'
  ha?: 'start' | 'center' | 'end' | 'stretch'
  va?: 'start' | 'center' | 'end'
  w?: string
  h?: string
}

export default function FlexButton({ w, h, fd, ha, va, className, children, style, onClick }: FlexboxProps) {

  const classes = classnames(
    'flex',
    fd === 'column' ? 'flex-col' : 'flex-row',
    w !== undefined ? `${w}` : '',
    h !== undefined ? `${h}` : '',
    'justify-center',
    'items-center',
    className)
  return (<button onClick={onClick} className={classes}
    style={Object.assign({}, style, {
      justifyContent: (fd === 'column' ? va || 'center' : ha || 'center'),
      alignItems: (fd === 'column' ? ha || 'center' : va || 'center'),
    })}> {children} </button>)
}