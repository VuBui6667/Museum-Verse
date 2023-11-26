import React, { HTMLAttributes, PropsWithChildren, useState } from 'react'
import ChevronIcon from '../../icons/ChevronIcon'

type Props = {
  children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined
  label: string
  onClick?: () => void
}

const DropdownContainer = ({ children, label, onClick }: Props) => {
  const [isShow, setIsShow] = useState<boolean>(true)
  return (
    <div className="border border-gray-400 rounded-xl my-4 hover:border-gray-500">
      <div className={`flex justify-between items-center p-4 bg-slate-200 hover:bg-slate-300 rounded-t-xl cursor-pointer ${!isShow ? 'rounded-b-xl' : ''}`} onClick={() => setIsShow(!isShow)}>
        <p>{label}</p>
        <ChevronIcon size={4} isActive={isShow} />
      </div>
      {isShow &&
        <div className="p-4">
          {children}
        </div>
      }
    </div>
  )
}

export default DropdownContainer