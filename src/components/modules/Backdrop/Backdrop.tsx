import React from 'react'

import style from './style.module.scss'

export type Props = {
  isClear?: boolean
  onClick?: () => void | Promise<void>
  children?: React.ReactNode
}

export const Backdrop: React.FC<Props> = ({ isClear, onClick, children }) => {
  return (
    <div
      aria-hidden={true}
      data-clear={isClear}
      data-event={Boolean(onClick)}
      className={style.backdrop}
      onClick={onClick}
    >
      {children}
    </div>
  )
}
