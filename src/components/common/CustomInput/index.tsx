import { memo } from 'react'

type Props = {
  type?: string
  label?: string
  placeholder?: string
  id?: string
  value?: string | number
  isError?: boolean
  isDisable?: boolean
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomInput = ({ type = 'text', label, placeholder, id, value, isError, isDisable, onChange }: Props) => {
  return (
    <div className="w-full">
      {label &&
        <label htmlFor={id} className={`block mb-2 font-medium ${isError ? 'text-red-700' : 'text-gray-900'}`}>{label}</label>
      }
      <input
        type={type}
        id={id}
        className={`${isError ? 'bg-red-50 text-red-700 border border-red-500 focus:outline-red-700' : 'bg-gray-50 border border-gray-300'} text-gray-900 text-sm rounded-lg focus:outline-amber-500 block w-full p-2.5`}
        placeholder={placeholder}
        disabled={isDisable}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  )
}

export default memo(CustomInput)