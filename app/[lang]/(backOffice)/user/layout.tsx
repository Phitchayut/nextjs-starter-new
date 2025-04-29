import ModalLayout from '@/components/shared/ModalLayout'
import React from 'react'

type Props = {
    children: React.ReactNode
}

function layout({children}: Props) {
  return (
    <>
    {children}
    <ModalLayout />
    </>
  )
}

export default layout