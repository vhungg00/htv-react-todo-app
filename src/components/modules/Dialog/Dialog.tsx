import React, { useCallback } from 'react'

import style from './style.module.scss'

export type Props = {
  variant?: 'important' | 'importantNoClose'
  children: React.ReactNode
}

const getStyleDialog = (variant: Props['variant']): string => {
  switch (variant) {
    case 'important':
      return style.dialogImportant
    case 'importantNoClose':
      return style.dialogImportantNoClose
    default:
      return ''
  }
}

export const Dialog: React.FC<Props> = props => {
  const cn = useCallback((...className: string[]) => className.join(''), [])
  const { variant, children } = props
  const dialogStyle = getStyleDialog(variant)

  return (
    <div className={cn(`${style.dialog}`, dialogStyle)} role="dialog">
      {children}
    </div>
  )
}
