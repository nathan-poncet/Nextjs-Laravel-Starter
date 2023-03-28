import { InputHTMLAttributes } from "react"

type Props = InputHTMLAttributes<HTMLInputElement> & {
    className?: string
}
const Input = ({ disabled = false, className, ...props }: Props) => (
    <input
        disabled={disabled}
        className={`${className} rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50`}
        {...props}
    />
)

export default Input
