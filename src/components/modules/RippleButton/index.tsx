import { ComponentProps, FC, ReactNode, useState, MouseEvent } from 'react'
import styled from 'styled-components'

type Props = {
  onClick?: () => void
  loading?: boolean
  children?: ReactNode
} & ComponentProps<'button'>

type Ripple = {
  id: number
  x: number
  y: number
  width: number
  height: number
}

export const RippleButton: FC<Props> = ({
  loading = false,
  onClick,
  children,
  ...rest
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([])

  const handleCreateRipple = (e: MouseEvent<HTMLButtonElement>) => {
    if (loading) return

    const { width, height } = e.currentTarget.getBoundingClientRect()

    console.log(width, height)

    const rippleSizeWidth = width + 10
    const rippleSizeHeight = height + 10
    const ripple = {
      id: Date.now(),
      x: (width - rippleSizeWidth) / 2,
      y: (height - rippleSizeHeight) / 2,
      width: rippleSizeWidth,
      height: rippleSizeHeight,
    }
    setRipples(prev => [...prev, ripple])

    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== ripple.id))
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
            // x: ripple.x,
            // y: ripple.y,
            width: ripple.width,
            height: ripple.height,
          }}
        />
      ))}
    </ButtonCustomStyle>
  )
}

const ButtonCustomStyle = styled.button`
  flex: 1;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border: none;
  border-radius: 10px;
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
    opacity: 0.5;
    color: #a6a6a6;
    cursor: not-allowed;
  }
`

const RippleStyle = styled.span`
  position: absolute;
  background-color: rgba(24, 144, 255, 0.2); // Màu sắc của ripple
  border-radius: 10px;
  transform: scale(1);
  animation: ripple-animation 0.2s linear forwards; // Duy trì trạng thái cuối cùng
  pointer-events: none;
  z-index: -1;

  @keyframes ripple-animation {
    to {
      transform: scale(1); // Tăng kích thước để bao phủ nút
      opacity: 0; // Giảm opacity về 0
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
