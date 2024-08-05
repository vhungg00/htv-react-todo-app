import React, { useCallback, useEffect, useRef, MouseEvent } from 'react'
import styled from 'styled-components'

export const ScrollTopNav: React.FC = () => {
  const xControl = useRef<number>()
  useEffect(() => {
    const element = document.querySelectorAll('.ga-nav')
    const elements = Array.from(element) as HTMLAnchorElement[]
    let arr: string[] = []
    elements.forEach(element => {
      arr.push(element.innerText)
    })

    console.log('arr', arr)
    localStorage.setItem('arr', JSON.stringify(arr))
  }, [])
  const listName = [
    'HTML',
    'CSS',
    'JAVASCRIPT',
    'SQL',
    'PYTHON',
    'JAVA',
    'PHP',
    'HOW TO',
    'W3.CSS',
    'C',
    'C++',
    'C#',
    'BOOTSTRAP',
    'REACT',
    'MYSQL',
    'JQUERY',
    'EXCEL',
    'XML',
    'DJANGO',
    'NUMPY',
    'PANDAS',
    'NODEJS',
    'R',
    'TYPESCRIPT',
    'ANGULAR',
    'GIT',
    'POSTGRESQL',
    'MONGODB',
    'ASP',
    'AI',
    'GO',
    'KOTLIN',
    'SASS',
    'VUE',
    'DSA',
    'GEN AI',
    'SCIPY',
    'AWS',
    'CYBERSECURITY',
    'DATA SCIENCE',
  ]

  
  const onMouseDown = useCallback((event: MouseEvent<HTMLDivElement>) => {
    xControl.current = event.pageX
    console.log('xControl', xControl)
  }, [])

  return (
    <Box
      id="topNavigate"
      onMouseDown={onMouseDown}
      onMouseMove={() => {}}
      onMouseUp={() => {}}
    >
      {listName.map((name, i) => (
        <Link key={`linkNav_${i}`}>{name}</Link>
      ))}
    </Box>
  )
}

const Box = styled.div`
  position: fixed;
  top: 0;
  font-size: 0;
  background-color: #282a35;
  z-index: 2;
  color: #f1f1f1;
  width: 100%;
  white-space: nowrap;
  overflow: auto;
  scrollbar-width: none;
`
const Link = styled.a`
  display: inline-block;
  width: auto;
  margin: 0 !important;
  padding: 5px 15px 5px 15px !important;
  font-size: 15px !important;
  text-decoration: none;
  line-height: 1.5;
`
