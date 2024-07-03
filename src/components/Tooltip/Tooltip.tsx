import { Fragment, ReactNode, useCallback, useEffect, useRef } from 'react'

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
  return <Fragment></Fragment>
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
