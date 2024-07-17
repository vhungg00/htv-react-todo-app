import React, { useEffect, useRef, useCallback, useState } from 'react'
import { Box, Center } from '@chakra-ui/react'

export type Props = {
  children: React.ReactNode
}

export const Carousel = ({ children }: Props) => {
  const refCarousel = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  console.log('startX-scrollLeft', startX, scrollLeft)

  useEffect(() => {
    if (!refCarousel.current) return
    const carousel = refCarousel.current
    carousel.addEventListener('mousedown', handleMouseDown)
    carousel.addEventListener('mouseleave', handleMouseLeave)
    carousel.addEventListener('mouseup', handleMouseUp)
    carousel.addEventListener('mousemove', handleMouseMove)

    return () => {
      carousel.removeEventListener('mousedown', handleMouseDown)
      carousel.removeEventListener('mouseleave', handleMouseLeave)
      carousel.removeEventListener('mouseup', handleMouseUp)
      carousel.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isDragging, startX, scrollLeft])

  const handleMouseDown = useCallback((e: { pageX: number }) => {
    if (!refCarousel.current) return
    const carousel = refCarousel.current
    const { width } = carousel.getBoundingClientRect()
    console.log('carousel.offsetLeft', width, carousel.scrollWidth)
    setIsDragging(true)
    setStartX(e.pageX - carousel.offsetLeft)
    setScrollLeft(carousel.scrollLeft)
  }, [isDragging])

  const handleMouseLeave = useCallback(() => {
    setIsDragging(false)
  }, [isDragging])

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [isDragging])

  const handleMouseMove = useCallback((e: { preventDefault: () => void; pageX: number }) => {
    if (!isDragging || !refCarousel.current) return
    const carousel = refCarousel.current
    e.preventDefault()
    const x = e.pageX - carousel.offsetLeft

    // The multiplier controls the scroll speed
    const walk = (x - startX) * 0.5
    carousel.scrollLeft = scrollLeft - walk
  }, [isDragging])

  return (
    <Box
      ref={refCarousel}
      position={'relative'}
      zIndex={1}
      width={'full'}
      overflowX={'scroll'}
      overflowY={'hidden'}
      whiteSpace={'nowrap'}
      transition={'all .2s'}
      transform={'scale(0.98)'}
      willChange={'tranform'}
      userSelect={'none'}
      cursor={'pointer'}
      display={'grid'}
      gridAutoFlow={'column'}
      className={'carousel'}
      __css={{
        '&': {
          msOverflowStyle: 'none',
          scrollbarWidth: 'none',
        },
        '&::-webkit-scrollbar': {
          display: 'none',
        },
      }}
    >
      <Box position={'fixed'} zIndex={'999'}>
        <Center as={'span'} fontSize={'15px'}>❮</Center>
      </Box>
      {children}
    </Box>
  )
}
