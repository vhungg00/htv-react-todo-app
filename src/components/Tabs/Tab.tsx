import React from 'react'

type Props = {
  title: string;
  disabled?: boolean;
  children:React.ReactNode;
}

export const Tab: React.FC<Props> = ({children}) => {
  return <>{children}</>
};