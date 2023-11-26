import { memo } from 'react'
import SpinnerLoading from '../SpinnerLoading'

type Props = {
  customClassName?: string
  label: string
  isLoading?: boolean
  isDisable?: boolean
  onClick?: () => void
}

const CustomButton = ({ customClassName, label, isLoading = false, isDisable = false, onClick }: Props) => {
  return (
    <button
      disabled={isDisable}
      className={`px-4 py-2 bg-amber-400 text-black rounded-lg font-semibold hover:opacity-90 transition-all delay-[30ms] w-full ${customClassName}`}
      onClick={onClick}
    >
      {!isLoading ? label :
        <div className="flex items-center">
          <SpinnerLoading
            size={4}
          />
          <span>Loading...</span>
        </div>
      }
    </button>
  )
}

export default memo(CustomButton)