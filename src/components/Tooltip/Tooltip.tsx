import { Fragment, ReactNode, useCallback, useEffect, useRef } from 'react'

import { createPortal } from 'react-dom'
import styled from 'styled-components'

export declare type VariationPlacement =
  | 'top-start'
  | 'top-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'right-start'
  | 'right-end'
  | 'left-start'
  | 'left-end'
export declare type AutoPlacement = 'auto' | 'auto-start' | 'auto-end'
export declare type Placement = AutoPlacement | VariationPlacement

export type Props = {
  placement?: Placement
  children: ReactNode
  label?: string | ReactNode
  hasArrow?: boolean
}

export const Tooltip = (props: Props) => {
  const { label, children, hasArrow = false } = props
  const refDom = useRef(document.createElement('div'))
  const refOnlyText = useRef<HTMLDivElement>(null)
  const refTooltip = useRef<HTMLDivElement>(null)
  const isDomExist = useRef<boolean>(false)
  const refFrame = useRef<number>()
  const isOpen = useRef(false)

  const createDom = useCallback(() => {
    if (isDomExist.current) return
    isDomExist.current = true
    const dom = refDom.current
    dom.style.position = 'absolute'
    dom.style.width = '0px'
    dom.style.height = '0px'
    dom.style.left = '0px'
    dom.style.top = '0px'
    document.querySelector('body')?.appendChild(dom)
  }, [])

  const definedPositionOption = useCallback(async () => {
    console.log('refOnlyText', refOnlyText)
    const tooltip = refOnlyText.current
    console.log(refOnlyText)
    const tooltipContainer = refTooltip.current
    if (!tooltipContainer || !tooltip) return
    const { top, height: h, width: w, left } = tooltip.getBoundingClientRect()
    const { width, height } = tooltipContainer.getBoundingClientRect()
    if (width < w) {
      tooltipContainer.style.width = `${w}px`
    }
    const topOption = top + h + 4
    if (topOption + height > window.innerHeight) {
      tooltipContainer.style.top = `${top - height - 4}px`
    } else {
      tooltipContainer.style.top = `${topOption}px`
    }
    tooltipContainer.style.display = 'block'
    tooltipContainer.style.left = `${left}px`
  }, [])

  const listenerFrame = useCallback(() => {
    definedPositionOption()
    refFrame.current = window.requestAnimationFrame(listenerFrame)
  }, [definedPositionOption])

  const clearFrame = useCallback(() => {
    if (!refFrame.current) return
    window.cancelAnimationFrame(refFrame.current)
  }, [])

  const onClose = useCallback(() => {
    clearFrame()
    isOpen.current = false
    if (refTooltip.current) refTooltip.current.style.display = 'none'
  }, [clearFrame])

  const onOpen = useCallback(() => {
    createDom()
    if (isOpen.current) {
      onClose()
    } else {
      isOpen.current = true
      definedPositionOption()
      listenerFrame()
    }
  }, [createDom, definedPositionOption, listenerFrame, onClose])

  useEffect(() => {
    const dom = refDom.current
    return () => {
      if (isDomExist.current) {
        onClose()
        isDomExist.current = false
        document.querySelector('body')?.removeChild(dom)
      }
    }
  }, [clearFrame, onClose])

  const onMouseEnter = useCallback(() => {
    onOpen()
  }, [])

  const onMouseLeave = useCallback(() => {
    onClose()
  }, [])

  if (!label) {
    return <Fragment>{children}</Fragment>
  }

  return (
    <Fragment>
      <TooltipOnlyText
        ref={refOnlyText}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </TooltipOnlyText>
      {isOpen &&
        createPortal(
          <TooltipContainer ref={refTooltip}>
            <MotionDiv>
              {label}
              {hasArrow && <div className="arrow"></div>}
            </MotionDiv>
          </TooltipContainer>,
          refDom.current,
        )}
    </Fragment>
  )
}

export const TooltipOnlyText = styled.div`
  font-size: 18px;
  color: red;
  position: relative;
`

export const TooltipContainer = styled.div`
  position: absolute;
  z-index: 9999;
  display: none;
  min-width: max-content;
  max-height: 400px;
`

export const MotionDiv = styled.div``
