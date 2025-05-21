import { useState } from 'react'
import { FB, SD } from './base'
import { P1, P2 } from './typography'
import classNames from 'classnames'
import useHasDisappeared from '../hooks/useHasDisappeared'

interface ExpandedRowProps {
  onDisappear?: (arg0: boolean) => void
  id?: string
  inititalExpanded?: boolean
  className?: string
  title: React.ReactNode
  children: React.ReactNode
  expandedHeightClass?: string
  minimizedHeightClass?: string
  showBottomDivider?: boolean
  hideMarginOnIcon?: boolean
  allowExpandOnlyOnIcon?: boolean
}

export default function ExpandedRow({ title, children, className, expandedHeightClass, showBottomDivider, minimizedHeightClass, hideMarginOnIcon, inititalExpanded = false, ...props }: ExpandedRowProps) {
  const [expanded, setExpanded] = useState(inititalExpanded)

  const classes = classNames(
    "gap-4 p-5 transition-max-height duration-500 ease-in-out overflow-hidden",
    { 'max-h-[4000px]': expanded && !expandedHeightClass },
    expanded && expandedHeightClass ? expandedHeightClass : undefined,
    { 'max-h-[64px]': !expanded && !minimizedHeightClass },
    !expanded && minimizedHeightClass ? minimizedHeightClass : undefined,
    { 'border-b-[1px] border-Background/300': showBottomDivider },
    className)

  const { divID, disapper } = useHasDisappeared({
    onDisapper: (_, agr) => {
      props.onDisappear && props.onDisappear(agr)
    },
    id: props.id
  })

  return (
    <FB
      id={props.id ?? divID}
      va='start'
      fd="column"
      w="w-full"
      className={classes}
    >
      <FB ha='space-between' className={classNames("w-full", { "cursor-pointer": !props.allowExpandOnlyOnIcon })} onClick={() => {
        if (props.allowExpandOnlyOnIcon) return
        setExpanded((v) => !v)
      }}>
        {title}
        {hideMarginOnIcon ? <></> :
          <SD w='w-16' />
        }
        <img onClick={(e) => {
          e.stopPropagation()
          setExpanded((v) => !v)
        }} className='cursor-pointer' src={'/assets/chevron-' + (expanded ? "up" : "down") + '.svg'} width={16} style={{ color: '#818181' }} />
      </FB>
      <FB w='w-full' className='mt-2' fd='column'>
        {children}
      </FB>
    </FB>)
}