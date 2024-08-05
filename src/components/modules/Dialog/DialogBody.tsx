import React from 'react'
import style from './style.module.scss'

type TProps = {
  children: React.ReactNode
}

export const DialogBody: React.FC<TProps> = ({ children }) => {
  return <div className={style.dialogBody}>{children}</div>
}
