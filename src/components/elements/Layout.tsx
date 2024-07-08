import React from 'react'
import styled from 'styled-components'

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