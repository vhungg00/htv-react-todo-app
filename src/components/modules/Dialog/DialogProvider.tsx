import React from 'react'
import { DialogControllerContext, useDialogState } from './dialogHooks'

type Props = {
  children?: React.ReactNode
}

export const DialogProvider: React.FC<Props> = ({ children }) => {
  const { dialogState, showDialog, closeMain, closeSub, unmount } = useDialogState()
  return (
    <DialogControllerContext.Provider
      value={{ dialogState, showDialog, closeMain, closeSub, unmount }}
    >
      {children}
    </DialogControllerContext.Provider>
  )
}
