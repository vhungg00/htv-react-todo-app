import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Button = styled.button<{ disabled?: boolean }>`
  padding: 10px 20px;
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
`

const TimerText = styled.span`
  margin-left: 10px;
`

const PasswordResetButton: React.FC = () => {
  const [countdown, setCountdown] = useState<number>(0)
  const [disabled, setDisabled] = useState<boolean>(false)

  const sendPasswordResetCode = () => {
    // Giả lập gửi mã đổi mật khẩu
    console.log('Gửi mã đổi mật khẩu')

    // Bắt đầu đếm ngược từ 60 giây
    setCountdown(60)
    setDisabled(true)
  }

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => prev - 1)
      }, 1000)
    } else if (countdown === 0) {
      setDisabled(false) // Kích hoạt lại nút khi đếm xong
    }

    return () => {
      clearInterval(interval) // Dọn dẹp interval khi component bị hủy
    }
  }, [countdown])

  return (
    <div>
      <Button onClick={sendPasswordResetCode} disabled={disabled}>
        Gửi mã đổi mật khẩu
      </Button>
      {disabled && <TimerText>{`Chờ ${countdown} giây`}</TimerText>}
    </div>
  )
}

export default PasswordResetButton
