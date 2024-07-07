import React from 'react'

import style from './style.module.scss'

export type Props = {
  isClear?: boolean
  onClick?: () => void | Promise<void>
  children?: React.ReactNode
}

export const Backdrop: React.FC<Props> = props => {
  const { children, onClick, isClear } = props

  return (
    <div
      className={style.backdrop}
      onClick={onClick}
      data-clear={isClear}
      data-event={Boolean(onClick)}
    >
      {children}
    </div>
  )
}
