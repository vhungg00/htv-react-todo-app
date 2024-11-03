import { Progress } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

type Props = {
  isLoading?: boolean
}

const TIMEOUT = 300
const Component = ({ isLoading }: Props) => {
  const [start, setStart] = useState<number>()
  const [value, setValue] = useState<number>(0)

  useEffect(() => {
    const step = (timestamp: number) => {
      if (!start) {
        setStart(timestamp)
        return
      }

      const duration = timestamp - start

      // Set progress = 100 when done, else max 95
      const processValue = !isLoading ? 100 : Math.min((duration / TIMEOUT) * 95, 95)

      setValue(processValue)

      if (isLoading) {
        requestAnimationFrame(step)
      }
    }

    requestAnimationFrame(step)
  }, [isLoading, start])

  return (
    <Progress
      bg={'transparent'}
      colorScheme={'blue'}
      left={0}
      opacity={value === 100 ? 0 : 1}
      position={'fixed'}
      size={'xs'}
      top={0}
      transition={'opacity 300ms ease-in'}
      value={value}
      w={'full'}
      zIndex={999}
    />
  )
}

export const Progressbar = ({ isLoading }: Props) => {
  if (!isLoading) return <></>
  return <Component isLoading={isLoading} />
}
