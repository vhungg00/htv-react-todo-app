import React from 'react'
import styled, { css } from 'styled-components'

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <LayoutWrapper>{children}</LayoutWrapper>

const LayoutWrapper = styled.div`
  display: grid;
  grid-template:
    'header'
    'main'
    'footer';
  grid-template-rows: auto 1fr;
  grid-template-columns: 1fr auto;
  min-height: 100vh;
  width: 100%;
  background-color: #fff;
`

export const LayoutMain = styled.main`
  grid-area: main;
  background: #fff;
  height: 100%;
  overflow: hidden;
`

const scrollVar = css`
  --scroll-padding-left: 2px;
  --scroll-padding-top: 40px;
  --scroll-thumb-width: 6px;
  --scroll-border-width: var(--scroll-padding-left);
  --scrollbar-color: #ffffff80;
  --scroll-width: calc(
    var(--scroll-padding-left) * 2 + var(--scroll-thumb-width)
  );
`

export const ScrollAreaVertically = styled.div<{ hiddenScrollbar?: boolean }>`
  ${scrollVar}
  ${({ hiddenScrollbar }) => (hiddenScrollbar ? '--scroll-width: 0px;' : '')}

  height: 100%;
  width: calc(100% + var(--scroll-width));

  overflow-y: auto;
  &::-webkit-scrollbar {
    width: var(--scroll-width);
    ${({ hiddenScrollbar }) => (hiddenScrollbar ? 'display: none;' : '')}
  }

  &::-webkit-scrollbar-thumb {
    min-height: 100px;
    min-width: 50px;
    border: var(--scroll-border-width) solid transparent;
    border-radius: var(--scroll-width);
    background: linear-gradient(var(--scrollbar-color), var(--scrollbar-color)),
      linear-gradient(transparent, transparent);
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    margin-block: calc(-1 * var(--scroll-border-width));
    margin-top: calc(var(--scroll-padding-top) - var(--scroll-border-width));
  }
  &::-webkit-scrollbar-corner {
    background: transparent;
  }

  &::-webkit-scrollbar:horizontal {
    height: calc(var(--scroll-thumb-width) + 12px);
  }

  &::-webkit-scrollbar-thumb:horizontal {
    --scroll-border-width: 6px;
  }
  &::-webkit-scrollbar-track:horizontal {
    margin-inline: -4px;
  }
`

export const SettingMenuScroll = styled(ScrollAreaVertically)`
  --scroll-padding-left: 4px;
  --scroll-padding-top: 0px;
  --scroll-thumb-width: 6px;
  --scroll-border-width: var(--scroll-padding-left);
  --scrollbar-color: #ffffff80;
  --scroll-width: calc(
    var(--scroll-padding-left) * 2 + var(--scroll-thumb-width)
  );
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  gap: 11px;
  transform: translateX(1px);
  width: calc(100% + var(--scroll-width));
  overflow-y: scroll;
`