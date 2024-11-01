import { ComponentProps, FC, ReactNode, useState, MouseEvent } from 'react'
import styled from 'styled-components'

type Props = {
  onClick?: () => void
  loading?: boolean
  children?: ReactNode
} & ComponentProps<'button'>

type Ripple = {
  x: number
  y: number
  diameter: number
  id: number
}

export const RippleButton: FC<Props> = ({
  loading = false,
  onClick,
  children,
  ...rest
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const handleCreateRipple = (e: MouseEvent<HTMLButtonElement>) => {
    if (loading) return // Prevent ripple effect when loading

    const target = e.currentTarget
    const diameter = Math.max(target.clientWidth, target.clientHeight)
    const radius = diameter / 2
    const x = e.clientX - target.getBoundingClientRect().left - radius
    const y = e.clientY - target.getBoundingClientRect().top - radius

    const newRipple = {
      x,
      y,
      diameter,
      id: Date.now(),
    }

    setRipples(prev => [...prev, newRipple])

    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600) // Remove the ripple after animation
  }

  return (
    <ButtonCustomStyle
      onClick={e => {
        onClick?.()
        handleCreateRipple(e)
      }}
      disabled={loading || rest.disabled}
      {...rest}
    >
      {loading ? <Loading /> : children}
      {ripples.map(ripple => (
        <RippleStyle
          key={`key_${ripple.id}`}
          style={{
            width: ripple.diameter,
            height: ripple.diameter,
            top: ripple.y,
            left: ripple.x,
          }}
        />
      ))}
    </ButtonCustomStyle>
  )
}

const ButtonCustomStyle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 4px;
  color: #fff;
  background-color: #1890ff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #40a9ff;
  }
  &:active {
    background-color: #096dd9;
  }
  &:disabled {
    background-color: #d9d9d9;
    color: #a6a6a6;
    cursor: not-allowed;
  }
`

const RippleStyle = styled.span`
  position: absolute;
  border-radius: 50%;
  transform: scale(0);
  background-color: rgba(255, 255, 255, 0.7);
  animation: ripple-animation 0.6s linear;
  pointer-events: none;

  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`

const Loading = styled.span`
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
