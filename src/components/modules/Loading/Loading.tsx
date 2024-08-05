import React, { useCallback } from 'react'

import style from './style.module.scss'

type Props = {
  isLoading: boolean
  isLoadingText?: boolean
  children: React.ReactNode
}

export const Loading: React.FC<Props> = ({
  isLoading,
  isLoadingText,
  children,
}) => {
  const cx = useCallback(
    (...className: string[]) => className.join(' ').trim(),
    [],
  )
  const DOT_QUANTITY = isLoadingText ? 3 : 4

  if (!isLoading) return null

  return (
    <div className={style.loadingBackdrop}>
      <div
        className={cx(
          style.loading,
          `${isLoadingText ? style.loadingText : ''}`,
        )}
      >
        {children}
        <div className={style.loadingDots}>
          {[...Array(DOT_QUANTITY)].map((_, index) => (
            <span key={`dot_${index}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
