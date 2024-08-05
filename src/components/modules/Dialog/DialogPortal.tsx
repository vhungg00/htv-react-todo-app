import React, { createRef, memo, useEffect, useRef } from 'react'
import { TCloseMain, TCloseSub, useDialogContext } from './dialogHooks'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from '@/utils/bodyScrollLock'

import fadeStyle from './fade.module.scss'

type TContainerProps = {
  children: React.ReactNode
  isDisplay: boolean
}

const TIME_OUT = 350

const createWrapperAndAppendToBody = (wrapperId: string) => {
  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)
  document.body.appendChild(wrapperElement)
  return wrapperElement
}

export const Container: React.FC<TContainerProps> = ({ children, isDisplay }) => {
  let el = document.getElementById('rootDialog')
  if (!el) {
    el = createWrapperAndAppendToBody('rootDialog')
  }

  const nodeRef = useRef(null)

  useEffect(() => {
    if (!nodeRef.current) return
    if (isDisplay) {
      disableBodyScroll(nodeRef.current, {
        allowTouchMove: () => true,
      })
    } else {
      enableBodyScroll(nodeRef.current)
      clearAllBodyScrollLocks()
    }
  }, [nodeRef, isDisplay])

  return createPortal(
    <CSSTransition
      in={isDisplay}
      nodeRef={nodeRef}
      timeout={TIME_OUT}
      classNames={fadeStyle}
      unmountOnExit
      appear
    >
      <div ref={nodeRef}>{children}</div>
    </CSSTransition>,
    el,
  )
}

export type TConnect = {
  name: string
  children: (params: { closeMain: TCloseMain; closeSub: TCloseSub }) => React.ReactNode
}

const Connect: React.FC<TConnect> = ({ children, name }) => {
  const { dialogState, closeMain, closeSub, unmount } = useDialogContext()

  useEffect(() => () => unmount(), [unmount])

  return (
    <Container isDisplay={dialogState.isDisplay && dialogState.name === name}>
      {children({ closeMain, closeSub })}
    </Container>
  )
}

export const DialogPortal = memo(Connect)
