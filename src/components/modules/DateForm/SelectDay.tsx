// import { FieldValues, UseFormRegister } from 'react-hook-form'
// import { Select } from './Select'
// import { useMemo } from 'react'

// export type SelectDayProps = {
//   currentMonth?: number
//   currentYear?: number
//   register: UseFormRegister<FieldValues>
// }

// export const SelectDay = ({
//   currentMonth,
//   currentYear,
//   register,
//   ...rest
// }: SelectDayProps) => {
//   const options = useMemo(() => {
//     if (!currentMonth || !currentYear) return []
//     const length = new Date(
//       Number(currentYear) || 0,
//       Number(currentMonth) || 0,
//     ).getDate()
//     const range = Array(length)
//       .fill(null)
//       .map((_, index) => index + 1)
//     return range.map(item => ({
//       value: item,
//       label: String(item).padStart(2, '0'),
//     }))
//   }, [])

//   return (
//     <Select
//       options={options}

//     ></Select>
//   )
// }
export {}