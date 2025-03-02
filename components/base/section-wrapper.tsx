import classnames from 'classnames'

interface SectionWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  hasScreenHeight?: boolean
  hasScreenWidth?: boolean
  hasGrid?: boolean
  contentClassName?: string
}

export default function SectionWrapper({ children, className, contentClassName, hasScreenHeight, hasScreenWidth, hasGrid = true, ...props }: SectionWrapperProps) {
  const classes = classnames(
    'flex justify-items-start flex-col items-center w-full',
    { 'min-h-screen': hasScreenHeight },
    { 'min-h-[100svh]': hasScreenHeight },
    { 'w-screen': hasScreenWidth },
    { 'min-w-screen': hasScreenWidth },
    { 'w-[100vw]': hasScreenWidth },
    { 'min-w-[100vw]': hasScreenWidth },
    className,
  )

  const contentClasses = classnames(
    'flex flex-col items-center justify-start h-full',
    { 'w-full': hasScreenWidth },
    { 'w-[1132px] sm:max-w-[100%] sm:min-w-[320px]': hasGrid },
    contentClassName,
  )
  return (
    <div className={classes} {...props}>
      <div className={contentClasses}>
        {children}
      </div>
    </div>
  )
}
