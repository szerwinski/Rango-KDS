import { useState } from 'react'
import { FB, SD } from './base'
import { H1, H3, H4, P1, P2 } from './typography'
import classNames from 'classnames'
import OptionalRow from './optional-row'
import { OptionsCategory } from '../model'

interface OptionalCategoryRowProps {
  className?: string
  optionCategory: OptionsCategory
  style?: React.CSSProperties
}

export default function OptionalCategoryRow({ className, optionCategory, style, ...props }: OptionalCategoryRowProps) {
  const classes = classNames(
    'pb-2 mb-2',
    className)

  return (
    <FB
      va='start'
      w="w-full"
      fd='column'
      className={classes}
    >
      <FB w='w-full' ha='space-between' style={style} className='p-3'>
        <FB fd='column' ha='start'>
          <H4>{optionCategory.categoryName}</H4>
          {
            optionCategory.maxOptions === 1 ?
              <P2>Escolha 1 opção</P2>
              : <P2>Escolha até {optionCategory.maxOptions} opções</P2>
          }
        </FB>
        {
          optionCategory.isOptional === true &&
          <H4 className='px-4 py-2 text-[white] rounded-[24px] bg-[black]'>Obrigatório</H4>
        }
      </FB>
      {
        optionCategory.options.map((option, index) => {
          return <OptionalRow showBottomDivider key={index} option={option} />
        })
      }
    </FB>)
}