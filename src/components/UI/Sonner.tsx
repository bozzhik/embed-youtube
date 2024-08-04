import React from 'react'
import {useTheme} from 'next-themes'
import {Toaster as Sonner} from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>
export const toasterStyles = 'text-base !font-normal bg-neutral-800 text-neutral-50 border-neutral-950'

const Toaster = ({...props}: ToasterProps) => {
  const {theme = 'system'} = useTheme()

  return <Sonner theme={theme as ToasterProps['theme']} className="toaster group" {...props} />
}

export {Toaster}
