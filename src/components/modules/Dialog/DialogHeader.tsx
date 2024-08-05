import React from 'react'

import style from './style.module.scss'

type Props = {
  onClose: () => void | Promise<void>
}

export const DialogHeader: React.FC<Props> = ({ onClose }) => (
  <div className={style.header}>
    <button onClick={onClose} className={style.close}>
      <i className={style.closeIcon} />
    </button>
  </div>
)
