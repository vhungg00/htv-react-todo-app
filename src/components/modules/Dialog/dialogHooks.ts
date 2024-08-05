import { createContext, useCallback, useContext, useRef, useState } from 'react'
import { NOP } from '@/utils/function'

export type TCloseMain = () => void
export type TCloseSub = () => void
export type TDialogAction = 'main' | 'sub' | 'abort'

type TDialogState = {
  isDisplay: boolean
  name: string | null
}

type TDialogController = {
  dialogState: TDialogState
  closeMain: TCloseMain
  closeSub: TCloseSub
  unmount: () => void
  showDialog: (name: string) => Promise<TDialogAction>
}

const initialDialogState: TDialogState = {
  isDisplay: false,
  name: null,
} as const

const initialDialogController: TDialogController = {
  dialogState: initialDialogState,
  closeMain: NOP,
  closeSub: NOP,
  unmount: NOP,
  showDialog: () => new Promise<TDialogAction>(resolve => resolve('abort')),
}

export const DialogControllerContext = createContext<TDialogController>(
  initialDialogController,
)

export const useDialogState = (): TDialogController => {
  const [dialogState, setDialogState] = useState<TDialogState>(initialDialogState)
  const mutableDialogState = useRef<TDialogState>(dialogState)

  const updateDialogState = useCallback<(value: TDialogState) => void>(value => {
    setDialogState(value)
    mutableDialogState.current = value
  }, [])
  const resolveRef = useRef<(value: TDialogAction | PromiseLike<TDialogAction>) => void>(
    () => {
      // void
    },
  )

  const showDialog = useCallback(
    (name: string) => {
      if (mutableDialogState.current.isDisplay) {
        return new Promise<TDialogAction>(resolve => resolve('abort'))
      }
      updateDialogState({ isDisplay: true, name })
      const dialogPromise = new Promise<TDialogAction>(resolve => {
        resolveRef.current = resolve
      })
      return dialogPromise
    },
    [updateDialogState],
  )

  const closeMain = useCallback(() => {
    resolveRef.current('main')
    updateDialogState({ isDisplay: false, name: null })
  }, [updateDialogState])

  const closeSub = useCallback(() => {
    resolveRef.current('sub')
    updateDialogState({ isDisplay: false, name: null })
  }, [updateDialogState])

  const unmount = useCallback(() => {
    if (!mutableDialogState.current.isDisplay) return
    resolveRef.current('abort')
    updateDialogState({ isDisplay: false, name: null })
  }, [updateDialogState])

  return {
    dialogState,
    showDialog,
    closeMain,
    closeSub,
    unmount,
  }
}

export const useDialog = (): Pick<TDialogController, 'showDialog'> => {
  const { showDialog } = useContext(DialogControllerContext)
  return { showDialog }
}

export const useDialogContext = (): TDialogController =>
  useContext(DialogControllerContext)
