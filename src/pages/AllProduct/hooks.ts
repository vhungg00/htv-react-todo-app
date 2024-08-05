import { useCallback, useEffect, useState } from 'react'
import { TAllProduct } from '@/typing/AllProduct'
import { listProduct } from '@/services/clothAllProduct'

export type TRespose = {
  total: number
  data: {
    allProduct: TAllProduct[]
  }
}

export type ClothAllProductController = {
  data: TRespose
  isLoading: boolean
}

export const useClothAllProduct = (): ClothAllProductController => {
  const [data, setData] = useState<TRespose>({
    total: 0,
    data: { allProduct: [] },
  })
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const callData = useCallback(async () => {
    setIsLoading(true)
    const data = await listProduct()
    setData(data)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    callData()
  }, [])

  return {
    data,
    isLoading,
  }
}
