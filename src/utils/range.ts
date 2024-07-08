export const range: (lenght: number) => number[] = length =>
  Array.from(Array(length)).map((_, index) => index)
