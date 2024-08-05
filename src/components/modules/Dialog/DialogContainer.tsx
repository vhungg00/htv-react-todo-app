import React from 'react'
import { Backdrop } from '@/components/Backdrop'

export type Props = {
  isClear?: boolean
  onclickBackdrop?: () => void | Promise<void>
  children: React.ReactNode
}

export const DialogContainer: React.FC<Props> = ({
  isClear,
  onclickBackdrop,
  children,
}) => (
  <>
    <Backdrop isClear={isClear} onClick={onclickBackdrop} />
    {children}
  </>
)
