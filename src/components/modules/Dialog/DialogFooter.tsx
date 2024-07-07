import React from 'react'

import style from './style.module.scss'

type Props = {
  children: React.ReactNode
}

export const DialogFooter: React.FC<Props> = ({ children }) => (
  <div className={style.footer}>{children}</div>
)
