import classnames from 'classnames'

interface FlexboxProps extends React.HTMLAttributes<HTMLDivElement> {
  fd?: 'column' | 'row'
  ha?: 'start' | 'center' | 'end' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly'
  va?: 'start' | 'center' | 'end' | 'stretch'
  w?: string
  h?: string
  smCol?: boolean
}

export default function FB({ w, h, fd, ha, va, className, smCol, children, style, ...props }: FlexboxProps) {

  const classes = classnames(
    'flex',
    fd === 'column' ? 'flex-col' : 'flex-row',
    w !== undefined ? `${w}` : '',
    smCol ? 'sm:flex-col' : '',
    h !== undefined ? `${h}` : '',
    'justify-center',
    'items-center',
    className)
  return (<div className={classes}
    {...props}
    style={Object.assign({}, style, {
      justifyContent: (fd === 'column' ? va || 'center' : ha || 'center'),
      alignItems: (fd === 'column' ? ha || 'center' : va || 'center'),
    })}> {children} </div>)
}