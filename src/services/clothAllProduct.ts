import { allProduct } from '@/pages/AllProduct/_mock'
import { TRespose } from '@/pages/AllProduct/hooks'

export const listProduct = () =>
  new Promise<TRespose>(resolve => {
    setTimeout(() => resolve(allProduct), 1500)
  })
